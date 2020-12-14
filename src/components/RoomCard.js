import React, { useEffect, useState } from "react";
import axios from "axios";

import "../style/HomePage.css";
import { CircularProgress } from "@material-ui/core";

function RoomCard({ roomId }) {
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

  if (!roomId) return;

  return (
    <div className="cardContainer">
      {loading ? (
        <CircularProgress size={60} />
      ) : (
        <h1 className="cardText">{room?.roomName}</h1>
      )}
    </div>
  );
}

export default RoomCard;
