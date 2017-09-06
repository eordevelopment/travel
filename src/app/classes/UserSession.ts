import { IUserSession } from 'app/contracts/IUserSession';

export class UserSession implements IUserSession {
  public id: number;
  public fullName: string;
  public givenName: string;
  public familyName: string;
  public email: string;
  public imageUrl: string;
  public userToken: string;
  public googleToken: string;

  constructor(source?: any) {
    if (source) {
      this.id = source.getId();
      this.fullName = source.getName();
      this.givenName = source.getGivenName();
      this.familyName = source.getFamilyName();
      this.email = source.getEmail();
      this.imageUrl = source.getImageUrl();
      this.userToken = null;
    }
  }
}