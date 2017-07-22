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
import {
  toArrayBuffer,
  preKeyToString,
  preKeyToArrayBuffer,
  arrayBufferToString,
  stringToBase64,
  base64ToString
} from '../utils/signal-helpers';
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
    keysReqAmount: 10,
    sessions: {}
  },
  conversations: {}
}

const chatReducer = (state = initialState, action) => {
  const { user } = action;
  const { onlineUsers, offlineUsers, signal } = state;
  const userId = user ? user._id : null;
  console.log(action.type, action);
  switch (action.type) {
    case 'SEND_MESSAGE':
      const { message } = action;
      const userSession = state.signal.sessions[action.message.receiverId];

      if (userSession.keys.length <= signal.keysReqAmount) {
        state.socket.emit('request-keys', { id: action.message.receiverId });
      }

      const lastKey = userSession.keys.splice(0, 1)[0];
      console.log('Using key: ', lastKey);
      const parsedLastKey = preKeyToArrayBuffer(lastKey);

      userSession.builder.processPreKey(parsedLastKey).then(() => {
        userSession.cipher.encrypt(toArrayBuffer(action.message.text)).then((ciphertext) => {
          const parsedCiphertext = stringToBase64(ciphertext.body);
          console.log('Sending ', ciphertext);
          console.log('In base 64: ', parsedCiphertext);
          ciphertext.body = parsedCiphertext;
          message.text = ciphertext;
          state.socket.emit('chat-msg', { message: message });
        })
      });

      return state;

    case 'ADD_MSG_TO_CHAT':
      const conversation = state.conversations[action.userId] || [];

      action.message.text.body = base64ToString(action.message.text.body);
      console.log('Ciphertext is: ', action.message.text.body);
      const cipher = state.signal.sessions[action.userId].cipher;
      return cipher.decryptPreKeyWhisperMessage(action.message.text.body, 'binary').then((plaintext) =>{
        action.message.text = arrayBufferToString(plaintext);
        return {
          ...state,
          conversations: {
            ...state.conversations,
            [action.userId]: [
              ...conversation,
              action.message
            ]
          }
        };
      });

    case 'ADD_MSG_TO_SELF':
      const selfConversation = state.conversations[action.userId] || [];
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.userId]: [
            ...selfConversation,
            action.message
          ]
        }
      };
    case 'LOAD_SESSION':
      if (!signal.sessions[action.id]) {
        const address = new libsignal.SignalProtocolAddress(`${action.id}`, 1);
        const builder = new libsignal.SessionBuilder(signal.store, address);
        const cipher = new libsignal.SessionCipher(signal.store, address);
        state.socket.emit('request-keys', {id: action.id});
        return {
          ...state,
          signal: {
            ...state.signal,
            sessions: {
              ...state.signal.sessions,
              [action.id]: {
                builder,
                cipher,
                keys: []
              }
            }
          }
        }
      } else {
        if (state.signal.sessions[action.id].keys.length <= signal.keysReqAmount) {
          state.socket.emit('request-keys', { id: action.id });
        }
        return state;
      }

    case 'STORE_USER_KEYS':
      return {
        ...state,
        signal: {
          ...state.signal,
          sessions: {
            ...state.signal.sessions,
            [action.id]: {
              ...state.signal.sessions[action.id],
              keys: [...state.signal.sessions[action.id].keys, ...action.keys]
            }
          }
        }
      }

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
      const { keysReqAmount } = action;
      return {
        ...state,
        user,
        signal: {
          ...state.signal,
          keysReqAmount
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

    case 'SEND_KEYS':
      const keys = state.signal.ownKeys.splice(0, state.signal.keysReqAmount);
      const parsedKeys = [];
      keys.forEach(key => {
        parsedKeys.push(preKeyToString(key));
      });
      state.socket.emit('receive-keys', parsedKeys);
      return state;

    case 'UPDATE_USER_STATUS':
      const online = (action.status === 'user-connected');

      return {
        ...state,
        offlineUsers: online ? deleteItem(userId, offlineUsers) : addItem(userId, user, offlineUsers),
        onlineUsers: online ? addItem(userId, user, onlineUsers) : deleteItem(userId, onlineUsers),
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
