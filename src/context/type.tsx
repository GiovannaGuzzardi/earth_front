import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
} from "react";

export interface AppContextType {
  auth: AuthType;
  setAuth: Dispatch<SetStateAction<AuthType>>;
  token: TokenType | null;
  setToken: Dispatch<SetStateAction<TokenType | null>>;
  fetchAuth: () => Promise<FetchAuthResult>; // Aqui está a assinatura correta
  logout: () => {};
  contextHolder: ReactElement<any, string | JSXElementConstructor<any>>;
}

export interface AuthType {
  username: string;
  password: string;
}

export interface TokenType {
  access_token: string;
  token_type: string;
}

export interface FetchAuthResult {
  success: boolean;
  message: string;
}