import { IUserRepository } from "../../../domain/interfaces/repositories";
import { User } from "../../../domain/entities/users";
import { Errors } from "../../../utils/Errors";

export default class PostUsecase {
  constructor(private repository: IUserRepository) {}
  execute = async (item: User): Promise<string> => {
    const exsit = await this.repository.get(item.id);
    if (exsit) {
      throw Errors.Conflict();
    }
    const message = await this.repository.put(item);
    return message;
  };
}
