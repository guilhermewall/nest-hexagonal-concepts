export class DataList {
  id?: number;
  name: string;

  constructor(name: string, id?: number) {
    if (id) {
      this.id = id;
    }
    this.name = name;
  }
} //na aula ele monta uma entity mas poderia ser um schema do zod para tratar o envio de dados da requisição.
