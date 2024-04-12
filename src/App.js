import {BrowserRouter , Routes, Route} from "react-router-dom"
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat/Chat";
import SetAvatar from "./Pages/Avatar/SetAvatar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
