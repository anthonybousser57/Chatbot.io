import React, { Component } from 'react';

class Messages extends Component {
    renderMessage(message) {
        var { member, bot1, bot2, text} = message;
        const { currentMember } = this.props;

        const timestamp = Date.now();
        var date = new Date(timestamp);
        var hours = date.getHours();
        var minutes = '0' + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2);

        if (!member) {
            member = bot1;
        }
        if (!member && !bot1) {
            member = bot2;
        }


        var messageFromMe = member.id === currentMember.id;

        const className = messageFromMe
            ? 'Messages-message currentMember' : 'Messages-message';
        return (
            <li className={className}>
        <span
            className='avatar'
            style={{ backgroundColor: member.clientData.color }}
        />
                <div className='Message-content'>
                    <div className='username'>
                        {member.clientData.username}
                    </div>
                    <div className='text'>{text}</div>
                    <div className='time'>{formattedTime}</div>
                </div>
            </li>
        );
    }

    render() {
        const { messages } = this.props;
        return (
            <ul className='Messages-list'>
                {messages.map((m) => this.renderMessage(m))}
            </ul>
        );
    }
}

export default Messages;
