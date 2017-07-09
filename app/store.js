/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

import { createStore } from 'redux';
import reducers from './reducers'
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middlewares = applyMiddleware(thunk);

const store = createStore(reducers, {}, middlewares);

export default store;
