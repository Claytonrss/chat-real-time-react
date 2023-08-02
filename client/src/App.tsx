import { useEffect } from "react";
import socketIO from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import ChatPage from "./pages/ChatPage";
import GlobalContext from "./context";
import Home from "./pages/Home";

const socket = socketIO("http://localhost:4000");
socket.connect();

function App() {
  return (
    <GlobalContext>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home socket={socket} />}></Route>
            <Route
              path="/createUser"
              element={<CreateUser socket={socket} />}
            ></Route>
            <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalContext>
  );
}

export default App;
