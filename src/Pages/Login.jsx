import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import{ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { loginRouter } from "../utils/APIRoutes";
import styled from "styled-components";

const Login=()=>{

    const navigate=useNavigate();

    const [values,setValues]= useState({
        username:"",
        
        password:"",
      
    });

    const handleSubmit= async (e)=>{
        e.preventDefault();
        
       if(handleValidation()){
        console.log('hi');
        const { password,  username} = values;
        try{
            const {data}= await axios.post(loginRouter,{
                username,
        
                password
            });
            console.log("data",data);
            if(data.success===true){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                navigate("/");
            }
        }catch(err){
            //console.log(err);
            if(err.response.status===400){
            
                toast.error(err.response.data.message,toastOptions);
            }
        }
        
      
       
        
       
       } 
    }

    const toastOptions={
        position:"top-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }

    const handleValidation=()=>{
        const { password, username } = values;

        if(password === ""){
           // console.log("password",password);
            toast.error("Email and Password is required",toastOptions);
            return false;
        }
        else if(username.length===""){
            toast.error("Email and Password is required", toastOptions)
            return false;
        }
        
        return true;
    }

    const handleChange=(e)=>{
       setValues({...values,[e.target.name]:e.target.value});
    }

    useEffect(()=>{
        if(localStorage.getItem("chat-app-user",)){
            navigate("/");
        }
    })
    return(
        <>
        <FormContainer>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <h1>Login</h1>
                <input type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)} />
               
                <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)} />
             
                <button type="submit">Login User</button>
                <span>Don't have an account ? <Link to="/register">Register</Link></span>
            </form>

        </FormContainer>
        <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;