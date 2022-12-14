import {Controller, Inject} from "@tsed/di";
import {Delete, Get, Post} from "@tsed/schema";
import {DynamoDbService} from "../../services/DynamoDbService";
import {PromiseResult} from "aws-sdk/lib/request";
import {BodyParams, QueryParams} from "@tsed/platform-params";

@Controller("/news")
export class NewsController {

    @Inject()
    dynamo: DynamoDbService

    @Get("/get")
    async getAll(@QueryParams("source_filter") source_filter: string): Promise<PromiseResult<any, any>> {
        const d = new Date()
        const date1 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate()) + 'T00:00:00.000Z'
        const date2 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate()) + 'T24:59:00.000Z'
        if (source_filter) {
            return await this.dynamo.getInstance().scan({
                TableName: 'news',
                FilterExpression: "#src = :src and created_date between :created_date1 and :created_date2",
                ExpressionAttributeValues: {
                    ":src": source_filter,
                    ":created_date1": date1,
                    ":created_date2": date2,
                },
                ExpressionAttributeNames: {
                    "#src": "source"
                }
            }).promise();
        }
        const data = await this.dynamo.getInstance().scan({TableName: 'news'}).promise();

        return data
    }

    @Post("/favorites/add")
    async add(@BodyParams() query: any) {

        // console.log(query)
        await this.dynamo.getInstance().update({
            TableName: 'news',
            Key: {
                "id": query.id,
                "source_id": Number(query.source_id),
            },
            UpdateExpression: "SET favorite = :favorite",
            ExpressionAttributeValues: {
                ":favorite": true
            },
            ReturnValues: "UPDATED_NEW"
        }).promise()
        return {query: query}
    }

    @Get("/favorites/get")
    async getFavorites() {
        return await this.dynamo.getInstance().scan({
            TableName: 'news',
            FilterExpression: "favorite = :favorite",
            ExpressionAttributeValues: {
                ":favorite": true
            }
        }).promise()
    }


    @Delete("/delete")
    async deleteAllItems() {

        const st = "delete from news where 'favorite'='false' RETURNING ALL OLD *";
        await this.dynamo.getDynamo().executeStatement({
            Statement: st
        }).promise();
        return st;
    }
}