import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
// import { subscribeCached } from 'react-native-meteor-redux';
import ChatPage from './ChatPage';
// import { MeteorStore } from '../../container/meteorRedux';

class ChatPageContainer extends Component {
  render() {
    const { messagesReady, messages } = this.props;
    return (
      <ChatPage
        messagesReady={messagesReady}
        messages={messages}
        {...this.props}
      />
    );
  }
}

ChatPageContainer.propTypes = {
  messagesReady: React.PropTypes.bool,
  messages: React.PropTypes.array,
};

export default createContainer((props) => {
  const { digits: contactDigitNumber } = props.contact;
  const { number: userNumber } = props.navigator.props.user.phone;

  const handle = Meteor.subscribe('messages',
    {
      contactDigitNumber: contactDigitNumber,
      userNumber: userNumber,
    }
  );
  return {
    messagesReady: handle.ready(),
    messages: Meteor.collection('messages').find({}, { sort: { createdAt: -1 } }),
  };
}, ChatPageContainer);
