export interface User {
  jwt: string;
  user: UserInfo;
}

export interface UserInfo {
  confirmed: boolean;
  blocked: boolean;
  _id: string;
  username: string;
  email: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  role: Role;
  barrio: Barrio;
  id: string;
}

export interface Barrio {
  _id: string;
  nombre: string;
  ubicacion: string;
  published_at: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface Role {
  _id: string;
  name: string;
  description: string;
  type: string;
  __v: number;
  id: string;
}
// check user
export interface CheckUser {
  confirmed: boolean;
  blocked: boolean;
  _id: string;
  username: string;
  email: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  role: Role;
  barrio: string;
  id: string;
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
