/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

import io from 'socket.io-client';
import { deleteItem, addItem } from '../utils/chat-reducer-helper';
import SignalStore from '../utils/signal-store';
const KeyHelper = libsignal.KeyHelper;

const initialState = {
  host: 'http://localhost',
  port: 9090,
  username: 'anonymous',
  signal: {
    store: new SignalStore(),
    preKeyId: 1, // TODO: Change this.
    signedKeyId: 1,
    ownKeys: [],
    keysReqAmount: 10
  }
}

const chatReducer = (state = initialState, action) => {
  const { user } = action;
  switch (action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.username
      }

    case 'GENERATING_INIT_KEYS':
      return {
        ...state,
        generatingKeys: true
      }

    case 'GENERATED_INIT_KEYS':
      return {
        ...state,
        generatingKeys: false
      }

    case 'PUSH_KEYS':
      const { newKeys, preKeyId, signedKeyId } = action;
      const currentKeys = state.signal.ownKeys;
      return {
        ...state,
        signal: {
          ...state.signal,
          ownKeys: [...currentKeys, ...newKeys],
          preKeyId,
          signedKeyId
        }
      };

    case 'INIT_CHAT':
      const { keysReqAmount, signalAddress, sessionBuilder } = action;
      return {
        ...state,
        user,
        signal: {
          ...state.signal,
          keysReqAmount,
          sessionBuilder,
          signalAddress
        }
      };

    case 'CONNECT':
      const { host, port } = state;
      const serverUrl = `${host}:${port}`;
      const socket = io.connect(serverUrl, { query: "username=" + state.username } );
      return {
        ...state,
        socket
      }

    case 'SEND_MESSAGE':
      state.socket.emit('chat-msg', { message: action.message });
      return state;

    case 'SEND_KEYS':
      const keys = state.signal.ownKeys.splice(0, state.signal.keysReqAmount);
      state.socket.emit('receive-keys', keys);
      return state;

    case 'UPDATE_USER_STATUS':
      const online = (action.status === 'user-connected');
      const { _id } = user;
      const { onlineUsers, offlineUsers } = state;

      return {
        ...state,
        offlineUsers: online ? deleteItem(_id, offlineUsers) : addItem(_id, user, offlineUsers),
        onlineUsers: online ? addItem(_id, user, onlineUsers) : deleteItem(_id, onlineUsers),
      }

    case 'UPDATE_USER_LIST':
      const { allUsers } = action;
      let updatedOnlineUsers = {};
      let updatedOfflineUsers = {};

      allUsers.map((user) => {
        if (user.online) {
          updatedOnlineUsers[user._id] = user;
        } else {
          updatedOfflineUsers[user._id] = user;
        }
      });

      return {
        ...state,
        onlineUsers: updatedOnlineUsers,
        offlineUsers: updatedOfflineUsers,
      };
    default:
      return state;
  }
}

export default chatReducer;
