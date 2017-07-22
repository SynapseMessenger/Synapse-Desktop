import SignalStore from '../app/utils/signal-store';
const KeyHelper = libsignal.KeyHelper;
import { preKeyToString, preKeyToArrayBuffer } from '../app/utils/signal-helpers';

function toArrayBuffer (thing) {
    var StaticArrayBufferProto = new ArrayBuffer().__proto__;
    if (thing === undefined) {
        return undefined;
    }
    if (thing === Object(thing)) {
        if (thing.__proto__ == StaticArrayBufferProto) {
            return thing;
        }
    }

    var str;
    if (typeof thing == "string") {
        str = thing;
    } else {
        throw new Error("Tried to convert a non-string of type " + typeof thing + " to an array buffer");
    }
    return new dcodeIO.ByteBuffer.wrap(thing, 'binary').toArrayBuffer();
}

    function generateIdentity(store) {
        return Promise.all([
            KeyHelper.generateIdentityKeyPair(),
            KeyHelper.generateRegistrationId(),
        ]).then(function(result) {
            store.put('identityKey', result[0]);
            store.put('registrationId', result[1]);
        });
    }

    function generatePreKeyBundle(store, preKeyId, signedPreKeyId) {
        return Promise.all([
            store.getIdentityKeyPair(),
            store.getLocalRegistrationId()
        ]).then(function(result) {
            var identity = result[0];
            var registrationId = result[1];

            return Promise.all([
                KeyHelper.generatePreKey(preKeyId),
                KeyHelper.generateSignedPreKey(identity, signedPreKeyId),
            ]).then(function(keys) {
                var preKey = keys[0]
                var signedPreKey = keys[1];

                store.storePreKey(preKeyId, preKey.keyPair);
                store.storeSignedPreKey(signedPreKeyId, signedPreKey.keyPair);

                return {
                    identityKey: identity.pubKey,
                    registrationId : registrationId,
                    preKey:  {
                        keyId     : preKeyId,
                        publicKey : preKey.keyPair.pubKey
                    },
                    signedPreKey: {
                        keyId     : signedPreKeyId,
                        publicKey : signedPreKey.keyPair.pubKey,
                        signature : signedPreKey.signature
                    }
                };
            });
        });
    }

    var decoder = new TextDecoder("utf-8");

    function ab2str(buf) {
        return decoder.decode(new Uint8Array(buf));
    }

var ALICE_ADDRESS = new libsignal.SignalProtocolAddress("+14151111111", 1);
var BOB_ADDRESS   = new libsignal.SignalProtocolAddress("+14152222222", 1);


var aliceStore = new SignalStore();
var alicePreKeyId = 2222;
var aliceSignedKeyId = 2;

var bobStore = new SignalStore();
var bobPreKeyId = 1111;
var bobSignedKeyId = 1;

Promise.all([generateIdentity(aliceStore), generateIdentity(bobStore)]).then(() => {
  return Promise.all([
    generatePreKeyBundle(bobStore, bobPreKeyId, bobSignedKeyId),
    generatePreKeyBundle(aliceStore, alicePreKeyId, aliceSignedKeyId)
  ]).then((result) => {
    const bobPreKeyBundle = result[0];
    const alicePreKeyBundle = result[1];

    var AliceBuilder = new libsignal.SessionBuilder(aliceStore, BOB_ADDRESS);
    var BobBuilder = new libsignal.SessionBuilder(bobStore, ALICE_ADDRESS);

    console.log('Keys generated: ', bobPreKeyBundle, alicePreKeyBundle);

    const parsedBobKeys = preKeyToString(bobPreKeyBundle);
    const parsedAliceKeys = preKeyToString(alicePreKeyBundle);

    const pBobK = preKeyToArrayBuffer(parsedBobKeys);
    const pAliceK = preKeyToArrayBuffer(parsedAliceKeys);

    console.log(pBobK, pAliceK);

    Promise.all([
      AliceBuilder.processPreKey(pBobK),
      BobBuilder.processPreKey(pAliceK),
    ]).then(() => {

      console.log('here');

      var msgToBob = toArrayBuffer("Message to Bob");
      var msgToBob2 = toArrayBuffer("Message to Bob2");
      var msgToBob3 = toArrayBuffer("Message to Bob3");
      var msgToAlice = toArrayBuffer("Message to Alice");

      var aliceSessionCipher = new libsignal.SessionCipher(aliceStore, BOB_ADDRESS);
      var bobSessionCipher = new libsignal.SessionCipher(bobStore, ALICE_ADDRESS);

      aliceSessionCipher.encrypt(msgToBob).then(function(ciphertext) {
          return bobSessionCipher.decryptPreKeyWhisperMessage(ciphertext.body, 'binary');
      }).then(function(plaintext) {
          console.log('Plain text', ab2str(plaintext));
          console.log('Original: ', ab2str(msgToBob));

          generatePreKeyBundle(bobStore, bobPreKeyId, bobSignedKeyId).then((newKeyBundle) => {
            AliceBuilder.processPreKey(newKeyBundle).then(() => {

              aliceSessionCipher.encrypt(msgToBob2).then(function(ciphertext2) {
                  return bobSessionCipher.decryptPreKeyWhisperMessage(ciphertext2.body, 'binary');
              }).then(function(plaintext2) {
                  console.log('Plain text2', ab2str(plaintext2));
                  console.log('Original2: ', ab2str(msgToBob2));

                  aliceSessionCipher.encrypt(msgToBob3).then(function(ciphertext3) {
                      return bobSessionCipher.decryptPreKeyWhisperMessage(ciphertext3.body, 'binary');
                  }).then(function(plaintext3) {
                      console.log('Plain text3', ab2str(plaintext3));
                      console.log('Original3: ', ab2str(msgToBob3));
                  });
              });

            })
          })
      });

      console.log('done');
    });
  });
});
