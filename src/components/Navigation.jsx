import React, { Component } from 'react'
import './styles/navigation.css'
import Logo from '../assets/imgs/logo.svg'

export class Navigation extends Component {

    logout(){
        localStorage.clear()
        window.location.href ='/'
    }

    render() {
        const{show}=this.props;
        if(show){
            return (
                <div id="navigation">
                <div id="left">
                    <img id="logo_img" src={Logo} alt=""/>
                </div>
                 <div id="right">
                    <ul>
                        <li>
                           <a onClick={() => this.logout()} >Logout</a>
                        </li>
                    </ul>
                 </div>
             </div> 
            )
        }
        else{
            return <div></div>
        }
       
    }
}

export default Navigation

