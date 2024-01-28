import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: ['So?'],
  image: 'https://ff.limone.lol/img-1.png',
  post_url: 'https://ff.limone.lol/api/frame',
});

export const metadata: Metadata = {
  title: 'ff.limone.lol',
  description: 'zesty',
  openGraph: {
    title: 'ff.limone.lol',
    description: 'zesty',
    images: ['https://ff.limone.lol/img-2.png'],
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
