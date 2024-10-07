import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { DeleteItemCommand, GetItemCommand, QueryCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { CreateTableCommand, DeleteItemCommand, GetItemCommand, QueryCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBClient, PutItemCommand , DynamoDBClientConfig} from "@aws-sdk/client-dynamodb";
import { marshall , unmarshall} from"@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import jwtDecode from 'jwt-decode';
import { CognitoIdentityClient, CreateIdentityPoolCommand , GetIdCommand , GetCredentialsForIdentityCommand , GetCredentialsForIdentityCommandOutput} from "@aws-sdk/client-cognito-identity";

const TableName = process.env.NOTES_TABLE;

const clientOpt : DynamoDBClientConfig = {
  region: "127.0.1.1",
  endpoint: "http://127.0.1.1:8000"
}

const cognitoIdentity = new CognitoIdentityClient({ region: "region"});
const identityPoolId = process.env.COGNITO_IDENTITY_POOL_ID;

export const addNote =  async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback)  =>  {

  try {
    
    const dynamo = new DynamoDBClient(clientOpt);
    
    const { title , description , date, time,  category } = JSON.parse(event.body!);
    const userId = event.headers.app_user_id;
    const noteId = uuidv4();
    const putCmd = new PutItemCommand({
      TableName,
      Item: marshall(
        {
        userId,
        noteId,
        title,
        description,
        date,
        time,
        category
      }
      )
    });
  
    const note = await dynamo.send(putCmd)
    
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Note Added Successfully',
        note: note.Attributes ? unmarshall(note.Attributes) : note,
      }),
    };
    
    return response;

  } catch(e) {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'General Server Error',
        e,
      }),
    };
    return response;
  }    
}

export const getNotes =  async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback)  =>  {

  try {
    
      const dynamo = new DynamoDBClient(clientOpt);
      const user = event.headers.app_user_id!;
      const getCmd = new QueryCommand({
        TableName,
          KeyConditionExpression: "userId = :user",
          ExpressionAttributeValues: {
            ":user" : { "S" : user }
          },
      })
    
    const notes = await dynamo.send(getCmd);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Notes Fetched Successfully',
        notes : notes.Items ? notes.Items.map((item) => unmarshall(item)) : notes
      }),
    };
    
    return response;

  } catch(e) {
    console.log(e)
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'General Server Error',
        e,
      }),
    };
    return response;
  }    
}

export const getNoteById =  async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback)  =>  {

  try {
    
      const dynamo = new DynamoDBClient(clientOpt);
      const noteId = event.pathParameters?.noteId
      
      const userId = event.headers.app_user_id!;
      
      const getCmd = new GetItemCommand({
        TableName,
        Key: marshall({
          userId,
          noteId
        })
      })
    
    const note = await dynamo.send(getCmd);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: note?.Item ? 'Note Fetched Successfully' : 'Note not found',
        note: note.Item ? unmarshall(note.Item!) : note,
      }),
    };
    
    return response;

  } catch(e) {
    console.log(e)
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'General Server Error',
        e,
      }),
    };
    return response;
  }    
}

export const updateNoteById =  async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback)  =>  {

  try {
    
      const dynamo = new DynamoDBClient(clientOpt);
      const {title , description , date } = JSON.parse(event.body!);
      const noteId = event.pathParameters?.noteId
      
      const userId = event.headers.app_user_id!;
      const updateCmd = new UpdateItemCommand({
        TableName,
        Key: {
          noteId : {
            "S": noteId!,
          },
          userId: {
            "S": userId
          }
        },
        UpdateExpression: "set title = :t, description = :c, #date = :d",
        ExpressionAttributeNames: {
          "#date": "date"
        },
        ExpressionAttributeValues: {
          ":t" : {
            "S": title
          },
          ":c" : {
            "S": description
          },
          ":d": {
            "S": date
          },
        },
        ReturnValues: "ALL_NEW"
      })
    
    const notes = await dynamo.send(updateCmd);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Note Updated Successfully',
        notes : notes.Attributes ? unmarshall(notes.Attributes) : notes,
      }),
    };
    
    return response;

  } catch(e) {
    console.log(e)
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'General Server Error',
        e,
      }),
    };
    return response;
  }    
}

export const deleteNoteById = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback)  =>  {

  try {
    
      const dynamo = new DynamoDBClient(clientOpt);
      const noteId = event.pathParameters?.noteId
      
      const userId = event.headers.app_user_id!;
      const deleteCmd = new DeleteItemCommand({
        TableName,
        Key: {
          noteId : {
            "S": noteId!,
          },
          userId: {
            "S": userId
          }
        },
      })
    
    await dynamo.send(deleteCmd);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Note Deleted Successfully',
      }),
    };
    
    return response;

  } catch(e) {
    console.log(e)
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'General Server Error',
        e,
      }),
    };
    return response;
  }    
}

export const authorize = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback)  =>  {

  try {
    
    let id_token  = event.headers.Authorization;
    let params = {
      IdentityPoolId: identityPoolId,
      Login:{ 'accounts.google.com' : id_token }
    }
    let data : any = await cognitoIdentity.send(new GetIdCommand(params));

    data = await cognitoIdentity.send(new GetCredentialsForIdentityCommand({
          IdentityId: data?.IdentityId,
          Logins:  { 'accounts.google.com' : id_token! }
    }))

    let decoded : any = jwtDecode(id_token!);
    data.userName = decoded.name

    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
    
    return response;

  } catch(e) {
    const response = {
      headers : {
        "Access-Control-Allow-Origin":  "*"
      },
      statusCode: 200,
      body: JSON.stringify({
        message: 'General Server Error',
        e,
      }),
    };
    return response;
  }    
}