import React from "react";
import { BrowserRouter , Route,  Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Java script/Login";
import Home from "./components/Java script/Home";
import Query from "./components/Java script/Query";
import Profile from "./components/Java script/Profile";
import Chat from "./components/Java script/Chat";
import Expo from "./components/Java script/Expo";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/query" element={<Query />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/expo" element={<Expo />} />
      </Routes>    
      </BrowserRouter></div>


  );
}
export default App;
