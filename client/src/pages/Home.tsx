import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WithSocketProps } from "../types/socket";

const Home = ({ socket }: WithSocketProps) => {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {}

  async function handleCreateNewRoom() {
    if (room.length !== 0) {
      const response = await fetch(
        `http://localhost:4000/createRoom?room=${room}`
      );
      const data = await response.json();
      if (data.status === "success") {
        socket.emit("joinRoom", room);
      }
    }
  }

  useEffect(() => {
    socket.on("joinSuccessful", (data) => {
      localStorage.setItem("room", data.room);
      navigate("/createUser");
    });
  }, [socket]);

  return (
    <div className="home__container">
      <h2 className="home__header">Bem vindo</h2>
      <div className="home__grid">
        <div className="home__form_new">
          <label htmlFor="room">ID da Sala:</label>
          <input
            type="text"
            minLength={6}
            name="room"
            id="room"
            className="username__input"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button className="home__cta" onClick={handleCreateNewRoom}>
            Criar nova Sala
          </button>
        </div>
        <form className="home__form_in" onSubmit={handleSubmit}>
          <label htmlFor="room">ID da Sala:</label>
          <input
            type="text"
            minLength={6}
            name="room"
            id="room"
            className="username__input"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button className="home__cta">Entrar em uma sala</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
