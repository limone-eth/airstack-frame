import { ThirdwebSDK } from '@thirdweb-dev/sdk';

import {
  CONTRACT_ADDRESS,
  NETWORK,
  NFT_ANIMATION_URL,
  NFT_DESCRIPTION,
  NFT_IMAGE_URL,
  NFT_NAME,
} from './constants';

const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY!, NETWORK, {
  secretKey: process.env.THIRDWEB_SECRET_KEY,
});

export const alreadyClaimed = async (address: string) => {
  const contract = await sdk.getContract(CONTRACT_ADDRESS, 'nft-drop');
  const balance = await contract.balanceOf(address);
  return balance.toNumber() > 0;
};

export const claimNftTo = async (mintToAddress: string) => {
  const contract = await sdk.getContract(CONTRACT_ADDRESS, 'nft-drop');
  await contract.claimTo(mintToAddress, 1);
};

export const batchUpload = async (amount: number) => {
  const contract = await sdk.getContract(CONTRACT_ADDRESS, 'nft-drop');
  const supply = await contract.totalSupply();
  const tx = await contract.createBatch(
    Array.from({ length: amount }, (_, index) => ({
      name: `${NFT_NAME} - #${supply.toNumber() + index + 1}`,
      description: NFT_DESCRIPTION,
      image: NFT_IMAGE_URL,
      animation_url: NFT_ANIMATION_URL,
    })),
  );
  return tx;
};
