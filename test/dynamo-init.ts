import { DynamoDBClient, CreateTableCommand, CreateTableCommandInput, DeleteTableCommandInput, DeleteTableCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2", endpoint: "http://localhost:4566" });

const deleteInput: DeleteTableCommandInput = {
  TableName: "Levels"
}

const input: CreateTableCommandInput = {
    TableName : "Levels",
    KeySchema: [       
        { AttributeName: "id", KeyType: "HASH"},    //Partition key
        { AttributeName: "name", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "name", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 100
    }
};

const create = async function () {
  try {
    await client.send(new DeleteTableCommand(deleteInput));
  } catch(err) {
    console.error(err)
  }

  try {
      const results = await client.send(new CreateTableCommand(input));
      console.log(results)
  } catch(err) {
      console.error(err)
  }


};

import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

// ... DynamoDB client creation

const ddbDocClient = DynamoDBDocument.from(client);
// Call using full client.
const insert = async function() {
  try {
    await ddbDocClient.put({
      TableName: "Levels",
      Item: {
        id: "7ed29c50-9fbb-4b45-80f6-bfd3acfbf63e",
        author: "firstname lastname",
        name: "level name",
        version: "1.0.0",
        created_on: "2022-06-19T12:00:00Z",
        data: {
          blocks: [{
            x: 0,
            y: 0,
            t: 1,
          },
          {
            x: 1,
            y: 1,
            t: 2,
          }],
          start_block: {x: 0, y: 5},
          end_blocks: [{ x: 5, y: 3 }]
        }
      },
    })
  } catch(err) {
    console.error(err)
  }
  
};

create().then(insert);