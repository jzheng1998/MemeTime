import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import "../style/HomePage.css";

function RoomCard({ roomId }) {
  const history = useHistory();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    axios
      .get("https://secure-fjord-04428.herokuapp.com/room/retrieveSingle", {
        params: {
          roomId: roomId,
        },
      })
      .then((response) => {
        setRoom(response.data.response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [roomId]);

  const redirect = () => {
    history.push({
      pathname: "/meme",
      state: {
        roomId: roomId,
      },
    });
  };

  if (!roomId) return;

  return (
    <div className="cardContainer" onClick={redirect}>
      {loading ? (
        <CircularProgress size={60} />
      ) : (
        <h1 className="cardText">{room?.roomName}</h1>
      )}
    </div>
  );
}

export default RoomCard;
