import {Configuration, Inject, registerProvider} from "@tsed/di";
import AWS from "aws-sdk"
import {$log} from "@tsed/common";

/**
 * Inject DbFactory to the service, controller, etc...
 *
 * ## Usage
 *
 * ```typescript
 * import {Injectable} from "@tsed/di";
 * import DbFactory from "./DbFactory";
 *
 * @Injectable()
 * class MyService {
 *   @DbFactory()
 *   private factory: DbFactory;
 *
 *   // or
 *   constructor(@DbFactory() private factory: DbFactory){}
 * }
 *
 * @decorator
 */
export function DbFactory() {
    return Inject(DbFactory);
}

export type DbFactory = any; // implement type or interface for type checking

registerProvider({
    provide: DbFactory,
    deps: [Configuration],
    async useAsyncFactory(settings: Configuration) {
        let dynamo = new AWS.DynamoDB.DocumentClient()

        $log.info("creando conexion DynamoDB")

        return dynamo;
    }
});
