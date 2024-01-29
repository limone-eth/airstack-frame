interface Bio {
  text: string;
  mentioned_profiles?: any[];
}

interface Profile {
  bio: Bio;
}

interface User {
  object: string;
  fid: number;
  username: string | null;
  display_name: string;
  pfp_url: string;
  profile: Profile;
  follower_count: number;
  following_count: number;
  verifications: string[];
  active_status: string;
  custody_address?: string;
}

interface ParentAuthor {
  fid: null;
}

interface Url {
  url: string;
}

interface Button {
  index: number;
  title?: string;
}

interface Frame {
  version: string;
  image: string;
  buttons: Button[];
  post_url: string;
  frames_url: string;
}

interface Fid {
  fid: number;
  fname: string;
}

interface Reactions {
  likes: Fid[];
  recasts: Fid[];
}

interface Replies {
  count: number;
}

interface ViewerContext {
  liked: boolean;
  recasted: boolean;
}

interface Cast {
  object: string;
  hash: string;
  thread_hash: string;
  parent_hash: null;
  parent_url: string;
  root_parent_url: string;
  parent_author: ParentAuthor;
  author: User;
  text: string;
  timestamp: string;
  embeds: Url[];
  frames: Frame[];
  reactions: Reactions;
  replies: Replies;
  mentioned_profiles: User[];
  viewer_context: ViewerContext;
}

interface TappedButton {
  index: number;
}

interface Action {
  object: string;
  interactor: User;
  tapped_button: TappedButton;
  cast: Cast;
}

interface ValidatedFrame {
  valid: boolean;
  action: Action;
}

export const validateFrame = async (messageBytes: string): Promise<ValidatedFrame> => {
  const response = await fetch('https://api.neynar.com/v2/farcaster/frame/validate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      api_key: 'NEYNAR_API_DOCS',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message_bytes_in_hex:
        '0a49080d1085940118f6a6a32e20018201390a1a86db69b3ffdf6ab8acb6872b69ccbe7eb6a67af7ab71e95aa69f10021a1908ef011214237025b322fd03a9ddc7ec6c078fb9c56d1a72111214e3d88aeb2d0af356024e0c693f31c11b42c76b721801224043cb2f3fcbfb5dafce110e934b9369267cf3d1aef06f51ce653dc01700fc7b778522eb7873fd60dda4611376200076caf26d40a736d3919ce14e78a684e4d30b280132203a66717c82d728beb3511b05975c6603275c7f6a0600370bf637b9ecd2bd231e',
    }),
  });
  return await response.json();
};
