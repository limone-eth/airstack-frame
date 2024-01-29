import { getFrameAccountAddress } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { alreadyClaimed } from '../../lib/thirdweb';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress = '';
  try {
    const body: { trustedData?: { messageBytes?: string } } = await req.json();
    accountAddress = await getFrameAccountAddress(body, {
      NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
    });
  } catch (err) {
    console.error(err);
  }

  if (!accountAddress) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://airstack-frame.vercel.app/img-2.png" />
    </head></html>`);
  }

  const didClaim = await alreadyClaimed(accountAddress);
  if (didClaim) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://airstack-frame.vercel.app/img-2.png" />
    </head></html>`);
  }

  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://airstack-frame.vercel.app/img-2.png" />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
