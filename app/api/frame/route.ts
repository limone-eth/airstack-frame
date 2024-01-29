import { getFrameAccountAddress } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { alreadyClaimed, claimNftTo } from '../../lib/thirdweb';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import {
  ALREADY_CLAIMED_IMAGE_URL,
  INITIAL_IMAGE_URL,
  SUCCESS_CLAIM_IMAGE_URL,
} from '../../lib/constants';

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
    <meta property="fc:frame:image" content="${INITIAL_IMAGE_URL}" />
    <meta property="fc:frame:button" content="Try Again ↩️" />
    <meta property="fc:frame:post_url" content="https://airstack-frame.vercel.app/api/frame" />
    </head></html>`);
  }

  const didClaim = await alreadyClaimed(accountAddress);
  if (didClaim) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${ALREADY_CLAIMED_IMAGE_URL}" />
    </head></html>`);
  }

  await claimNftTo(accountAddress);

  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SUCCESS_CLAIM_IMAGE_URL}" />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
