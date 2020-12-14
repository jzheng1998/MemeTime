import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "../style/MemePage.css";

const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

function MemePage({ uploadImageToServer, userInfo }) {
  const location = useLocation();
  const [roomId, setRoomId] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    setRoomId(location.state.roomId);
  }, [location]);

  const onChange = (file) => {
    if (!file) {
      setImageUri("");
      return;
    }

    fileToDataUri(file).then((dataUri) => {
      let fileType = dataUri
        .match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]
        .replace("image/", "");
      setImageUri(dataUri);
      uploadImageToServer(dataUri, fileType);
    });
  };

  return (
    <div className="mainContainer">
      <input
        type="file"
        onChange={(event) => onChange(event.target.files[0] || null)}
      />
      {imageUri ? <img alt="test" src={imageUri} /> : null}
      <p>{imageUri}</p>
    </div>
  );
}

export default MemePage;
