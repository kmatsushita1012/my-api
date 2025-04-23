import IRepository, {
  IUserRepository,
} from "../../../domain/interfaces/repositories";
import { MockUserRepository } from "./MockUserRepository";

export default class MockRepository extends IRepository {
  public readonly user: IUserRepository;

  constructor(tableName: string) {
    super();
    this.user = new MockUserRepository();
  }
}
