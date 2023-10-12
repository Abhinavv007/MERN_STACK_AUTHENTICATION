import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoutes from "./components/ProtectedRoutes"
import ForgetPassword from "./components/ForgetPassword";
import SaveForgetPass from "./components/SaveForgetPass";

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
      <Route path="/reset-password" element={<ForgetPassword />} />
      <Route path="/user/reset/:id" element={<SaveForgetPass />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        </Route>
       
      </Routes>
     </Router>
    </div>
  );
}

export default App;
