import { v4 as uuid } from "uuid";

export class Group {
  public readonly id: string;
  public readonly created_at: string;
  public readonly updated_at: string;

  public id_fund: string;

  constructor(props: Omit<Group, 'id' | 'created_at' | 'updated_at' >, id?: string) {
    Object.assign(this, props);

    if(!id) {
      this.id = uuid();
    }
  }
}