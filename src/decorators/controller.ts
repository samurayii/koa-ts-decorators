/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { getRequestPath } from "../lib/utils";
import catalog from "../lib/catalog";

export function Controller (request_path: string = "", id: string = "default"): Function {
    
    if (typeof request_path !== "string") {
        throw new Error("Request path must be string");
    }

    return function (target: Function) {

        if (request_path === "") {
            request_path = target.name;
        }

        request_path = getRequestPath(request_path);
    
        const controller_name = target.name;
        const constructor = target as FunctionConstructor;

        if (catalog[id] === undefined) {
            catalog[id] = {};
        }

        if (catalog[id][controller_name] === undefined) {
            catalog[id][controller_name] = {
                name: controller_name,
                path: target.name.toLocaleLowerCase(),
                instance: new constructor(),
                methods: {}
            };
        } else {
            catalog[id][controller_name].path = request_path;
        }
console.log(JSON.stringify(catalog, null, 4));
    };
}