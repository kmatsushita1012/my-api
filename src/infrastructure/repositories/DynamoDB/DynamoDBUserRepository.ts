import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { IUserRepository } from "../../../domain/interfaces/repositories";
import { User } from "../../../domain/entities/users";
import { Errors } from "../../../utils/Errors";
import { toCamelCase, toSnakeCase } from "../formatter";

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
    } catch (err) {
      throw Errors.InternalServerError(err as string);
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
      throw Errors.InternalServerError(err as string);
    }
  };

  put = async (item: User): Promise<string> => {
    const snakedItem = toSnakeCase(item);
    try {
      await this.client.send(
        new PutCommand({
          TableName: this.tableName,
          Item: snakedItem,
        })
      );
      return "Success";
    } catch (err) {
      throw Errors.InternalServerError(err as string);
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
      throw Errors.InternalServerError(err as string);
    }
  };
}
export default DynamoDBUserRepository;
