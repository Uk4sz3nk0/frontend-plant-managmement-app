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

}

export interface Role {
  name?: string;
  permissions?: Array<any>;
}
