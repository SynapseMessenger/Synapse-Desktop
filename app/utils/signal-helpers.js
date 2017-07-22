/* **************************************************************
 *                  Synapse - Desktop Client
 * @author Marco Fernandez Pranno <mfernandezpranno@gmail.com>
 * @licence MIT
 * @link https://github.com/SynapseNetwork/Synapse-Desktop
 * @version 1.0
 * ************************************************************** */

const KeyHelper = libsignal.KeyHelper;

export const generatePreKeyBundle = (store, preKeyId, signedPreKeyId) => {
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

export const generateKeys = (store, amount, keyId, signedId) => {
  let preKeyId = keyId;
  let signedKeyId = signedId;
  let asyncKeyGenCalls = [];

  for (let i = 0; i < amount; i++) {
    asyncKeyGenCalls.push(generatePreKeyBundle(store, preKeyId, signedKeyId));
    preKeyId++;
    signedKeyId++;
  }

  return Promise.all(asyncKeyGenCalls).then( newKeys => {
    return { newKeys, preKeyId, signedKeyId };
  });
}

export const generateIdentity = (store) => {
    return Promise.all([
        KeyHelper.generateIdentityKeyPair(),
        KeyHelper.generateRegistrationId(),
    ]).then(function(result) {
        store.put('identityKey', result[0]);
        store.put('registrationId', result[1]);
    });
};

export const toArrayBuffer = (thing) => {
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

export const stringToBase64 = (str) => {
  return window.btoa(unescape(encodeURIComponent( str )));
}

export const base64ToString = (str) => {
  return decodeURIComponent(escape(window.atob( str )));
}


export const arrayBufferToString = (buf) => {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(new Uint8Array(buf));
}

function arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

function base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export const preKeyToString = (key) => {
  key.identityKey = arrayBufferToBase64(key.identityKey);
  key.preKey.publicKey = arrayBufferToBase64(key.preKey.publicKey);
  key.signedPreKey.publicKey = arrayBufferToBase64(key.signedPreKey.publicKey);
  key.signedPreKey.signature = arrayBufferToBase64(key.signedPreKey.signature);
  return key;
}

export const preKeyToArrayBuffer = (key) => {
  key.identityKey = base64ToArrayBuffer(key.identityKey);
  key.preKey.publicKey = base64ToArrayBuffer(key.preKey.publicKey);
  key.signedPreKey.publicKey = base64ToArrayBuffer(key.signedPreKey.publicKey);
  key.signedPreKey.signature = base64ToArrayBuffer(key.signedPreKey.signature);
  return key;
}
