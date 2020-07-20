/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { getRequestPath, getMethods} from "../lib/utils";

export function Get (request_path: string = "/", id: string = "default"): Function {

    request_path = getRequestPath(request_path);

    return function (target: any, controller_method: string) {

        const path = getMethods(id, target, "get", request_path);

        path.fn_name = controller_method;

    };

}