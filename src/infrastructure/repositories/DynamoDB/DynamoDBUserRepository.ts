import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { IUserRepository } from "../../../domain/interfaces/repositories";
import { User } from "../../../domain/entities/users";
import { toCamelCase, toSnakeCase } from "../../../utils/Formatter";
import { Errors } from "../../../utils/Errors";

class DynamoDBUserRepository implements IUserRepository {
  constructor(
    private client: DynamoDBDocumentClient,
    private tableName: string
  ) {}

  get = async (id: string): Promise<User | null> => {
    try {
      const result = await this.client.send(
        new GetCommand({
          TableName: this.tableName,
          Key: { id },
        })
      );
      if (!result.Item) return null;
      return toCamelCase<User>(result.Item);
    } catch (error) {
      throw Errors.InternalServerError();
    }
  };

  getAll = async (): Promise<User[]> => {
    try {
      const result = await this.client.send(
        new ScanCommand({
          TableName: this.tableName,
        })
      );

      const items = result.Items ?? [];
      return toCamelCase<[User]>(items);
    } catch (err) {
      console.log(err);
      throw Errors.InternalServerError();
    }
  };

  put = async (item: User): Promise<string> => {
    const snakedItem = toSnakeCase(item);
    try {
      await this.client.send(
        new PutCommand({
          TableName: this.tableName,
          Item: snakedItem,
          ConditionExpression: "attribute_exists(id)",
        })
      );
      return "Success";
    } catch (err) {
      throw Errors.InternalServerError();
    }
  };

  delete = async (id: string): Promise<string> => {
    try {
      await this.client.send(
        new DeleteCommand({
          TableName: this.tableName,
          Key: { id },
        })
      );
      return "Success";
    } catch (err) {
      console.log(err);
      throw Errors.InternalServerError();
    }
  };
}
export default DynamoDBUserRepository;
