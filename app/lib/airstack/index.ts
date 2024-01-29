import { fetchQuery } from '@airstack/node';
import { DocumentNode } from '@apollo/client/core';
import { FetchAssociatedAddressQueryQuery } from './types';

interface QueryResponse {
  data: FetchAssociatedAddressQueryQuery | null;
  error: Error | null;
}

interface Error {
  message: string;
}

const query = /* GraphQL */ `
  query FetchAssociatedAddressQuery($profileName: String!) {
    Socials(
      input: {
        filter: { profileName: { _eq: $profileName }, dappName: { _eq: farcaster } }
        blockchain: ethereum
      }
    ) {
      Social {
        userAddress
        userAssociatedAddresses
        userAssociatedAddressDetails {
          primaryDomain {
            name
            resolvedAddress
            owner
          }
        }
      }
    }
  }
`;

export const getAssociatedAddress = async (farcasterProfileName: string) => {
  const { data, error }: QueryResponse = await fetchQuery(query, {
    profileName: farcasterProfileName,
  });
  if (error || !data || !data.Socials!.Social || data.Socials?.Social?.length === 0) {
    return null;
  }
  return data.Socials?.Social![0].userAssociatedAddressDetails?.find((addr) => addr.primaryDomain)
    ?.primaryDomain!.resolvedAddress;
};
