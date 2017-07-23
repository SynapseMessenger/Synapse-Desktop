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
    sessions: {}
  },
  conversations: {}
}

const chatReducer = (state = initialState, action) => {
  const { user } = action;
  const { onlineUsers, offlineUsers, signal } = state;
  const userId = user ? user._id : null;
  switch (action.type) {
    case 'SEND_KEY':
      state.socket.emit('receive-key', {
        key: preKeyToString(action.key),
        userId: action.receiverId,
        generatorId: state.user._id,
      });
      return {
        ...state,
        signal: {
          ...state.signal,
          preKeyId: action.preKeyId,
          signedKeyId: action.signedKeyId
        }
      };

    case 'SEND_MESSAGE':
      const msgReceiverSession = state.signal.sessions[action.receiverId];
      const plainMessage = msgReceiverSession.messagesToSend.shift();

      msgReceiverSession.builder.processPreKey(preKeyToArrayBuffer(action.key)).then(() => {
        msgReceiverSession.cipher.encrypt(toArrayBuffer(plainMessage.text)).then( ciphertext => {
          const b64Ciphertext = stringToBase64(ciphertext.body);
          const cipheredMessage = {
            ...plainMessage,
            text: b64Ciphertext
          };
          state.socket.emit('chat-msg', { message: cipheredMessage });
        });
      });
      return state;

    case 'STORE_MSG_REQUEST_KEY':
      const userSession = state.signal.sessions[action.message.receiverId];
      const updatedMsgToSend = [...userSession.messagesToSend, ...[action.message]];
      state.socket.emit('request-key', {
        generatorId: action.message.receiverId,
        userId: state.user._id
      });
      return {
        ...state,
        signal: {
          ...state.signal,
          sessions: {
            ...state.signal.sessions,
            [action.message.receiverId]: {
              ...userSession,
              messagesToSend: updatedMsgToSend
            }
          }
        }
      };

    case 'ADD_MSG_TO_CHAT':
    const conversation = state.conversations[action.userId] || [];
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
        return {
          ...state,
          signal: {
            ...state.signal,
            sessions: {
              ...state.signal.sessions,
              [action.id]: {
                messagesToSend: [],
                builder,
                cipher
              }
            }
          }
        }
      } else {
        return state;
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

    case 'INIT_CHAT':
      return {
        ...state,
        user
      };

    case 'CONNECT':
      const { host, port } = state;
      const serverUrl = `${host}:${port}`;
      const socket = io.connect(serverUrl, { query: "username=" + state.username } );
      return {
        ...state,
        socket
      }

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
