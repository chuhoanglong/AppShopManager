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
            listMessage: []
        }
    }

    componentDidMount() {
        this.scrollToBottom();
        this.setState({ userId: localStorage.getItem('userId'), userName: localStorage.getItem('userName').split('@')[0] });
        firebase.database().ref('message/3DF4fzyKKoXLgFFeNIVUfG9Dg7F3_ONETOONE_rHHw4zrweJcVUCyoLOm7DMmYeNJ3').once('value', (snapshot) => {
            this.setState({ message: Object.values(snapshot.val()) })
        })
        firebase.database().ref('message/3DF4fzyKKoXLgFFeNIVUfG9Dg7F3_ONETOONE_rHHw4zrweJcVUCyoLOm7DMmYeNJ3').on('value', (snapshot) => {
            this.setState({ message: Object.values(snapshot.val()) })
        })
        firebase.database().ref('message').on('value', (snapshot) => {
            // console.log(Object.keys(snapshot.val()));
            let array = Object.keys(snapshot.val());
            console.log(Object.values(snapshot.val()));

            let listMessage = []
            for (let i = 0; i < array.length; i++) {
                let check = array[i].split('_ONETOONE_').indexOf(this.state.userId);
                if (check === 1) {
                    let userIdPersonChat = array[i].split('_ONETOONE_').filter(item => { return item !== this.state.userId });
                    // console.log(userIdPersonChat);
                    firebase.database().ref(`users/${userIdPersonChat}`).once('value', (snapshot) => {
                        const { avatar, name, uid, email } = snapshot.val();
                        // console.log({ avatar, name, uid, email });
                        listMessage.push({ avatar, name, uid, email });
                        this.setState({ listMessage });
                    })
                }

            }
            console.log(this.state.listMessage);

        })
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    onChangeChat = (e) => {
        const value = e.target[e.target.type === "checkbox" ? "checked" : "value"];
        const name = e.target.name;
        this.setState({
            [name]: value
        });
    }
    onSendChat = () => {
        firebase.database().ref('message/3DF4fzyKKoXLgFFeNIVUfG9Dg7F3_ONETOONE_rHHw4zrweJcVUCyoLOm7DMmYeNJ3').push({
            userName: this.state.userName,
            content: this.state.contentChat
        });
        this.setState({ contentChat: '' })
    }
    _handleKeyDown = (e) => {
        if (e.key === 'Enter' && !!this.state.contentChat.trim()) {
            this.onSendChat();
        }
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
            <div>
                <div>

                </div>
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
                            <input className='EnterChat' name='contentChat' type='text' placeholder="Enter content chat!" onChange={this.onChangeChat} onKeyDown={this._handleKeyDown} value={this.state.contentChat}></input>
                            <input className='sendChat' value="Send" type="button" onClick={this.onSendChat}></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
