import React, { Component } from 'react';
import './ChatScreen.css';
import firebase from 'firebase';

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentChat: null,
            message: [{ content: "hi1", userName: "longhoang" }, { content: "chao ban!", userName: "nguyenthuylinh" }, { content: "hi1", userName: "longhoang" }, { content: "chao ban!", userName: "nguyenthuylinh" }, { content: "hi1", userName: "longhoang" }, { content: "chao ban!", userName: "nguyenthuylinh" }, { content: "hi1", userName: "longhoang" }, { content: "chao ban!", userName: "nguyenthuylinh" }],
            userId: null,
            userName: null,
        }
    }

    componentDidMount() {
        this.scrollToBottom();
        this.setState({ userId: localStorage.getItem('userId'), userName: localStorage.getItem('userName').split('@')[0] });
        firebase.database().ref('message/3DF4fzyKKoXLgFFeNIVUfG9Dg7F3-rHHw4zrweJcVUCyoLOm7DMmYeNJ3').once('value', (snapshot) => {
            this.setState({ message: Object.values(snapshot.val()) })
            console.log(this.state.message);
        })
        firebase.database().ref('message/3DF4fzyKKoXLgFFeNIVUfG9Dg7F3-rHHw4zrweJcVUCyoLOm7DMmYeNJ3').on('value', (snapshot) => {
            this.setState({ message: Object.values(snapshot.val()) })
            console.log(this.state.message);
        })
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    onChangeChat = (e) => {
        const value = e.target[e.target.type === "checkbox" ? "checked" : "value"];
        console.log(e);

        const name = e.target.name;
        this.setState({
            [name]: value
        });
    }
    onSendChat = () => {
        console.log(this.state.userId);
        firebase.database().ref('message/3DF4fzyKKoXLgFFeNIVUfG9Dg7F3-rHHw4zrweJcVUCyoLOm7DMmYeNJ3').push({
            userName: this.state.userName,
            content: this.state.contentChat
        });
        this.setState({ contentChat: '' })
    }
    renderBoxChat = () => {
        const { message, userName } = this.state;
        let temp = []
        for (let i = 0; i < message.length; i++) {
            temp.push(
                <div className='boxChat'>
                    <h3 style={{ position: 'absolute', top: 5, textDecoration: 'underline', left: userName == message[i].userName ? '' : 5, right: userName == message[i].userName ? 5 : '' }}>{message[i].userName}</h3>
                    <h5 style={{ position: 'absolute', top: 30, left: userName == message[i].userName ? '' : 5, right: userName == message[i].userName ? 5 : '' }}>{message[i].content}!</h5>
                </div>
            )
        }
        return temp;
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    render() {
        return (
            <div style={{ position: 'absolute', right: 10 }}>
                <h3>Messaging</h3>
                <div className="mainChat" >
                    <div className="userChat">
                        {/* <h4>NameUser</h4>
                        <h5>sadasd</h5> */}
                    </div>
                    <div className="contentChat">
                        {this.renderBoxChat()}
                        <div ref={(el) => { this.messagesEnd = el; }} />
                    </div>
                    <div style={{ marginVertical: 20 }}>
                        <input className='EnterChat' name='contentChat' type='text' placeholder="Enter content chat!" onChange={this.onChangeChat} value={this.state.contentChat}></input>
                        <input className='sendChat' value="Send" type="button" onClick={this.onSendChat}></input>
                    </div>
                </div>
            </div>
        )
    }
}
