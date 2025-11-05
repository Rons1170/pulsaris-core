import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { readFileSync } from 'fs';

const botPubkey = 'FsZWcdhUmLfg63ZyL6HBmakLd8smvvBS7AV2EudKfwWm'; // your bot's public key

export function verifySignature(payload: any): boolean {
  const message = Buffer.from(JSON.stringify(payload.instruction));
  const signature = bs58.decode(payload.signature);
  const pubkey = bs58.decode(botPubkey);

  return nacl.sign.detached.verify(message, signature, pubkey);
}
