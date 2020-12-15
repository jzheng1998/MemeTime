import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  TextField,
} from "@material-ui/core";

import "../style/HomePage.css";
import RoomCard from "../components/RoomCard";

const AddIcon = () => {
  return (
    <svg
      id="Capa_1"
      enableBackground="new 0 0 512 512"
      height="256"
      viewBox="0 0 512 512"
      width="256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="m416 241h-145v-145c0-8.284-6.716-15-15-15s-15 6.716-15 15v145h-145c-8.284 0-15 6.716-15 15s6.716 15 15 15h145v145c0 8.284 6.716 15 15 15s15-6.716 15-15v-145h145c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
        <path d="m437 0h-362c-41.355 0-75 33.645-75 75v362c0 41.355 33.645 75 75 75h362c41.355 0 75-33.645 75-75v-362c0-41.355-33.645-75-75-75zm45 437c0 24.813-20.187 45-45 45h-362c-24.813 0-45-20.187-45-45v-362c0-24.813 20.187-45 45-45h362c24.813 0 45 20.187 45 45z" />
      </g>
    </svg>
  );
};

function HomePage({ userReady, userId, setErrorMsg }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (!userReady || !userId) return;
    if (creatingGroup) return;

    axios
      .get("https://secure-fjord-04428.herokuapp.com/user/retrieve", {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        setRooms(response.data.response.rooms);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userReady, userId, creatingGroup]);

  const createNewRoom = () => {
    if (groupName === "") return;
    setGroupName("");
    setCreatingGroup(true);

    axios
      .get("https://secure-fjord-04428.herokuapp.com/room/create", {
        params: {
          roomName: groupName,
        },
      })
      .then((response) => {
        addRoomToUser(response.data.docId);
      })
      .catch((error) => {
        setErrorMsg("Room creation failed. Try again later.");
        console.log(error);
      });
  };

  const addRoomToUser = (roomId) => {
    axios
      .get("https://secure-fjord-04428.herokuapp.com/user/addRoom", {
        params: {
          userId: userId,
          roomId: roomId,
        },
      })
      .then((response) => {
        setOpen(false);
        setCreatingGroup(false);
      })
      .catch((error) => {
        setErrorMsg("Failed to add room to user.");
        console.log(error);
      });
  };

  return (
    <div className="homeContainer">
      <div className="addGroupIcon" onClick={() => setOpen(true)}>
        <AddIcon />
      </div>

      <div className="divider" />

      <div className="groupContainer">
        {rooms?.length !== 0 ? (
          rooms.map((roomId, i) => {
            return <RoomCard key={i} roomId={roomId} />;
          })
        ) : loading ? (
          <CircularProgress size={60} />
        ) : (
          <h2>No rooms available, go create one or join one!</h2>
        )}
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth={"sm"}
        fullWidth={true}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
        <DialogContent>
          {creatingGroup ? (
            <LinearProgress style={{ marginBottom: 20 }} />
          ) : null}
          <DialogContentText>
            Input the name of your new group:
          </DialogContentText>
          <TextField
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            autoFocus
            fullWidth
            label="Group Name"
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={createNewRoom} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HomePage;
