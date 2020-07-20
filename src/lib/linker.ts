import catalog from "./catalog";
import KoaD from "../index";
import * as Router from "@koa/router";

const createRoutes = (app: KoaD) => {

    const schema = catalog[app.id];

    for (const controller_name in schema) {

        const controller = schema[controller_name];
        const prefix = app.prefix.replace(/(^\/|\/$)/gi, "");
        const controller_path = controller.path.replace(/(^\/|\/$)/gi, "");
        
        let full_prefix = "";

        if (prefix !== "") {
            full_prefix += `/${prefix}`;
        }

        if (controller_path !== "") {
            full_prefix += `/${controller_path}`;
        }

        const router = new Router();

        for (const method in controller.methods) {

            for (const request_path in controller.methods[method]) {

                const controller_method = controller.methods[method][request_path].fn_name;
                const instance = controller.instance;
console.log(`${full_prefix}${request_path}`);
                //router.get(request_path, instance[controller_method].bind(instance));
                router.get(`${full_prefix}${request_path}`, instance[controller_method].bind(instance));

            }

            app.use(router.routes()).use(router.allowedMethods());

        } 

    }

};

export function Linker (app: KoaD): void {

    if (catalog[app.id] === undefined) {
        throw new Error(`Controllers for application ${app.id} not found`);
    }

    createRoutes(app);

}