import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Meteor from 'react-native-meteor';

class ChatPage extends Component {
  onSend(message) {
    const { contact } = this.props;
    const { text: messageText, createdAt: messageDate, user } = message[0];

    Meteor.call('messages.insert', {
      text: `${messageText}`,
      createdAt: messageDate,
      to: contact.digits,
      user: {
        _id: user._id,
        avatar: 'https://avatars1.githubusercontent.com/u/7440159?v=3&s=40',
      },
    }, (error, response) => {
      if (error) console.warn(error.reason);
      if (response) console.log(response);
    });
  }

  render() {
    // TODO: perf issues sometimes
    const { messages, navigator } = this.props;
    const { user } = navigator.props;
    const { number: userPhoneNumber } = user.phone;
    return (
      <GiftedChat
        messages={messages}
        onSend={(message) => this.onSend(message)}
        user={{ _id: userPhoneNumber }}
      />
    );
  }
}

ChatPage.propTypes = {
  navigator: React.PropTypes.object,
  contact: React.PropTypes.object,
  messages: React.PropTypes.array,
};

export default ChatPage;
