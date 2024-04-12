import {  useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import{ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { setAvatarRouter } from "../../utils/APIRoutes";
import {Buffer} from "buffer"; 
import Loader from "../Loader";
import styled from "styled-components";




const SetAvatar =()=>{
    const api="https://api.multiavatar.com/45678945"
    const navigate=useNavigate();
    const [avatars,setAvatars]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [selectedAvatar,setSelectedAvatar]=useState("");
    const toastOptions={
        position:"top-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }

    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user",)){
            navigate("/login");
        }
    },[navigate])
    const setProfilePicture=async()=>{
        console.log('hello');
       if(selectedAvatar===""){
        
        toast.error("Please select an avatar", toastOptions)
       }else{
        const user =await JSON.parse(localStorage.getItem("chat-app-user"));
        const {data}= await axios.post(`${setAvatarRouter}/${user._id}`,{

            image:avatars[selectedAvatar],
        })
        console.log(data.isSet);
        if(data.isSet){
            localStorage.setItem("chat-app-user",JSON.stringify(data.user));
            navigate("/");
           }else{
            toast.error("Error setting avatar. Please try again", toastOptions)
           }
       }
     
    }
    useEffect(()=>{
        
        async function fetchData(){
            console.log("hi");
            const data=[]
            for(let i=0;i<4;i++){
                    try{ const image=await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
                    const buffer=new Buffer(image.data);
                    data.push(buffer.toString("base64"));
                }catch(err){
                    toast.error("Error setting avatar. Please try again", toastOptions)
                }
                   
                  
               }
               console.log("hello");
               setAvatars(data);
               setIsLoading(false);
         
        }
       fetchData();
    })
    return(
        <>
        {isLoading? <Loader Loading={isLoading}/>:
        <Container>
        <div className="title-container">
            <h1>
                Pick an avatar for your profile picture
            </h1>
        </div>
        <div className="avatars">
           {
            avatars.map((avatar,index)=>{
                return(
                    <div className={`avatar ${selectedAvatar  === index ? "selected" : ""}`} key={index}>
                      <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>setSelectedAvatar(index)} />
                    </div>
                )
            })
           }
        </div>
        <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
        <ToastContainer />
        </Container>
        
        }
        
        
        </>
    )
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
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
`;

export default SetAvatar;