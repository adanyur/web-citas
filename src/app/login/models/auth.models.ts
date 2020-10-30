export class Auth {
  public name: string;
  public email: string;
  public password: string;

  constructor(object: any) {
    this.name = object.dni ? object.dni : null;
    this.email = object.dni ? object.dni + '@clinicasantaisabel.com' : null;
    this.password = object.dni ? object.dni : null;
  }
}
