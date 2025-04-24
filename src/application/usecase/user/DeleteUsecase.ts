import { IUserRepository } from "../../../domain/interfaces/repositories";
import { Errors } from "../../../utils/Errors";

export default class GetUsecase {
  constructor(private repository: IUserRepository) {}
  execute = async (id: string): Promise<string> => {
    const exsit = await this.repository.get(id);
    if (!exsit) {
      throw Errors.NotFound();
    }
    const message = await this.repository.delete(id);
    return message;
  };
}
