export class Auth {
  public name: string;
  public email: string;
  public password: string;

  constructor(object: any) {
    this.name = object.documento ? object.documento : null;
    this.email = object.documento ? object.documento + '@clinicasantaisabel.com' : null;
    this.password = object.documento ? object.documento : null;
  }
}
