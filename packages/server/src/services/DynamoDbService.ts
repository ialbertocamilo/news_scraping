import {Injectable} from "@tsed/di";
import {$log} from "@tsed/common";
import AWS from "aws-sdk";

@Injectable()
export class DynamoDbService {

    protected instance;

    constructor() {
        $log.info("Loading dynamodb")
        AWS.config.update({
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            region: process.env.REGION
        })
        $log.info("AWS info Loaded")
        this.instance = new AWS.DynamoDB.DocumentClient()
    }

    public getInstance() {
        return this.instance;
    }

}
