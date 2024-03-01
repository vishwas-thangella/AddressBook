import React, { useEffect } from "react";
import Header from "./components/Header";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./database/firebase";
import { Actions } from "./redux/store";

const App =  () =>{
  const Auth = useSelector(state=>state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    onAuthStateChanged(auth,usr=>{
      if(usr){
        dispatch(Actions.setLogin(true));
        navigate('/contacts');
      }else{
        dispatch(Actions.setLogin(false));
        navigate('/');
      }
    });
  },[])
  return(
    <React.Fragment>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        {Auth && <Route path="/contacts" element={<Contacts/>}/>}
      </Routes>
    </React.Fragment>
  );
};

export default App;