/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { getRequestPath } from "../lib/utils";
import AppCatalog from "../lib/app-catalog";

export function Controller (request_path: string = "", app_id: string = "default"): Function {

    if (typeof app_id !== "string") {
        throw new Error("Id application must be string");
    }

    return function (target: Function) {

        if (request_path === "") {
            request_path = target.name;
        }

        request_path = getRequestPath(request_path);
  
        const controller_name = target.name;
        const controllers_catalog = AppCatalog.getCatalog(app_id).controllers;

        controllers_catalog.add(controller_name, request_path, target);

    };
}