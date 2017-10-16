import {ISelectRole} from '@pl-core/_interfaces';

export class User {
  public id: number;
  public username: string;
  public email: string;
  public fname: string;
  public lname: string;
  public currentRole: string;
  public roles: ISelectRole[];
  public currentLocation: string;
  public locations: ISelectRole[];
  public timeZone: string;
  public profilePicSno: string;
  public numberFormat: string;
  public token: string;
  public tenantId: string;
  public ssobject: string;
  public emailSignature: string;
  public digitalSignature: string;
  public agmKey: string;
}
