import { IUserRepository } from "../../domain/interfaces/repositories";
import { User } from "../../domain/models/users";

export default class PostUsecase {
  constructor(private repository: IUserRepository) {}
  execute = async (item: User): Promise<string> => {
    const message = await this.repository.post(item);
    return message;
  };
}
