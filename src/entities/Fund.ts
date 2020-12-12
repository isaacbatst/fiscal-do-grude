import { v4 as uuid } from "uuid";

export class Fund {
  public readonly id: string;
  public readonly created_at: string;
  public readonly updated_at: string;

  public token: string;
  public name: string;
  public total_owed: number

  constructor(props: Omit<Fund, 'id' | 'token' | 'created_at' | 'updated_at' >, id?: string, token?: string) {
    Object.assign(this, props);

    if(!id) {
      this.id = uuid();
    }

    if(!token) {
      this.token = uuid();
    }
  }
}