/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import AppCatalog from "../lib/app-catalog";

export function Middleware (app_id: string = "default"): Function {

    if (typeof app_id !== "string") {
        throw new Error("Id application must be string");
    }

    return function (target: any, controller_method?: string) {

        if (target.name === undefined && controller_method !== undefined) {

            const controller_name = target.constructor.name;
            const routes_catalog = AppCatalog.getCatalog(app_id).routes;

            routes_catalog.add("", "use", controller_name, controller_method);

        } else {

            const name = target.name;
            const constructor = target as FunctionConstructor;
            const instance = new constructor();
            const middleware_catalog = AppCatalog.getCatalog(app_id).middleware;

            middleware_catalog.add(name, instance);

        }

    };

}