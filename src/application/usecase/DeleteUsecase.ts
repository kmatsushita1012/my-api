import { IUserRepository } from "../../domain/interfaces/repositories";
import { User } from "../../domain/models/users";
import { Errors } from "../../utils/Errors";

export default class GetUsecase {
  constructor(private repository: IUserRepository) {}
  execute = async (id: string): Promise<string> => {
    const message = await this.repository.delete(id);
    return message;
  };
}
