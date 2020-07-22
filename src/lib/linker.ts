import { KoaD } from "../index";
import * as Router from "@koa/router";
import AppCatalog from "./app-catalog";

export default function Linking (app: KoaD): void {

    const app_id = app.id;
   
    if (AppCatalog.existCatalog(app_id) !== true) {
        throw new Error(`Koa decorators error. Catalog for application ${app_id} not found`);
    }

    const catalog = AppCatalog.getCatalog(app_id);
    const routes = catalog.routes;
    const controllers = catalog.controllers;
    const prefix = app.prefix.replace(/(^\/|\/$)/gi, "");

    const middleware_catalog = catalog.middleware;

    for (const middleware of middleware_catalog.catalog) {
        app.use(middleware.instance.use(app.config));
    }

    for (const controller of controllers.catalog) {

        let full_prefix = "";

        if (prefix !== "") {
            full_prefix += `/${prefix}`;
        }

        if (controller.path !== "/" && controller.path !== "") {
            full_prefix += `/${controller.path.replace(/(^\/|\/$)/gi, "")}`;
        }
        
        const router = new Router();

        if (full_prefix !== "/" && full_prefix !== "") {
            router.prefix(full_prefix);
        }

        for (const route of routes.catalog) {

            if (controller.name === route.controller_name) {

                switch (route.method) {
                    case "get": {
                        router.get(route.path, controller.instance[route.fn_name].bind(controller.instance));
                        break;
                    }
                    case "post": {
                        router.post(route.path, controller.instance[route.fn_name].bind(controller.instance));
                        break;
                    }
                    case "del": {
                        router.del(route.path, controller.instance[route.fn_name].bind(controller.instance));
                        break;
                    }
                    case "put": {
                        router.put(route.path, controller.instance[route.fn_name].bind(controller.instance));
                        break;
                    }
                    case "use": {
                        router.use(controller.instance[route.fn_name].bind(controller.instance));
                        break;
                    }
                    default: {
                        throw new Error(`Koa decorators error. Method ${route.method} for controller ${controller.name} not found`);
                    }
                }

            }

        }

        app.use(router.routes()).use(router.allowedMethods());

    }

    AppCatalog.reset(app_id);

}