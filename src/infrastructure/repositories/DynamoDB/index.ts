import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import IRepository, {
  IUserRepository,
} from "../../../domain/interfaces/repositories";
import { DynamoDBUserRepository } from "./DynamoDBUserRepository";

export default class DynamoDBRepository extends IRepository {
  public readonly user: IUserRepository;

  constructor(client: DynamoDBDocumentClient, tableName: string) {
    super();
    this.user = new DynamoDBUserRepository(client, tableName);
  }
}
