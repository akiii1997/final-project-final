import React, { Component } from 'react';
import '../pages/css/dashboard.css'
import entry from '../assets/imgs/entry.png'
import suspect from '../assets/imgs/handcupp.jpg'

export class Dashboard extends Component {

    componentDidMount(){
        const token = localStorage.getItem("token")
        if(!token){
            window.location.href = "/";
        }
    } 


    entrymanagement = () => {
        window.location.href = "/entryform";

    }
    suspectmanagement = () => {
        window.location.href = "/suspect";
    }
    render() {
        return (
            <div id="dash_container">
                <div id="dash_items_dashboard">
                    <div id="dash_card" onClick={this.entrymanagement}>
                        <img src={entry} id="card_img_2" alt="" />
                        <div id="card_title">Entry Management System</div>
                    </div>
                    <div id="dash_card" onClick={this.suspectmanagement} >
                        <img src={suspect} id="card_img" alt="" />
                        <div id="card_title">Suspect Management System</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard

