'use strict';

const AWS = require('aws-sdk')

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const { id, title } = JSON.parse(event.body);

    const params = {
        TableName: "BookTable",
        Item: {
            id: id,
            title: title
        }
    }

    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch(error) {
        responseBody = `Unable to put book: ${error}`;
        statusCode = 403; 
    }

    const response = {
        statusCode: statusCode, 
        headers: {
            "Content-Type": 'application/json'
        },
        body: responseBody
    };

    return response
};