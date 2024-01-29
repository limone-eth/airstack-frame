import { getFrameAccountAddress, getFrameValidatedMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { alreadyClaimed, claimNftTo } from '../../lib/thirdweb';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import {
  ALREADY_CLAIMED_IMAGE_URL,
  INITIAL_IMAGE_URL,
  NOT_RECASTED_IMAGE_URL,
  SUCCESS_CLAIM_IMAGE_URL,
} from '../../lib/constants';
import { validateFrame } from '../../lib/neynar';
import { getAssociatedAddress } from '../../lib/airstack';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined;
  let messageBytes: string | undefined;
  try {
    const body = await req.json();
    messageBytes = body?.trustedData?.messageBytes;
    accountAddress = await getFrameAccountAddress(body, {
      NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
    });
    const validatedMessage = await getFrameValidatedMessage(body);
    if (!validatedMessage) {
      throw new Error('Invalid message');
    }
  } catch (err) {
    console.error(err);
    return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${INITIAL_IMAGE_URL}" />
    <meta property="fc:frame:button" content="Try Again ↩️" />
    <meta property="fc:frame:post_url" content="https://airstack-frame.vercel.app/api/frame" />
    </head></html>`);
  }

  if (!accountAddress) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${INITIAL_IMAGE_URL}" />
    <meta property="fc:frame:button" content="Try Again ↩️" />
    <meta property="fc:frame:post_url" content="https://airstack-frame.vercel.app/api/frame" />
    </head></html>`);
  }

  const validatedFrame = await validateFrame(messageBytes!);
  if (!validatedFrame.action.cast.viewer_context.recasted) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${NOT_RECASTED_IMAGE_URL}" />
    <meta property="fc:frame:button" content="Recast and then try again ↩️" />
    <meta property="fc:frame:post_url" content="https://airstack-frame.vercel.app/api/frame" />
    </head></html>`);
  }

  const associatedAddress = await getAssociatedAddress(validatedFrame.action.interactor.username!);

  const didClaim = await alreadyClaimed(associatedAddress ?? accountAddress);
  if (didClaim) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SUCCESS_CLAIM_IMAGE_URL}" />
    </head></html>`);
  }

  // await claimNftTo(accountAddress);

  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SUCCESS_CLAIM_IMAGE_URL}" />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
