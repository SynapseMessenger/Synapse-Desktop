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

  return Promise.all(asyncKeyGenCalls).then( ownKeys => {
    return { ownKeys, preKeyId, signedKeyId };
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
}
