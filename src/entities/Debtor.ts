import { uuid } from "uuidv4";

export class Debtor {
  public readonly id: string;

  public name: string;
  public username: string;
  public owedAmount: string;

  constructor(props: Omit<Debtor, 'id'>, id?: string) {
    Object.assign(this, props);

    if(!id) {
      this.id = uuid();
    }
  }
}