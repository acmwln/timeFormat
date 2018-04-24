import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from './thunkMiddleware';
import rootReducer from '../reducers/root';

const middlewares = [thunkMiddleware];
let plugin;

// if (__DEV__) {
//     //use redex logger
//     const createLogger = require('redux-logger')
//     const logger = createLogger();
//     middlewares.push(logger);

//     //use redux devtool
//     // const {default:devToolsEnhancer} =  require('remote-redux-devtools')
//     // plugin = devToolsEnhancer();
// }

let finalCreateStore = applyMiddleware(...middlewares)(createStore);
export default function (initialState) {
    return finalCreateStore(rootReducer, initialState, plugin);
}
