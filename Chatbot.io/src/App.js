import React, { Component } from 'react';
import './App.css';
import Messages from './Messages';
import Input from './Input';

function randomName() {
    const name = [
        'You'
    ];
    return name ;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
    state = {
        messages: [],
        member: {
            username: randomName(),
            color: randomColor()
        },
        bot1: {
            username : 'Bot1',
            color: randomColor()
        }
        ,
        bot2: {
            username : 'Bot2',
            color: randomColor()
        }
        ,
        bot3: {
            username : 'Bot3',
            color: randomColor()
        }
    }

    constructor() {
        super();
        this.drone = new window.Scaledrone('KnZ0d0J9LSjnZgc9', {
            data: this.state.member
        });

        this.drone1 = new window.Scaledrone('KnZ0d0J9LSjnZgc9', {
            data: this.state.bot1
        });

        this.drone2 = new window.Scaledrone('KnZ0d0J9LSjnZgc9', {
            data: this.state.bot2
        });

        this.drone3 = new window.Scaledrone('KnZ0d0J9LSjnZgc9', {
            data: this.state.bot3
        });

        this.drone.on('open', error => {
            if (error) {
                return console.error(error);
            }
            const member = {...this.state.member};
            member.id = this.drone.clientId;
            member.idMessage = this.drone.idMessage;
            member.timestamp = this.drone.timestamp;

            this.setState({member});
        });

        this.drone1.on('open', error => {
            if (error) {
                return console.error(error);
            }
            const bot1 = {...this.state.bot1};
            bot1.id = this.drone1.clientId;
            bot1.idMessage = this.drone1.id;
            bot1.timestamp = this.drone1.timestamp;

            this.setState({bot1});
        });
        this.drone2.on('open', error => {
            if (error) {
                return console.error(error);
            }
            const bot2 = {...this.state.bot2};
            bot2.id = this.drone2.clientId;
            bot2.idMessage = this.drone2.id;
            bot2.timestamp = this.drone2.timestamp;

            this.setState({bot2});
        });
        this.drone3.on('open', error => {
            if (error) {
                return console.error(error);
            }
            const bot3 = {...this.state.bot3};
            bot3.id = this.drone3.clientId;
            bot3.idMessage = this.drone3.id;
            bot3.timestamp = this.drone3.timestamp;

            this.setState({bot3});
        });

        const room = this.drone.subscribe('observable-room');
        room.on('data', (data, member) => {
            const messages = this.state.messages;
            messages.push({member, text: data});
            this.setState({messages});
        });

        const room1 = this.drone1.subscribe('observable-room');
        room1.on('data', (data, bot1) => {
            const messages = this.state.messages;
            messages.push({bot1, text: data});
            this.setState({messages});
        });
        const room2 = this.drone2.subscribe('observable-room');
        room.on('data', (data, bot2) => {
            const messages = this.state.messages;
            messages.push({bot2, text: data});
            this.setState({messages});
        });

        const room3 = this.drone3.subscribe('observable-room');
        room.on('data', (data, bot3) => {
            const messages = this.state.messages;
            messages.push({bot3, text: data});
            this.setState({messages});
        });
    }

    render() {
        return (
            <div className='App'>

                <div className='App-header'>
                    <h1>Chatbot.io</h1>
                </div>
                <div className='memberList'>
                    <h1>Membres</h1>
                    <h2>You</h2>
                    <h3>Bot1</h3>
                    <h3>Bot2</h3>
                    <h3>Bot3</h3>
                </div>
                <Messages
                    messages={this.state.messages}
                    currentMember={this.state.member}
                />
                <Input
                    onSendMessage={this.onSendMessage}
                />
            </div>
        );
    }

    onSendMessage = (message) => {

        const timestamp = Date.now(); // affichage heure du message
        var date = new Date(timestamp);
        var hours = date.getHours();
        var minutes = '0' + date.getMinutes();
        var seconds = '0' + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        //console.log(formattedTime);


        const room = this.drone.subscribe('observable-room');
        room.on('message', message => {

        });

        this.drone.publish({
            room: 'observable-room',
            formattedTime,
            message
        });


        // action commune
        if (message.includes('Hello'))
        {
            this.drone1.publish({
                room: 'observable-room',
                message
            });
            this.drone2.publish({
                room: 'observable-room',
                message
            });
            this.drone2.publish({
                room: 'observable-room',
                message: 'For help try : -help'
            });
            this.drone3.publish({
                room: 'observable-room',
                message
            });
        }

        if (message.includes('-help')) // help command
        {
            this.drone1.publish({
                room: 'observable-room',
                message: 'Do you need some help ? Try some of these commands:  bot1 -h / bot2 -h / bot3 -h'
            })
        }

        // actions bot 1 only

        if (message.includes('bot1 -h'))
        {
            this.drone1.publish({
                room: 'observable-room',   //bot1 help
                message: 'For the 1st bot you can test the following commands: -date / -cours / -saison'
            });
        }

        if (message.includes('-date'))
        {
            this.drone1.publish({
                room: 'observable-room',   //bot1 action1
                message : 'Mardi 1 juin 2021'
            });
        }

        if (message.includes('-cours'))
        {
            this.drone1.publish({
                room: 'observable-room',   //bot1 action2
                message: 'React JS'
            });
        }

        if (message.includes('-saison'))
        {
            this.drone1.publish({
                room: 'observable-room',   //bot1 action3
                message: 'Summer'
            });
        }

        //action bot 2 only

        if (message.includes('bot2 -h'))
        {
            this.drone2.publish({
                room: 'observable-room',   //bot2 help
                message: 'For the 2nd bot you can test the following commands: -school / -prof / -promo'
            });
        }

        if (message.includes('-school'))
        {
            this.drone2.publish({
                room: 'observable-room',   //bot2 action 1
                message: 'EPITA'
            });
        }

        if (message.includes('-prof'))
        {
            this.drone2.publish({
                room: 'observable-room',   //bot2 action 2
                message: 'Cyril Vimard'
            });
        }

        if (message.includes('-promo'))
        {
            this.drone2.publish({
                room: 'observable-room',   //bot2 action 3
                message: 'APPING_X 2'
            });
        }

        //action bot 3 only

        if(message.includes('bot3 -h'))
        {
            this.drone3.publish({
                room: 'observable-room',   //bot3 help
                message: 'For the 3rd bot you can test the following commands: -city / -author / -birthdate'
            });
        }

        if(message.includes('-ville'))
        {
            this.drone3.publish({
                room: 'observable-room',   //bot3 action 1
                message: 'Paris'
            });
        }

        if(message.includes('-author'))
        {
            this.drone3.publish({
                room: 'observable-room',   //bot3 action 2
                message: 'Anthony Bousser'
            });
        }

        if(message.includes('-birthdate'))
        {
            this.drone3.publish({
                room: 'observable-room',   //bot3 action 3
                message: '08/08/1999'
            });
        }
    }
}
export default App;
