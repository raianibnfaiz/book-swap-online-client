import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNavbar from './Pages/Shared/TopNavbar';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Login/Signup';
import MyProfile from './Pages/ProfileInfo/MyProfile';
import EditProfile from './Pages/ProfileInfo/EditProfile';
import MyBookRequest from './Pages/ProfileInfo/MyBookRequest';
import MySentRequest from './Pages/ProfileInfo/MySentRequest';
function App() {
  return (
    <div className="App">
      <TopNavbar></TopNavbar>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/myProfile/:email' element={<MyProfile />}></Route>
        <Route path='/bookRequest/:email' element={<MyBookRequest />}></Route>
        <Route path='/sentRequest/:email' element={<MySentRequest />}></Route>
        <Route path='/updateProfile/:email' element={<EditProfile />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
