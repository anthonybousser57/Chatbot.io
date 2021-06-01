import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    sendMessage: messaga => {
        dispatch(sendMessage(message));
        dispatch(navigateTo({ routeName: 'messagesList' }));
    },
});

export default connect(null, mapDispatchToProps)(MessageSending);
