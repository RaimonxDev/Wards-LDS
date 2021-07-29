export interface User {
  jwt: string;
  user: UserInfo;
}

export interface UserInfo {
  id: number;
  confirmed: boolean;
  blocked: boolean;
  username: string;
  email: string;
  provider: string;
  created_at: Date;
  updated_at: Date;
  role: Role;
  barrio?: Barrio;
}

export interface Barrio {
  id: number;
  nombre: string;
  ubicacion: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
}
// check user
export interface CheckUser {
  id: number;
  confirmed: boolean;
  blocked: boolean;
  username: string;
  email: string;
  provider: string;
  created_at: Date;
  updated_at: Date;
  role: Role;
  barrio?: string;
}

// Invalid request User
export interface ErrorRequestUser {
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Error;
}

export interface Error {
  statusCode: number;
  error: string;
  message: MessagesError[];
  data: MessagesError[];
}

export interface MessagesError {
  messages: Message[];
}

export interface Message {
  id: string;
  message: string;
}
