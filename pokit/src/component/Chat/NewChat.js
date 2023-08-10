import "./NewChat.css";
import "../../index.css";
import {user} from "../Join/NewJoin";
import socketIo from "socket.io-client";
import Message from "../Messages/messages";
import React, { useEffect, useState } from 'react'
import { FaUser, FaUserCircle } from "react-icons/fa";
import { HiOutlineSearch,HiOutlinePaperClip,HiOutlinePaperAirplane } from "react-icons/hi";


const ENDPOINT = "http://localhost:5000";

function NewChat() {
  const [socket, setSocket] = useState(null);
  const [messageincomming, setmessageincomming] = useState("");
  const [id, setid] = useState("")
  const semd=()=>{
    console.log(messageincomming);
    socket.emit("message",{messageincomming, id});
    document.getElementsByClassName("msgs").innerHTML=messageincomming;
    document.getElementsByClassName("type-smth").value="";
    
    // Creating new element
    const senderele = document.createElement("div");
    senderele.classList.add('smsg');
    senderele.innerHTML = messageincomming;
    
    // Adding element to the dom
    const livechatwindow = document.getElementsByClassName('sendermsg-cont');
    livechatwindow[0].appendChild(senderele)
  }

  useEffect(() => {
    const socket = socketIo(ENDPOINT, {transports: ["websocket"]});
    setSocket(socket);
    socket.on("connect",()=>{
      setid(socket.id);
    })
    
    socket.emit("joined", {user})
    
    socket.on("welcome", (data)=>{
      console.log("<======= WELCOME MESSAGE =======>");
      console.log(`${data.user}: ${data.message}\n`);
    })
    
    socket.on("broadcastmsg", (data)=>{
      console.log("<======= BROADCASTING MESSAGE =======>");
      console.log(`${data.user}: ${data.message}\n`);
    })
    socket.on("broadcastleavemsg", (data)=>{
      console.log(`${data.user}: ${data.message}\n`);
    })

    socket.on("sendusermessages", (data)=>{
      console.log("<======= USER MESSAGE =======>");
      console.log(`${data.user}: ${data.message.messageincomming}: ${data.message.id}\n`);
    })
    return () => {
      socket.disconnect();
      socket.off();
    }

  },[setSocket])

  return (
  <div className='parent-cont-chat'>
    <div className="main-cont-chat">
      
      {/* HEADER */}
      <div className="navbar-chat">
        
        <div className="left-logo-cont">
          <h1 className="pokit-logo">
            Pokit
          </h1>
          <h4 className="meta">
            Anonymous Chat App
          </h4>
        </div>
        
        <div className="my-user">
          <div className="name-status-con">
            <h2 className="my-name">Swastik</h2>
            <span className="status">Online</span>
          </div>
          {<FaUser className="user-icon"/>}
        </div>

      </div>

    <hr/>

    {/* CHAT BODY */}
    <div className="body-cont">

      <div className="lside-chats-cont">
      
        <div className="search-bar">
          {<HiOutlineSearch className="search-icon"/>}
          <div className="search">Search</div>
        </div>
      
        <div className="all-chats-cont">
          
          <div className="chats chat-1">
            {<FaUserCircle className="u-icon user-icon-1"/>}
            <div className="name-msg">
              <div className="u-name user-name-1">4n5hu</div>
              <div className="u-msg user-msg-1">Aur be kya kr...</div>
            </div>
            <div className="m-time msg-time-1">07:23pm</div>
          </div>
          
          <div className="chats chat-2">
            {<FaUserCircle className="u-icon user-icon-2"/>}
            <div className="name-msg">
              <div className="u-name user-name-2">Nikks</div>
              <div className="u-msg user-msg-2">Wassup bitch?...</div>
            </div>
            <div className="m-time msg-time-3">10:04am</div>
          </div>

          <div className="chats chat-3">
            {<FaUserCircle className="u-icon user-icon-3"/>}
            <div className="name-msg">
              <div className="u-name user-name-3">Keshfx</div>
              <div className="u-msg user-msg-3">Omkey.</div>
            </div>
            <div className="m-time msg-time-3">12:46pm</div>
          </div>
        
        </div>
      
      </div>

      <div className="chat-window">
        
        <div className="chat-window-header">
          <div className="convo-cont">
            {<FaUserCircle className="current-user-icon"/>}
            <div className="convo-tag">Conversation with Nikks</div>
          </div>
        </div>

        <div className="live-chat-window">
          <div className="recievermsg-cont">
            {/* <div className="rmsgs">ass nigga</div> */}
            <Message className="rmsgs" msg={"Ashya zi"}/>
          </div>
          <div className="sendermsg-cont">
            <Message className="smsgs" msg={messageincomming}/>
            <Message msg={messageincomming}/>
          </div>
        </div>
        
        <div className="sendmsg-cont">
          <input className="type-smth" type="text" onChange={event => setmessageincomming(event.target.value)}/>
          <div className="send-icons">
            {<HiOutlinePaperClip className="doc-icon"/>}
            {<HiOutlinePaperAirplane onClick={semd} className="send-icon"/>}
          </div>
        </div>
      
      </div>
    </div>
    
    </div>
  </div>
  )
}

export default NewChat