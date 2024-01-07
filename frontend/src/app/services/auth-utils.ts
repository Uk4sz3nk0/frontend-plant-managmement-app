export const USER_DATA_KEY: string = 'userData';

export class User {

  constructor(public id: number, public email: string, public firstName: string, public lastName: string,
              private _role: Role, private _token: string, private _tokenExpiration: Date, private _refreshToken: string,
              private _refreshTokenExpiration: Date) {
  }

  get token() {
    if (!this._tokenExpiration || new Date() > this._tokenExpiration) {
      return null;
    }
    return this._token;
  }

  get tokenExpiration() {
    return this._tokenExpiration;
  }

  get refreshToken() {
    return this._refreshToken;
  }

  get refreshTokenExpiration() {
    return this._refreshTokenExpiration;
  }

  get role() {
    return this._role;
  }
}

export interface Role {
  name?: string;
  permissions?: Array<any>;
}
