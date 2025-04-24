import { IUserRepository } from "../../../domain/interfaces/repositories";
import { User } from "../../../domain/entities/users";
import { Errors } from "../../../utils/Errors";

export default class GetUsecase {
  constructor(private repository: IUserRepository) {}
  execute = async (id: string): Promise<User> => {
    const user = await this.repository.get(id);
    if (!user) {
      throw Errors.NotFound();
    }
    return user;
  };
}
