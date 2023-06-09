import { useParams } from "react-router";
import { makeStyles } from "tss-react/mui";
import { ThreadDto } from "../dto/thread.dto";
import React from "react";
import {
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import { getToken } from "../authentication/Authentication";
import { Post } from "../components/Post";
import { enqueueSnackbar } from "notistack";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

const useStyles = makeStyles()((theme) => ({
  red: {
    color: theme.palette.primary.main,
  },
  header: {
    display: "flex",
    alignItems: "baseline",
  },
  maxWidth: {
    width: "100%",
  },
}));

export const SingleThread = () => {
  const { classes, cx } = useStyles(undefined, undefined);
  const [thread, setThread] = React.useState<ThreadDto | null>(null);
  const [postContent, setPostContent] = React.useState("");
  const [rows, setRows] = React.useState(1);
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const { id } = useParams();

  React.useEffect(() => {
    fetchData();
    isUserSubscribed();
  }, []);

  const fetchData = async () => {
    fetch(`http://localhost:8080/api/thread/${id}`)
      .then((response) => response.json())
      .then((data) => setThread(data))
      .catch((error) => console.error(error));
  };

  const isUserSubscribed = () => {
    if (!getToken()) {
      setIsSubscribed(false);
    }
    fetch(
      `http://localhost:8080/api/thread/${id}/isUserSubscribe?token=${getToken()}`
    )
      .then((response) => response.json())
      .then((data) => {
        setIsSubscribed(data);
        return data;
      })
      .catch((error) => console.error(error));
  };

  const handlePostContentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPostContent(event.target.value);
  };

  const handleSubscribe = () => {
    if (!getToken()) {
      enqueueSnackbar("Zaloguj się kontem Google");
      return;
    }
    fetch(`http://localhost:8080/api/thread/${thread?._id}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getToken(),
      }),
    }).then((response) => {
      if (response.ok) {
        enqueueSnackbar("Zapisano do ulubionych");
        setIsSubscribed(true);
      }
      return response.json();
    });
  };

  const handleUnSubscribe = () => {
    if (!getToken()) {
      enqueueSnackbar("Zaloguj się kontem Google");
      return;
    }
    fetch(`http://localhost:8080/api/thread/${thread?._id}/unsubscribe`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: getToken(),
      }),
    }).then((response) => {
      if (response.ok) {
        enqueueSnackbar("Usunięto z ulubionych");
        setIsSubscribed(false);
      }
      return response.json();
    });
  };

  const createPost = () => {
    if (!getToken()) {
      enqueueSnackbar("Zaloguj się kontem Google");
      return;
    }
    fetch(`http://localhost:8080/api/thread/${thread?._id}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: postContent,
        userToken: getToken(),
      }),
    })
      .then((response) => {
        if (response.ok) {
          fetchData();
          enqueueSnackbar("Dodano post");
        }
        return response.json();
      })
      .catch((error) => console.error("Error while adding post:", error));
    setPostContent("");
    setRows(1);
  };

  return (
    <div
      style={{
        padding: "1em 2em",
        paddingBottom: "4em",
        display: "flex",
        flexDirection: "column",
        gap: "0.15em",
      }}>
      <Button
        variant="contained"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
        onClick={() => {
          window.scrollTo(0, 0);
        }}>
        Powrót do góry
      </Button>
      <Card
        style={{
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.32), 0px 1px 1px 0px rgba(0,0,0,0.32), 0px 1px 3px 0px rgba(0,0,0,0.28)",
        }}>
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}>
            <h1
              className={`${classes.red}`}
              style={{ fontWeight: "bold", marginBottom: "0px" }}>
              {thread?.title}
            </h1>
            {isSubscribed ? (
              <IconButton color="primary" onClick={handleUnSubscribe}>
                <NotificationsOffIcon />
              </IconButton>
            ) : (
              <IconButton color="primary" onClick={handleSubscribe}>
                <NotificationAddIcon />
              </IconButton>
            )}
          </div>
          <Stack direction="row" spacing={1}>
            {thread?.tags.map((tag) => (
              <Chip label={`#${tag}`} />
            ))}
          </Stack>
          <p>{thread?.description}</p>
        </CardContent>
      </Card>
      <div style={{ position: "relative", marginTop: "0.35em" }}>
        <Button
          variant="contained"
          endIcon={<SendRounded />}
          style={{
            position: "absolute",
            right: "10px",
            bottom: "10px",
            zIndex: 1,
          }}
          onClick={createPost}>
          Dodaj post
        </Button>
        <TextField
          className={`${classes.maxWidth}`}
          id="outlined-multiline-static"
          label="Dodaj post"
          multiline
          rows={rows}
          value={postContent}
          onChange={handlePostContentChange}
          onClick={() => {
            setRows(4);
          }}
        />
      </div>
      <h3 className={`${classes.red}`} style={{ marginTop: "2.5em" }}>
        Posty:{" "}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        {thread?.posts.map((post) => (
          <Post post={post} isComment={false} threadId={thread._id} />
        ))}
      </div>
    </div>
  );
};
