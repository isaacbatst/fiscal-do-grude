import { v4 as uuid } from "uuid";

export class Debtor {
  public readonly id: string;
  public readonly created_at: string;
  public readonly updated_at: string;

  public name: string;
  public username: string;
  public owedAmount: string;

  constructor(props: Omit<Debtor, 'id' | 'created_at' | 'updated_at' >, id?: string) {
    Object.assign(this, props);

    if(!id) {
      this.id = uuid();
    }
  }
}