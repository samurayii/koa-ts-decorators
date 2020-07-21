/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { getRequestPath } from "../lib/utils";
import AppCatalog from "../lib/app-catalog";

export function Delete (request_path: string = "/", app_id: string = "default"): Function {

    if (typeof app_id !== "string") {
        throw new Error("Id application must be string");
    }

    request_path = getRequestPath(request_path);

    return function (target: any, controller_method: string) {

        const controller_name = target.constructor.name;
        const routes_catalog = AppCatalog.getCatalog(app_id).routes;

        routes_catalog.add(request_path, "del", controller_name, controller_method);

    };

}