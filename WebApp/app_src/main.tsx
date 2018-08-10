import "./common/site.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { MessageCenter, EventCenter, Event } from './common/MessageCenter';
import { Scene } from './components/Scene';
import { DevPanel } from './components/DevPanel';
import { LoginPanel } from './components/LoginPanel';
import { ControlPanel } from './components/ControlPanel';
import { MessageBoard } from './components/MessageBoard';
import { CommonUtility } from './common/CommonUtility';
import { ActionType, updateDevPanelData } from './actions';
import { rootReducer } from './reducers';



const isdev = CommonUtility.getQueryString('isdev');
if (!isdev) console.info = console.debug = console.log = () => { };


const eventCenter = new EventCenter();
const messageCenter = new MessageCenter(eventCenter);


const store = createStore(rootReducer);
/* store.subscribe(() => {
    const newState = store.getState();
    console.log('store updated');
    console.log(newState);
});
store.dispatch(updateDevPanelData({
    fps: '20',
    coordinate: 'coordinate',
    linesystemPerformance: 'linesystemPerformance',
    greenMask: 'greenMask'
})); */

const App = () => (
    <div>
        <Scene eventCenter={eventCenter} />
        <DevPanel />
        <LoginPanel eventCenter={eventCenter} />
        <MessageBoard messageCenter={messageCenter} eventCenter={eventCenter} />
        <ControlPanel messageCenter={messageCenter} eventCenter={eventCenter} />
    </div>
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);