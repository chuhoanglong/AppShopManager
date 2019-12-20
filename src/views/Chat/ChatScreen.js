import React, { Component } from 'react';
import './ChatScreen.css';
import firebase from 'firebase';

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentChat: null,
            message: [],
            userId: null,
            userName: null,
            listMessage: [],
            idChatCurrent: ''
        }
    }

    componentDidMount() {
        this.scrollToBottom();
        this.setState({ userId: localStorage.getItem('userId'), userName: localStorage.getItem('userName').split('@')[0] });

        firebase.database().ref('message').on('value', (snapshot) => {
            // console.log(Object.keys(snapshot.val()));
            let array = Object.keys(snapshot.val());
            console.log(array);

            let listMessage = []
            for (let i = 0; i < array.length; i++) {
                let check = array[i].split('_ONETOONE_').indexOf(this.state.userId);
                if (check >= 0) {
                    let userIdPersonChat = array[i].split('_ONETOONE_').filter(item => { return item !== this.state.userId });
                    // console.log(userIdPersonChat);
                    firebase.database().ref(`users/${userIdPersonChat}`).once('value', (snapshot) => {
                        const { avatar, name, uid, email } = snapshot.val();
                        let idChat = array[i];
                        // console.log({ avatar, name, uid, email });
                        listMessage.push({ avatar, name, uid, email, idChat });
                        this.setState({ listMessage }, () => {
                            console.log(this.state.listMessage);
                            localStorage.setItem('listMessage', JSON.stringify(listMessage));
                        });
                    })
                }

            }

        })
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    getData = (idChat) => {
        this.setState({ idChatCurrent: idChat })
        firebase.database().ref(`message/${idChat}`).once('value', (snapshot) => {
            this.setState({ message: Object.values(snapshot.val()) })
        })
        firebase.database().ref(`message/${idChat}`).on('value', (snapshot) => {
            this.setState({ message: Object.values(snapshot.val()) })
        })
    }
    onChangeChat = (e) => {
        const value = e.target[e.target.type === "checkbox" ? "checked" : "value"];
        const name = e.target.name;
        this.setState({
            [name]: value
        });
    }
    onSendChat = () => {
        const { idChatCurrent } = this.state
        firebase.database().ref(`message/${idChatCurrent}`).push({
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
                <div className='boxChat' style={{ top: 5, left: userName == message[i].userName ? '' : 3, right: userName == message[i].userName ? -55 : '', backgroundColor: userName == message[i].userName ? '#b6c2ff' : '#eee' }}>
                    <h3 style={{ position: 'absolute', top: 5, textDecoration: 'underline', left: userName == message[i].userName ? '' : 5, right: userName == message[i].userName ? 5 : '' }}>{message[i].userName}</h3>
                    <h5 style={{ position: 'absolute', top: 30, left: userName == message[i].userName ? '' : 5, right: userName == message[i].userName ? 5 : '' }}>{message[i].content}!</h5>
                </div>
            )
        }
        return temp;
    }
    renderBoxUser = () => {
        const { listMessage, userName } = this.state;
        const listMessageLocal = localStorage.getItem('listMessage');
        console.log('listMessageLocal', JSON.parse(listMessageLocal));
        if (listMessage.length == 0) {
            this.setState({ listMessage: JSON.parse(listMessageLocal) });
        }
        let temp = []
        for (let i = 0; i < listMessage.length; i++) {
            temp.push(
                <div style={{ position: 'relative', margin: 10 }}>
                    <input className='buttoninfoPerson' type="button" onClick={() => { this.getData(listMessage[i].idChat) }}></input>
                    <div className='infoPerson'>
                        {/* <button className='buttoninfoPerson' onClick={() => { this.getData(listMessage[i].idChat) }}> */}
                        <div>
                            <img className='image' src={listMessage[i].avatar} style={{ width: 50, height: 50, borderRadius: 100, alignSelf: 'center' }}></img>
                        </div>
                        <div className='infoTxt'>
                            <h4>{listMessage[i].name}</h4>
                            <h5>{listMessage[i].email}</h5>
                        </div>
                        {/* </button> */}
                    </div>
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
            <div className='container' style={{ position: "relative", height: "75%" }}>
                {
                    this.state.listMessage.length > 0 &&
                    <div className='boxContainer' style={{ position: 'absolute', left: 10 }}>
                        {this.renderBoxUser()}
                    </div>
                }
                <div style={{ position: 'absolute', right: 10 }}>
                    <h2>Messaging</h2>
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
            </div >
        )
    }
}
