import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

import "../style/MemePage.css";
import Post from "../components/Post";

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

function MemePage({
  uploadImageToServer,
  getImageFromServer,
  uploadPost,
  userInfo,
}) {
  const location = useLocation();
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setRoomId(location.state.roomId);
  }, [location]);

  useEffect(() => {
    if (!roomId) return;
    if (uploading) return;

    axios
      .get("https://secure-fjord-04428.herokuapp.com/room/retrieveSingle", {
        params: {
          roomId: roomId,
        },
      })
      .then((response) => {
        setLoading(false);
        setPosts(response.data.response.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [uploading, roomId]);

  const onChange = (file) => {
    if (!file) return;

    fileToDataUri(file).then((dataUri) => {
      setUploading(true);

      const r_id = uuidv4();
      const fileType = dataUri
        .match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]
        .replace("image/", "");
      const fileName = `${r_id}.${fileType}`;

      uploadImageToServer(dataUri, fileName, setUploading);
      uploadPost(roomId, fileName, userInfo?.displayName);
    });
  };

  return (
    <div className="mainContainer">
      <div className="maxWidth">
        <input
          type="file"
          onChange={(event) => onChange(event.target.files[0] || null)}
        />
        <div className="postContainer">
          {posts?.length !== 0 ? (
            posts.map((postId, i) => {
              return (
                <Post
                  key={i}
                  postId={postId}
                  getImageFromServer={getImageFromServer}
                />
              );
            })
          ) : loading ? (
            <CircularProgress size={60} />
          ) : (
            <h2>No posts available :(</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemePage;
