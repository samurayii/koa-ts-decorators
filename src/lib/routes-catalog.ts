type TRouteRecord = {
    path: string
    method: string
    controller_name: string
    fn_name: string
}

export interface IRoutesCatalog {
    readonly catalog: TRouteRecord[]
    add: (
        path: string,
        method: string,
        controller_name: string,
        fn_name: string
    ) => void
    reset: () => void
}

export class RoutesCatalog implements IRoutesCatalog {
    
    private _catalog: TRouteRecord[]

    constructor (private readonly _app_id: string) {
        this._catalog = [];
    }

    get catalog (): TRouteRecord[] {
        return this._catalog;
    }

    add (
        path: string,
        method: string,
        controller_name: string,
        fn_name: string
    ): void {

        for (const record of this._catalog) {
            if (method === "use") {
                if (controller_name === record.controller_name && fn_name === record.fn_name) {
                    throw new Error(`Koa decorators error. Middleware ${fn_name} for controller ${controller_name} application ${this._app_id} already exist`);
                }
            } else {
                if (path === record.path && method === record.method && controller_name === record.controller_name) {
                    throw new Error(`Koa decorators error. Path ${method.toLocaleUpperCase()} ${path} for method ${fn_name} of controller ${controller_name} application ${this._app_id} already exist for method ${record.fn_name}`);
                }
            }
        }

        this._catalog.push({
            path: path,
            method: method,
            controller_name: controller_name,
            fn_name: fn_name
        });
    }

    reset (): void {
        this._catalog = [];
    }
}