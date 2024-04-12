
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute,host } from "../../utils/APIRoutes";
import Contacts from "../../Components/Contacts/Contacts";
import Welcome from "../../Components/Contacts/Welcome";
import ChatContainer from "../../Components/ChatContainer";
import styled from "styled-components";
import {io} from "socket.io-client"

const Chat=()=>{
  const socket=useRef();
    const [contacts,setContacts]=useState([]);
    const [currentUser,setCurrentUser]=useState("");
    const [currentChat,setCurrentChat]=useState("")
    const navigate=useNavigate();
    useEffect( ()=>{
        async function fetchData(){
            if(!localStorage.getItem("chat-app-user",)){
                navigate("/login");
            }else{
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
            }
        }

        fetchData();
      
    },[navigate])
    useEffect(()=>{
        async function fetchData(){
            if(currentUser){
                if(currentUser.avatarImageSet){
                  const data=await axios.get(`${allUsersRoute}/${currentUser._id}`)
                  console.log(data.data);
                  setContacts(data.data)
                }else{
                    navigate("/setAvatar");
                }
              }
        }

        fetchData();
    
    },[currentUser,navigate])

    useEffect(()=>{
      if (currentUser) {
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
      }
    },[currentUser])

    const handleChatChange=(chat)=>{
        setCurrentChat(chat);
    }

    return(
        <Container>
            
            <div className="container">
             <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
             {currentChat === "" ? (
            <Welcome  />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          )}
            </div>
             
        </Container>
    )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;