"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTable = exports.getDynamodbClient = void 0;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var dynamodbClient;
var nameSpace = process.env.DYNAMODB_NAMESPACE;
var getDynamodbClient = function () {
    if (dynamodbClient)
        return dynamodbClient;
    dynamodbClient = new client_dynamodb_1.DynamoDBClient({});
    return dynamodbClient;
};
exports.getDynamodbClient = getDynamodbClient;
exports.userTable = "realworld-".concat(nameSpace, "-users");
//# sourceMappingURL=dynamodb.js.map