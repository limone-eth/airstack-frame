import { ZoraSepoliaTestnet, Zora } from '@thirdweb-dev/chains';

export const CONTRACT_ADDRESS =
  process.env.NODE_ENV === 'production'
    ? '0x324ecaE0b06C9bf82D033CE35debDE97921aE126' // '0xa15Bb830aCD9Ab46164e6840E3ef2dBBF9c5E2B3'
    : '0x324ecaE0b06C9bf82D033CE35debDE97921aE126';

export const NETWORK =
  process.env.NODE_ENV === 'production' ? ZoraSepoliaTestnet : ZoraSepoliaTestnet;

export const NFT_ANIMATION_URL =
  'ipfs://QmWPYLhaaZbksJCwmaCrAvFi6Pn1LntSwPHXmUdCVUf2iE/zorayahoo.gif';
export const NFT_NAME = 'Airstack launches Zora composability';
export const NFT_DESCRIPTION =
  'Zora is now easily composable with Farcaster, Base, Ethereum, Polygon, ENS, XMTP, POAP, Lens, and more!';
export const NFT_IMAGE_URL = 'https://i.imgur.com/uzSo4ew.png';

export const INITIAL_IMAGE_URL =
  'https://gateway.ipfs.io/ipfs/Qme9BVhNPfsaKKhPy7k1QWoMnmqrFZMjibXEKjmNEa8ADH/yahoozora-cropped.gif';
export const SUCCESS_CLAIM_IMAGE_URL =
  'https://gateway.ipfs.io/ipfs/Qme9BVhNPfsaKKhPy7k1QWoMnmqrFZMjibXEKjmNEa8ADH/Slice%202.png';
export const ALREADY_CLAIMED_IMAGE_URL = 'https://i.imgur.com/uzSo4ew.png';
export const NOT_RECASTED_IMAGE_URL = 'https://i.imgur.com/uzSo4ew.png';
