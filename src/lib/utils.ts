/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function getRequestPath (request_path: string) {

    if (typeof request_path !== "string") {
        throw new Error("Request path must be string");
    }

    request_path = request_path.replace(/(^\/|\/$)/gi, "");

    request_path = `/${request_path}`;

    return request_path.toLocaleLowerCase();

}