import React, { Component } from 'react';
import './ChatScreen.css';
import firebase from 'firebase';

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentChat: null,
            message: []
        }
    }

    componentDidMount() {

        firebase.database().ref('/message').once('value').then((snapshot) => {
            console.log(snapshot.val());
        });
        firebase.database().ref('message/userId123').on('value', (snapshot) => {
            console.log(snapshot.val());
        })
    }

    onChangeChat = (e) => {
        const value = e.target[e.target.type === "checkbox" ? "checked" : "value"]
        const name = e.target.name;
        this.setState({
            [name]: value
        });
    }
    onSendChat = () => {
        console.log(this.state.contentChat);
    }
    render() {
        return (
            <div>
                <h3>Messaging</h3>
                <div className="mainChat" >
                    <div className="userChat">
                        {/* <h4>NameUser</h4>
                        <h5>sadasd</h5> */}
                    </div>
                    <div className="contentChat">
                        <h6></h6>
                        <input className='EnterChat' name='contentChat' type='text' placeholder="Enter content chat!" onChange={this.onChangeChat}></input>
                        <input className='sendChat' value="Send" type="button" onClick={this.onSendChat}></input>
                    </div>
                </div>
            </div>
        )
    }
}
