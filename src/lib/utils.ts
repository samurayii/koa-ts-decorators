/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import catalog from "./catalog";

export function getMethods (id: string, target: any, method: string, request_path: string) {

    const controller_name = target.constructor.name;

    if (catalog[id] === undefined) {
        catalog[id] = {};
    }
    
    if (catalog[id][controller_name] === undefined) {
        catalog[id][controller_name] = {
            name: controller_name,
            path: target.constructor.name.toLocaleLowerCase(),
            instance: new target.constructor(),
            methods: {}
        };
    }

    const methods = catalog[id][controller_name].methods;

    if (methods[method] === undefined) {
        methods[method] = {};
    }

    if (methods[method][request_path] !== undefined) {
        throw new Error(`Request path ${id} application GET ${request_path} for ${target.constructor.name} controller already exist`);
    }

    methods[method][request_path] = {};

    return methods[method][request_path];

}

export function getRequestPath (request_path: string) {

    if (typeof request_path !== "string") {
        throw new Error("Request path must be string");
    }

    request_path = request_path.replace(/(^\/|\/$)/gi, "");

    request_path = `/${request_path}`;

    return request_path.toLocaleLowerCase();

}