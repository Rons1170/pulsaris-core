import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { readFileSync } from 'fs';

export function signInstruction(instruction: any) {
  const secret = JSON.parse(readFileSync('./bot-keypair.json', 'utf8')).secretKey;
  const secretKey = bs58.decode(secret);
  const message = Buffer.from(JSON.stringify(instruction));
  const signature = nacl.sign.detached(message, secretKey);

  return {
    instruction,
    signature: bs58.encode(signature),
  };
}
