import { IRoutesCatalog, RoutesCatalog } from "./routes-catalog";
import { IControllersCatalog, ControllersCatalog } from "./controllers-catalog";
import { IServicesCatalog, ServicesCatalog } from "./services-catalog";

type TAppRecord = {
    routes: IRoutesCatalog
    controllers: IControllersCatalog
    services: IServicesCatalog
}

export interface IAppCatalog {
    getCatalog: (app_id: string) => TAppRecord
    existCatalog: (app_id: string) => boolean
    reset: (app_id: string) => void
}

class AppCatalog implements IAppCatalog {
    
    private _catalog: {
        [key: string]: TAppRecord
    }

    constructor () {
        this._catalog = {};
    }

    getCatalog (app_id: string): TAppRecord {

        if (this._catalog[app_id] === undefined) {
            this._catalog[app_id] = {
                routes: new RoutesCatalog(app_id),
                controllers: new ControllersCatalog(app_id),
                services: new ServicesCatalog(app_id)
            };
        }

        return this._catalog[app_id];

    }

    existCatalog (app_id: string): boolean {
        if (this._catalog[app_id] === undefined) {
            return false;
        }
        return true;
    }

    reset (app_id: string) : void {

        if (this._catalog[app_id] === undefined) {
            return;
        }

        this._catalog[app_id].routes.reset();
        this._catalog[app_id].controllers.reset();
        this._catalog[app_id].services.reset();

        this._catalog = {};
    }

}

export default new AppCatalog();