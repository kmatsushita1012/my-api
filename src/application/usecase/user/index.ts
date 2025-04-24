import { IUserRepository } from "../../../domain/interfaces/repositories";
import DeleteUsecase from "./DeleteUsecase";
import GetAllUsecase from "./GetAllUsecase";
import GetUsecase from "./GetUsecase";
import PostUsecase from "./PostUsecase";
import PutUsecase from "./PutUsecase";

interface UserUsecases {
  get: GetUsecase;
  getAll: GetAllUsecase;
  post: PostUsecase;
  put: PutUsecase;
  delete: DeleteUsecase;
}

const createUsecases = (repository: IUserRepository): UserUsecases => ({
  get: new GetUsecase(repository),
  getAll: new GetAllUsecase(repository),
  post: new PostUsecase(repository),
  put: new PutUsecase(repository),
  delete: new DeleteUsecase(repository),
});

export {
  GetUsecase as GetUsecase,
  GetAllUsecase,
  PostUsecase,
  PutUsecase,
  DeleteUsecase,
  UserUsecases,
  createUsecases,
};
