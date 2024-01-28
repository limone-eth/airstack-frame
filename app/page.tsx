import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: ['YES 🍋'],
  image: 'https://lemon-frame.vercel.app/img-1.png',
  post_url: 'https://lemon-frame.vercel.app/api/frame',
});

export const metadata: Metadata = {
  title: 'ff.limone.lol',
  description: 'zesty',
  openGraph: {
    title: 'ff.limone.lol',
    description: 'zesty',
    images: ['https://lemon-frame.vercel.app/img-2.png'],
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
