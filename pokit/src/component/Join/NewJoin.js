import "./NewJoin.css";
import "../../index.css";
import {Link} from "react-router-dom";
import React, { useState } from 'react'
import { FiCoffee } from "react-icons/fi";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// Toast Customization
const displaytoast = (e) => {
    e.preventDefault();
    toast.info('Please Provide an Alias', {containerId: 'A'},{
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "4n5hu",
    });
};

const displaypokittoast=()=>{
    toast('Pokit 🚀 is an Open Source Anonymous Chat Application ❤', {containerId: 'B'},{
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    console.log(window.innerWidth, window.innerHeight);
}

// Retrieving Username
var user;
const getchats=()=>{
    user=document.getElementById("username").value;
    document.getElementById("username").value = "";
}


// Main Function for New Users
function NewJoin() {
    const [uname, setuname] = useState();
    return (
    <div className="parent-cont">
        {/* Toast Container */}
        <ToastContainer
            enableMultiContainer 
            containerId={'A'}
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="4n5hu"
            limit={2}
        />
        <ToastContainer
            enableMultiContainer 
            containerId={'B'}
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="dark"
            limit={1}
        />

        {/* Login Page Structure */}
        <div className="main-cont">
                <div className="icon">{<FiCoffee onClick={displaypokittoast}/>}</div>
            
            <div className="title-cont">
                <div className="w-name">Pokit.</div>
            </div>
            
            <div className="login-cont">
                <div className="login-text">Login</div>
            </div>
            
            <div className="input-cont">
                <input onChange={(e)=>setuname(e.target.value)} placeholder='Type your alias' type="text" id="username"/>
            </div>
            
            <div className="btn-cont">
                <Link onClick={(e)=>!uname?displaytoast(e):null} to="/chat">
                    <button onClick={getchats}>Chat Now&nbsp; <span>&#8594;</span></button>
                </Link>
            </div>

        </div>
    </div>
  )
}

export default NewJoin
export {user}