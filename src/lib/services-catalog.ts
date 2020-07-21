/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
type TServiceRecord = {
    name: string
    controller_name: string
    instance: any
}

export interface IServicesCatalog {
    readonly catalog: TServiceRecord[]
    add: (
        name: string,
        controller_name: string,
        instance: any
    ) => void
    reset: () => void
}

export class ServicesCatalog implements IServicesCatalog {
    
    private _catalog: TServiceRecord[]

    constructor (private readonly _app_id: string) {
        this._catalog = [];
    }

    get catalog (): TServiceRecord[] {
        return this._catalog;
    }

    add (
        name: string,
        controller_name: string,
        instance: any
    ): void {

        for (const record of this._catalog) {
            if (name === record.name && record.controller_name === controller_name) {
                throw new Error(`Koa decorators error. Service ${name} for controller ${controller_name} application ${this._app_id} already exist`);
            }
        }

        this._catalog.push({
            name: name,
            controller_name: controller_name,
            instance: instance
        });

    }

    reset (): void {
        this._catalog = [];
    }

}