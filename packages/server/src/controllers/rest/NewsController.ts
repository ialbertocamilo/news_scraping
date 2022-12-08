import {Controller, Inject} from "@tsed/di";
import {Get} from "@tsed/schema";
import {DynamoDbService} from "../../services/DynamoDbService";
import {PromiseResult} from "aws-sdk/lib/request";

@Controller("/news")
export class NewsController {

    @Inject()
    dynamo: DynamoDbService

    @Get("/get")
    async getAll(): Promise<PromiseResult<any, any>> {

        const data = await this.dynamo.getInstance().scan({TableName: 'news'}).promise();

        return data
    }
}