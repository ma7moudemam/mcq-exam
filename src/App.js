import "./App.css";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Routes, Route ,Switch } from "react-router-dom";
import Login from './components/Login/Login'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" base element={<Login/>}/>  
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
