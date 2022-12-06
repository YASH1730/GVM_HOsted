// This file is create for the creating the store in browser Redux section for state storing
import {createStore} from 'redux'; // it was depreciated
import globalReducer from './reducer/index'; // root reducer


const Store = createStore(globalReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default Store; 