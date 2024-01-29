import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { INITIAL_IMAGE_URL } from './lib/constants';

const frameMetadata = getFrameMetadata({
  buttons: ['mint airstack 🤝 zora'],
  image: INITIAL_IMAGE_URL,
  post_url: 'https://airstack-frame.vercel.app/api/frame',
});

export const metadata: Metadata = {
  title: 'frame.airstack.xyz',
  description: 'airstack 🤝 zora',
  openGraph: {
    title: 'frame.airstack.xyz',
    description: 'airstack 🤝 zora',
    images: ['https://airstack-frame.vercel.app/img-2.png'],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>frame.airstack.xyz</h1>
    </>
  );
}
