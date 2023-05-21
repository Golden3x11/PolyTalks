import {
    Avatar, Badge,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import {Comment, SendRounded} from "@mui/icons-material";
import React, {useState} from "react";
import {makeStyles} from "tss-react/mui";
import {PostDto} from "../dto/post.dto";
import {getToken} from "../authentication/Authentication";
import {enqueueSnackbar} from "notistack";

const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    },
    maxWidth: {
        width: '100%'
    },
}));

export const Post = ({ post, isComment, threadId }: { post: PostDto, isComment: boolean, threadId: string }) => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [showComments, setShowComments] = useState(false);
    const [commentContent, setCommentContent] = React.useState("");
    const [rows, setRows] = React.useState(1);
    const [comments, setComments] = useState(post.comments);


    const dateToLocale = (date: Date) => {
        return new Date(date).toLocaleString();
    }

    const handleCommentContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentContent(event.target.value);
    }

    const createComment = () => {
        if (!getToken()) {
            enqueueSnackbar('Zaloguj się kontem Google');
            return
        }
        fetch(`http://localhost:8080/api/thread/${threadId}/posts/${post?._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: commentContent,
                userToken: getToken()
            }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                const updatedComments = [...comments, data];
                setComments(updatedComments);
            })
            .catch(error => console.error('Error while adding post:', error));
        setCommentContent("");
        setRows(1);
    };

    return (
        <div style={{marginTop: "0.4em"}}>
            <Card className={`${classes.maxWidth}`} style={{ boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.32), 0px 1px 1px 0px rgba(0,0,0,0.32), 0px 1px 3px 0px rgba(0,0,0,0.28)", display: "flex", justifyContent: "space-between"}} >
                <div>
                <CardHeader
                    avatar={
                        <Avatar
                            src={`/avatar-${post?.author.avatar}.jpg`}
                        />
                    }
                    title={`${post?.author.username}`}
                    subheader={`${dateToLocale(post?.creationDate)}`}
                />
                <CardContent >
                    <Typography variant="body2" color="text.secondary">
                        {`${post?.content}`}
                    </Typography>
                </CardContent>
                </div>
                {!isComment &&
                    <CardActions disableSpacing style={{display: "flex", flexDirection: "row-reverse", alignItems: "flex-end"}}>
                        <IconButton onClick={() => {setShowComments(!showComments); setRows(1)}}>
                            <Badge badgeContent={comments.length} color="primary">
                                <Comment />
                            </Badge>
                        </IconButton>
                    </CardActions>
                }
            </Card>
            {(showComments && !isComment) &&
                <div style={{marginLeft: "5em", marginTop: "0.4em"}}>
                    {comments.map(comment => (
                            <Post post={comment} isComment={true} threadId={threadId}/>
                        )
                    )}
                    <div style={{ position: "relative", marginTop: "0.35em" }}>
                        <Button
                            variant="contained"
                            endIcon={<SendRounded />}
                            style={{ position: "absolute", right: "10px" , bottom: "10px", zIndex: 1 }}
                            onClick={createComment}
                        >
                            Dodaj komentarz
                        </Button>
                        <TextField
                            className={`${classes.maxWidth}`}
                            id="outlined-multiline-static"
                            label="Dodaj komentarz"
                            multiline
                            variant="filled"
                            rows={rows}
                            value={commentContent}
                            onChange={handleCommentContentChange}
                            onClick={() => {setRows(3)}}
                        />
                    </div>
                </div>
            }
        </div>

);
};