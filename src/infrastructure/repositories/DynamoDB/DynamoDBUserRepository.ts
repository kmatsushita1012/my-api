import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { IUserRepository } from "../../../domain/interfaces/repositories";
import { User } from "../../../domain/models/users";
import { toCamelCase, toSnakeCase } from "../../../utils/Formatter";
import { Errors } from "../../../utils/Errors";

export class DynamoDBUserRepository implements IUserRepository {
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

  put = async (id: string, item: User): Promise<string> => {
    const marshalled = marshall(toSnakeCase(item), {
      removeUndefinedValues: true,
    });
    try {
      await this.client.send(
        new PutCommand({
          TableName: this.tableName,
          Item: marshalled,
          ConditionExpression: "attribute_exists(id)",
        })
      );
      return "Success";
    } catch (err) {
      console.log(err);
      const error = err as Error;
      if (error.name === "ConditionalCheckFailedException") {
        throw Errors.NotFound();
      }
      throw Errors.InternalServerError();
    }
  };

  post = async (item: User): Promise<string> => {
    const marshalled = marshall(toSnakeCase(item), {
      removeUndefinedValues: true,
    });
    try {
      await this.client.send(
        new PutCommand({
          TableName: this.tableName,
          Item: marshalled,
          ConditionExpression: "attribute_not_exists(id)",
        })
      );
      return "Success";
    } catch (err) {
      console.log(err);
      const error = err as Error;
      if (error.name === "ConditionalCheckFailedException") {
        throw Errors.Conflict();
      }

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
