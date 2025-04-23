import { IUserRepository } from "../../domain/interfaces/repositories";
import { User } from "../../domain/models/users";

export default class PutUsecase {
  constructor(private repository: IUserRepository) {}
  execute = async (id: string, item: User): Promise<string> => {
    const message = await this.repository.put(id, item);
    return message;
  };
}
