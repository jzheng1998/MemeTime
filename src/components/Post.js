import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import "../style/RoomPage.css";

function Post({ postId, getImageFromServer }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    axios
      .get("https://secure-fjord-04428.herokuapp.com/room/getPost", {
        params: {
          postId: postId,
        },
      })
      .then((response) => {
        setLoading(false);
        setPost(response.data.response);
        getImageFromServer(response.data.response.postId, setUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId, getImageFromServer]);

  return (
    <div className="post">
      {loading || url === "" ? (
        <CircularProgress size={60} />
      ) : (
        <div>
          <div className="postImage">
            <img
              onClick={() => setOpen(true)}
              className="postImg"
              alt="post"
              src={url}
            />
            <div className="postBy">
              <p className="postByText">{`By: ${post?.createBy}`}</p>
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={fullScreen}
      >
        <DialogContent>
          <img
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            alt="fullImage"
            src={url}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Post;
