import { ZoraSepoliaTestnet, Zora } from '@thirdweb-dev/chains';

export const CONTRACT_ADDRESS =
  process.env.NODE_ENV === 'production'
    ? '0x6b541C3467Ba4936f8257111bf56C3BabD27bf1E'
    : '0x6b541C3467Ba4936f8257111bf56C3BabD27bf1E';

export const NETWORK = process.env.NODE_ENV === 'production' ? Zora : ZoraSepoliaTestnet;

export const NFT_ANIMATION_URL = 'ipfs://QmWPYLhaaZbksJCwmaCrAvFi6Pn1LntSwPHXmUdCVUf2iE/zorayahoo.gif';
export const NFT_NAME = 'Airstack launches Zora composability';
export const NFT_DESCRIPTION =
  'Zora is now easily composable with with Farcaster, Base, Ethereum, Polygon, ENS, XMTP, POAP, Lens, and more!';
export const NFT_IMAGE_URL = 'https://i.imgur.com/uzSo4ew.png';
