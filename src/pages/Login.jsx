import React, { useState } from 'react'
import './css/login.css'
import logo from '../assets/imgs/logo.svg'
import {useHistory} from 'react-router-dom'
import swal from 'sweetalert';

export default function Login(props) {

const [user , setUser] = useState({
    username:'',
    password:''
})

const history = useHistory();
const validate = ()=>{
    if(user.username == "admin" && user.password == 'admin'){
        localStorage.setItem(
            "token", "admin"
        )
     props.visible();
        history.push('/dashboard');
       
    }else{
        swal({
            title: "Error!",
            text: "Please correct your inputs !",
            icon: "error",
            button: "OK",
          });
    }
}

    return (
        <>
            <section id="login_container">
                <img src={logo} alt="logo"/>
                <form action="" id="login_form" onSubmit={(e)=> e.preventDefault()}>
                    <input placeholder="username" type="text" name="" id="" onChange={(e)=> setUser({...user , username:e.target.value})}/>
                    <input placeholder="password" type="password" name="" id="" onChange={(e)=> setUser({...user , password:e.target.value})} />
                    <button id="login_btn" onClick={validate}>LOGIN</button>
                </form>
            </section>
        </>
    )
}
