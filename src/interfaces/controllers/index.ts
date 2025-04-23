import IRepository from "../../domain/interfaces/repositories";
import UserController from "./UserController";

export default class Controller {
  public readonly user: UserController;

  constructor(repository: IRepository) {
    this.user = new UserController(repository);
  }
}
