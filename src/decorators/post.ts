/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { getRequestPath } from "../lib/utils";
import AppCatalog from "../lib/app-catalog";

export function Post (request_path: string = "/", app_id: string = "default"): Function {

    if (typeof app_id !== "string") {
        throw new Error("Id application must be string");
    }

    if (typeof request_path !== "string") {
        throw new Error("Request path must be string");
    }

    request_path = getRequestPath(request_path);

    return function (target: any, controller_method: string) {

        const controller_name = target.constructor.name;
        const routes_catalog = AppCatalog.getCatalog(app_id).routes;

        routes_catalog.add(request_path, "post", controller_name, controller_method);

    };

}