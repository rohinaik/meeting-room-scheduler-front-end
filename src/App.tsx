import React from 'react';
import './App.css';
import { Route, Router, Routes } from "react-router-dom";
import LoginForm from './LoginForm/Login';
import SignIn from './SigninForm/Signin';
import AddRoom from './AddRoom/AddRoom';
import BookRoom from './BookRoom/BookRoom';
import GiveFeedback from './GiveFeedback/GiveFeedback';
import ViewFeedbacks from './ViewFeedbacks/ViewFeedbacks';
import axios from 'axios';
import Dashboard from './Dashboard/Dashboard';
function App() {
  axios.defaults.baseURL = "http://localhost:8080/api"
  return (
    <Routes>
      <Route path="/" element={<LoginForm></LoginForm>} />
      <Route path="/dashboard" element={<Dashboard></Dashboard>} />
      <Route path="/login" element={<LoginForm></LoginForm>} />
      <Route path="/signin" element={<SignIn ></SignIn>} />
      <Route path="/addRoom" element={<AddRoom></AddRoom>} />
      <Route path="/bookRoom" element={<BookRoom></BookRoom>} />
      <Route path="/giveFeedback" element={<GiveFeedback></GiveFeedback>} />
      <Route path="/viewFeedbacks" element={<ViewFeedbacks></ViewFeedbacks>} />
    </Routes>
  );
}

export default App;
