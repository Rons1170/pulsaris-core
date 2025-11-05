const nacl = require('tweetnacl');
const { readFileSync } = require('fs');
const { encode, decode } = require('bs58').default;   // correct import

function signInstruction(instruction) {
  // Load the raw keypair array from file
  const secret = JSON.parse(readFileSync('./bot-keypair.json', 'utf8'));

  // Convert array of numbers into Uint8Array
  const secretKey = Uint8Array.from(secret);

  // Prepare the message to sign
  const message = Buffer.from(JSON.stringify(instruction));

  // Create the detached signature
  const signature = nacl.sign.detached(message, secretKey);

  // Return the signed instruction with base58-encoded signature
  return {
    instruction,
    signature: encode(signature),   // works now
  };
}

module.exports = { signInstruction };
 

