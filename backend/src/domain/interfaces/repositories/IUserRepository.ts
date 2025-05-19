import { User } from "../../entities/users";

abstract class IUserRepository {
  abstract get(id: string): Promise<User | null>;
  abstract getAll(): Promise<User[]>;
  abstract put(item: User): Promise<string>;
  abstract delete(id: string): Promise<string>;
}

export default IUserRepository;
