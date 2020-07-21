/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import AppCatalog from "../lib/app-catalog";

export function Service (name: string, instance: any, app_id: string = "default"): Function {

    if (typeof app_id !== "string") {
        throw new Error("Id application must be string");
    }

    if (typeof name !== "string" || name === undefined) {
        throw new Error("Koa decorators error. Name must be string");
    }

    if (instance === undefined) {
        throw new Error("Koa decorators error. Instance must be defined");
    }

    return function (target: Function) {

        const controller_name = target.name;
        const services_catalog = AppCatalog.getCatalog(app_id).services;

        services_catalog.add(name, controller_name, instance);

    };

}