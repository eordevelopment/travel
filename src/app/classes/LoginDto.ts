export class LoginDto {
  public idToken: string;

  constructor(token: string) {
    this.idToken = token;
  }
}