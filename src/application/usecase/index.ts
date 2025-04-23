import DeleteUsecase from "./DeleteUsecase";
import GetAllUsecase from "./GetAllUsecase";
import GetUsecase from "./GetUsecase";
import PostUsecase from "./PostUsecase";
import PutUsecase from "./PutUsecase";

const UserUsecase = {
  get: GetUsecase,
  getAll: GetAllUsecase,
  post: PostUsecase,
  put: PutUsecase,
  delete: DeleteUsecase,
};

export default UserUsecase;
