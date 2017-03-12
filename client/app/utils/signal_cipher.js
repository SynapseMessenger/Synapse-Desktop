"use strict";

const libsignal = require('../libs/libsignal-protocol.js');
const SignalStore = require('./signal-store.js');
const KeyHelper = libsignal.KeyHelper;

module.exports = class SignalCipher {
  constructor(){
    this.signalStore = new SignalStore();
    this.preKeyId = 1337;
    this.signedKeyId = 1;
    this.generateInitialKeys();
  }

  generateInitialKeys(){

    let registrationId = KeyHelper.generateRegistrationId();
    this.signalStore.put('registrationId', registrationId);

    KeyHelper.generateIdentityKeyPair().then((identityKeyPair) => {
      this.identityKeyPair = identityKeyPair;
      this.signalStore.put('identityKey', identityKeyPair);
    });

    KeyHelper.generatePreKey(this.preKeyId).then((preKey) => {
      this.signalStore.storePreKey(this.preKeyId, preKey.keyPair);
    });

    KeyHelper.generateSignedPreKey(identityKeyPair, this.signedKeyId)
    .then((signedPreKey) => {
      this.signalStore.storeSignedPreKey(this.signedKeyId, signedPreKey.keyPair);
    });
  }

  getSessionData(){
    return {
        registrationId: this.signalStore.get('registrationId'),
        identityKey: this.signalStore.get('identityKey').pubKey,
        signedPreKey: {
            keyId     : this.signedKeyId,
            publicKey : this.signalStore.loadSignedPreKey(this.signedKeyId).pubKey,
            signature : this.signalStore.loadSignedPreKey(this.signedKeyId).signature
        },
        preKey: {
            keyId     : this.preKeyId,
            publicKey : this.signalStore.loadPreKey(this.preKeyId).pubKey
        }
    };
  }

}
