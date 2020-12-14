import React from "react";

import "../style/HomePage.css";

function RoomCard({ roomName }) {
  return (
    <div className="cardContainer">
      <h1 className="cardText">{roomName}</h1>
    </div>
  );
}

export default RoomCard;
