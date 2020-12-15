import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

import "../style/MemePage.css";

function Post({ postId, getImageFromServer }) {
  const [loading, setLoading] = useState(true);
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
        <div className="postImage">
          <img className="postImg" alt="post" src={url} />
          <div className="postBy">
            <p className="postByText">{`By: ${post?.createBy}`}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
