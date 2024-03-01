import React, { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../database/firebase";

const Login = () =>{
    const [data,setData] = useState({
        email:'',
        password:''
      });
      const ChangeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value});
      };
      const [loading,setLoading] = useState(false);
      const SubmitHandler = (e) =>{
        e.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth,data.email,data.password).then(resp=>{
            console.log(resp);
            setLoading(false);
        }).catch(err=>{
            setLoading(false);
            alert(err.message);
        })
      }
    return (
    <div className="">
    <form className="flex flex-col gap-3 mx-auto mt-32" style={{width:'300px'}} onSubmit={SubmitHandler}>
      <h1 className="text-center mt-10 text-xl">Login</h1>
      <TextField type="text" label='Enter Email' value={data.username} name="email" onChange={ChangeHandler}/>
      <TextField type="password" label='Enter Password' value={data.password} name="password" onChange={ChangeHandler}/>
      {!loading ? <Button variant="contained" type="submit">Login</Button> : <CircularProgress className="mx-auto"/>}
    </form>
  </div>
  );
};

export default Login;