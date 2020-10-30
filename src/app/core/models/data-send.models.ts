export class DataSend {
  public historia: string;
  public programacion: string;
  public orden: string;
  public hora: string;
  public email: string;
  public movil: string;
  public cns: string;
  public iafas: string;

  constructor(object: any, hc: string) {
    this.historia = hc[0];
    this.programacion = object.turno;
    this.orden = object.hora.id;
    this.hora = object.hora.hora;
    this.email = object.correo;
    this.movil = object.telcel;
    this.cns = object.cns === false ? 'false' : 'true';
    this.iafas = object.iafas === undefined ? null : object.iafas;
  }
}
