"use strict";

const libsignal = require('../libs/libsignal-protocol.js')

module.exports = class SignalCipher {
  constructor(){
    this.generateInitialKeys();
  }

  generateInitialKeys(){
    const KeyHelper = libsignal.KeyHelper;

    this.signalKeyStore = new MySignalProtocolStore();

    this.registrationId = KeyHelper.generateRegistrationId();

    KeyHelper.generateIdentityKeyPair().then((identityKeyPair) => {
      this.identityKeyPair = identityKeyPair;
    });

    KeyHelper.generatePreKey(keyId).then((preKey) => { // keyId ?
      this.preKey = preKey;
    });

    KeyHelper.generateSignedPreKey(identityKeyPair, keyId)
    .then((signedPreKey) => {
      this.signedPreKey = signedPreKey;
    });
  }

  buildSession(sessionData){
    return sessionBuilder.processPreKey({
        registrationId: this.registrationId,
        identityKey: this.identityKey.pubKey,
        signedPreKey: {
            keyId     : this.signedPreKey.keyId,
            publicKey : this.signedPreKey.keyPair.pubKey,
            signature : this.signedPreKey.keyPair.privKey // ?
        },
        preKey: {
            keyId     : this.preKey.keyId,
            publicKey : this.preKey.keyPair.pubKey
        }
    });
  }

}
