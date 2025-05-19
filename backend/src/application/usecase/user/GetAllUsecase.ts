import { IUserRepository } from "../../../domain/interfaces/repositories";
import { User } from "../../../domain/entities/users";

export default class GetAllUsecase {
  constructor(private repository: IUserRepository) {}
  execute = async (): Promise<User[]> => {
    const users = await this.repository.getAll();
    return users;
  };
}
