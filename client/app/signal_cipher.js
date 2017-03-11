"use strict";

const libsignal = require('../libs/libsignal-protocol.js');
const SignalStore = require('./signal-store.js');
const KeyHelper = libsignal.KeyHelper;

module.exports = class SignalCipher {
  constructor(){
    this.signalStore = new SignalStore();
    this.generateInitialKeys();
  }

  generateInitialKeys(){

    let registrationId = KeyHelper.generateRegistrationId();
    this.signalStore.put('registrationId', registrationId);

    KeyHelper.generateIdentityKeyPair().then((identityKeyPair) => {
      this.identityKeyPair = identityKeyPair;
      this.signalStore.put('identityKey', identityKeyPair);
    });

    this.keyId = 1337;

    KeyHelper.generatePreKey(this.keyId).then((preKey) => {
      this.signalStore.storePreKey(preKey.keyId, preKey.keyPair);
    });

    KeyHelper.generateSignedPreKey(identityKeyPair, this.keyId)
    .then((signedPreKey) => {
      this.signalStore.storeSignedPreKey(signedPreKey.keyId, signedPreKey.keyPair);
    });
  }

  buildSession(sessionData){
    return sessionBuilder.processPreKey({
        registrationId: this.signalStore.get('registrationId'),
        identityKey: this.signalStore.get('identityKey').pubKey,
        signedPreKey: {
            keyId     : this.keyId,
            publicKey : this.signalStore.loadSignedPreKey(this.keyId).pubKey,
            signature : this.signalStore.loadSignedPreKey(this.keyId).privKey
        },
        preKey: {
            keyId     : this.keyId,
            publicKey : this.signalStore.loadPreKey(this.keyId).pubKey
        }
    });
  }

}
