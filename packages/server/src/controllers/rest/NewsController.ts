import {Controller, Inject} from "@tsed/di";
import {Get, Post} from "@tsed/schema";
import {DynamoDbService} from "../../services/DynamoDbService";
import {PromiseResult} from "aws-sdk/lib/request";
import {QueryParams} from "@tsed/platform-params";

@Controller("/news")
export class NewsController {

    @Inject()
    dynamo: DynamoDbService

    @Get("/get")
    async getAll(): Promise<PromiseResult<any, any>> {

        const data = await this.dynamo.getInstance().scan({TableName: 'news'}).promise();

        return data
    }

    @Post("/favorites/add")
    async add(@QueryParams() query: any) {

        await this.dynamo.getInstance().update({
            TableName: 'news',
            Key: {
                "id": query.uid,
                "created_date":"2022-12-08T12:38:57.875Z"
            },
            UpdateExpression: "SET favorite = :favorite",
            ExpressionAttributeValues: {
                ":favorite": "true"
            },
            ReturnValues: "UPDATED_NEW"
        }).promise()
        return {query: query.uid}
    }
}