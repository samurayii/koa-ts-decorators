/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { getRequestPath } from "../lib/utils";
import AppCatalog from "../lib/app-catalog";

type TFuncArguments = {
    app_id?: string
    path?: string
}

export function Get (entered_args: TFuncArguments | string = {}, app_id?: string): Function {

    let args: TFuncArguments = {
        app_id: "default",
        path: "/"
    };

    if (arguments.length >= 2) {
        args.app_id = app_id;
        args.path = <string>entered_args;
    } else {
        if (typeof entered_args === "string") {
            args.path = entered_args;
        } else {
            args = {
                ...args,
                ...entered_args
            };
        }
    }

    if (typeof args.app_id !== "string") {
        throw new Error("Id application must be string");
    }

    if (typeof args.path !== "string") {
        throw new Error("Request path must be string");
    }

    const request_path = getRequestPath(args.path);

    return function (target: any, controller_method: string) {

        const controller_name = target.constructor.name;
        const routes_catalog = AppCatalog.getCatalog(args.app_id).routes;

        routes_catalog.add(request_path, "get", controller_name, controller_method);

    };

}