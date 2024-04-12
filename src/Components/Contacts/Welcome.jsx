import Robot from "../../assets/robot.gif"
import React, { useState, useEffect } from "react";
import styled from "styled-components";
const Welcome=({currentUser})=>{
    console.log("gdfdg",currentUser);
    const [userName, setUserName] = useState("");
    useEffect( () => {
        async function fetchData(){
          try{
            setUserName(
              await JSON.parse(
                localStorage.getItem("chat-app-user")
              ).name
            );
      }catch(err){
        console.log(err);
      }
          }
            

        fetchData();
     
    }, []);
   return(
    
    <>
    <Container>
    <img src={Robot} alt="Robot" />
     <h1>
        Welcome,<span>{userName}!</span>
     </h1>
     <h3>
        Please select a chat to start chating
     </h3>
    </Container>
   
    </>
   ) 
}

export default Welcome;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;