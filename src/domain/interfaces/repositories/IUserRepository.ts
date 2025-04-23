import { User } from "../../models/users";

abstract class IUserRepository {
  abstract get(id: string): Promise<User | null>;
  abstract getAll(): Promise<User[]>;
  abstract post(item: User): Promise<string>;
  abstract put(id: string, item: User): Promise<string>;
  abstract delete(id: string): Promise<string>;
}

export default IUserRepository;
