import { IUserRepository } from "../../../domain/interfaces/repositories";
import { User } from "../../../domain/entities/users";
import { Errors } from "../../../utils/Errors";

export default class PutUsecase {
  constructor(private repository: IUserRepository) {}
  execute = async (id: string, item: User): Promise<string> => {
    if (id != item.id) {
      throw Errors.BadRequest();
    }
    const exsit = await this.repository.get(id);
    if (!exsit) {
      throw Errors.NotFound();
    }
    const message = await this.repository.put(item);
    return message;
  };
}
