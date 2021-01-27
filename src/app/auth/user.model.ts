export class User {
  constructor(public emailAddress: string, public id: string, private _token: string, private _tokenExpirationDate: Date) { }

  getToken() {
    if (!this._token || new Date() > this._tokenExpirationDate) {
      return null;
    } else {
      return this._token;
    }
  }
}
