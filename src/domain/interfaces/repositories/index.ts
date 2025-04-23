import IUserRepository from "./IUserRepository";

export default abstract class IRepository {
  public abstract readonly user: IUserRepository;
}

export { IUserRepository };
