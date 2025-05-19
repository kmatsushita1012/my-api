import { IUserRepository } from "../../../domain/interfaces/repositories";
import { User, userSample } from "../../../domain/entities/users";

class MockUserRepository implements IUserRepository {
  constructor() {}

  get = async (id: string): Promise<User | null> => {
    return userSample;
  };

  getAll = async (): Promise<User[]> => {
    return [userSample];
  };

  put = async (item: User): Promise<string> => {
    return "Success";
  };

  delete = async (id: string): Promise<string> => {
    return "Success";
  };
}
export default MockUserRepository;
