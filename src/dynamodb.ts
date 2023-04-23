import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

let dynamodbClient;

const nameSpace = process.env.DYNAMODB_NAMESPACE;

export const getDynamodbClient = (): DynamoDBClient => {
  if(dynamodbClient) return dynamodbClient;
  dynamodbClient = new DynamoDBClient({});
  return dynamodbClient;
}

export const userTable = `realworld-${nameSpace}-users`
