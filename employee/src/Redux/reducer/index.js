import {combineReducers} from 'redux';
import {alert,form} from './utility'

const globalReducer = combineReducers({
    alert,
    form
})

export default globalReducer;