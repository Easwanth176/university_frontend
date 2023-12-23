import React from "react";
import { BrowserRouter , Route,  Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Java script/Login";
import Home from "./components/Java script/Home";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>    
      </BrowserRouter></div>


  );
}
export default App;
