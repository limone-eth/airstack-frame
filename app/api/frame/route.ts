import { getFrameAccountAddress, getFrameValidatedMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { alreadyClaimed } from '../../lib/thirdweb';
import {
  INITIAL_IMAGE_URL,
  SUCCESS_CLAIM_IMAGE_URL,
} from '../../lib/constants';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined;
  let messageBytes: string | undefined;
  try {
    const body = await req.json();
    messageBytes = body?.trustedData?.messageBytes;
    accountAddress = await getFrameAccountAddress(body, {
      NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${INITIAL_IMAGE_URL}" />
    <meta property="fc:frame:button:1" content="try again" />
    <meta property="fc:frame:post_url" content="https://airstack-frame.vercel.app/api/frame" />
    </head></html>`);
  }
  console.log('Message is valid');

  if (!accountAddress) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${INITIAL_IMAGE_URL}" />
    <meta property="fc:frame:button:1" content="try again" />
    <meta property="fc:frame:post_url" content="https://airstack-frame.vercel.app/api/frame" />
    </head></html>`);
  }

  console.log('Account address is', accountAddress);

  const didClaim = await alreadyClaimed(accountAddress);
  if (didClaim) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SUCCESS_CLAIM_IMAGE_URL}" />
    </head></html>`);
  }

  console.log('Claiming to...', accountAddress);

  // await claimNftTo(accountAddress);

  /*return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SUCCESS_CLAIM_IMAGE_URL}" />
  </head></html>`);*/
  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${INITIAL_IMAGE_URL}" />
    <meta property="fc:frame:button:1" content="try again" />
    <meta property="fc:frame:post_url" content="https://airstack-frame.vercel.app/api/frame" />
    </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
