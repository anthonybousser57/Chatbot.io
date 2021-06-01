import reducer from './reducer';
import { createStore } from 'redux';

const store = createStore(reducer);
class App extends React.Component {
    render() {
        <Message store={store} />
    };
};
