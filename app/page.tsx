import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: ['MINT 🍋'],
  image: 'https://airstack-frame.vercel.app/img-1.png',
  post_url: 'https://airstack-frame.vercel.app/api/frame',
});

export const metadata: Metadata = {
  title: 'frame.airstack.xyz',
  description: 'Airstack Frame',
  openGraph: {
    title: 'frame.airstack.xyz',
    description: 'Airstack Frame',
    images: ['https://airstack-frame.vercel.app/img-2.png'],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>ff.limone.lol</h1>
    </>
  );
}
