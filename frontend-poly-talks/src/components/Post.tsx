import {Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import {Comment} from "@mui/icons-material";
import React from "react";
import {makeStyles} from "tss-react/mui";
import {PostDto} from "../dto/post.dto";

const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    },
    maxWidth: {
        width: '100%'
    },
}));

export const Post = ({ post }: { post: PostDto }) => {
    const {classes, cx} = useStyles(undefined, undefined);

    const dateToLocale = (date: Date) => {
        return new Date(date).toLocaleString();
    }
    return (
        <Card className={`${classes.maxWidth}`} style={{ boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.32), 0px 1px 1px 0px rgba(0,0,0,0.32), 0px 1px 3px 0px rgba(0,0,0,0.28)"}} >
            <CardHeader
                avatar={
                    <Avatar />
                }
                title={`${post?.author.username}`}
                subheader={`${dateToLocale(post?.creationDate)}`}
            />
            <CardContent >
                <Typography variant="body2" color="text.secondary">
                    {`${post?.content}`}
                </Typography>
            </CardContent>
            <CardActions disableSpacing style={{display: "flex", flexDirection: "row-reverse"}}>
                <IconButton aria-label="add to favorites">
                    <Comment />
                </IconButton>
            </CardActions>
        </Card>
    );
};