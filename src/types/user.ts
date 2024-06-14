export interface RequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export type LoginData = {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  request_token: string | undefined;
};

export interface RequestSessionResponse {
  success: boolean;
  session_id: string;
}

export interface RequestAccessTokenV4Response {
  account_id: string;
  access_token: string;
  success: boolean;
  status_message: string;
  status_code: number;
}

export interface AuthContextType {
  user: UserInfo | null;
  login: (
    session_id: string | undefined,
    v4Info?: RequestAccessTokenV4Response
  ) => Promise<boolean> | undefined;
  logout: () => Promise<boolean> | undefined;
}

export type UserInfo = {
  avatar: {
    gravatar: {
      hash: string | null;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};
