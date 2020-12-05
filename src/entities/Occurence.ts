import { v4 as uuid } from "uuid";

export class Occurence {
  public readonly id: string;
  public readonly created_at: string;
  public readonly updated_at: string;

  public debtor_id: string;
  public message_id: string;
  public is_manual: boolean;

  constructor(props: Omit<Occurence, 'id' | 'created_at' | 'updated_at' >, id?: string) {
    Object.assign(this, props);

    if(!id) {
      this.id = uuid();
    }
  }
}