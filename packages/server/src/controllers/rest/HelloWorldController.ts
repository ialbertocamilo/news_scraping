import {Controller, Inject} from "@tsed/di";
import {Get} from "@tsed/schema";
import {DynamoDbService} from "../../services/DynamoDbService";

@Controller("/hello-world")
export class HelloWorldController {

    @Inject()
    dynamo: DynamoDbService

    @Get("/")
    get() {
        return "hello";
    }

    @Get("/test")
    test() {
        this.dynamo.getInstance().scan({TableName: 'users'}, (err, data) => {
            console.log(data.Items)
        })

        console.log("data")
        return "gaaa"
    }
}
