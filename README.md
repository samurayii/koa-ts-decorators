## Simple koa decorators

install: `npm install koa-ts-decorators`

Decorators:
- @Controller
- @Middleware
- @Get
- @Post
- @Put
- @Delete

### Example

Basic:
```js
import { KoaD, Get, Controller, Middleware, Post, Context, Next, IMiddleware, IKoaDConfig } from "koa-ts-decorators";
import * as koa_logger from "koa-logger";

const config: IKoaDConfig = {
    listening: "*:3001",
    enable: true,
    prefix: "/",
    proxy: false,
    subdomain_offset: 2,
    proxy_header: "X-Forwarded-For",
    ips_count: 0
}

@Controller()       // path /healthcheck
@Controller("/")    // path /
class Healthcheck {

    @Middleware()
    middle (ctx: Context, next: Next) {
        ctx.state.flag = true;
        next();
    }

    @Get()              // route GET /
    @Get("/hello")      // route GET /hello
    @Post()             // route POST /
    @Post("/hello")     // route POST /hello
    get (ctx: Context): void {
        if (ctx.state.flag === true) {
            ctx.body = "OK";
            ctx.status = 200;
        } else {
            ctx.body = "Error";
            ctx.status = 500;
        }
    }
}

@Middleware()
class Logger implements IMiddleware {
    use (config: IKoaDConfig): unknown {
        console.log(config);
        return koa_logger( (str: string) => {
            console.log(str);
        });
    }
}

const app = new KoaD(config); // create koad app (extended koa app)

// additional parameters and methods
console.log(app.config);
console.log(app.prefix);
console.log(app.id);
console.log(app.config);

app.disable();
app.enable();

app.listen( async () => {

    const response1 = await superagent.get("http://localhost:3001/");
    const response2 = await superagent.get("http://localhost:3001/hello");
    const response3 = await superagent.get("http://localhost:3001/healthcheck");
    const response4 = await superagent.get("http://localhost:3001/healthcheck/hello");

    app.close();

});
```

2 application:
```js
import { KoaD, Get, Controller, Middleware, Post, Context, Next, IMiddleware, IKoaDConfig } from "koa-ts-decorators";
import * as koa_logger from "koa-logger";

const config: IKoaDConfig = {
    listening: "*:3001",                // listing host and port
    enable: true,                       // enable/disable application
    prefix: "/",                        // global prefix
    proxy: false,                       // koa app.proxy 
    subdomain_offset: 2,                // koa app.subdomainOffset
    proxy_header: "X-Forwarded-For",    // koa app.proxyHeader
    ips_count: 0                        // koa app.ipsCount
    //keys?: string[]                   // koa app.keys
    //env?: "development"               // koa app.env
}

@Controller("second")           // second app, path /healthcheck
@Controller("/", "second")      // second app, path /
@Controller()                   // default app, path /healthcheck
@Controller("/")                // default app, path /
class Healthcheck {

    @Middleware()
    @Middleware("second")
    middle (ctx: Context, next: Next) {
        ctx.state.flag = true;
        next();
    }

    @Get()              // route GET /
    @Get("/hello")      // route GET /hello
    @Get({
        app_id: "second"
    })
    @Get("/hello", "second")
    get (ctx: Context): void {
        if (ctx.state.flag === true) {
            ctx.body = "OK";
            ctx.status = 200;
        } else {
            ctx.body = "Error";
            ctx.status = 500;
        }
    }
}

@Middleware()
@Middleware("second")
class Logger implements IMiddleware {
    use (config: IKoaDConfig): unknown {
        console.log(config);
        return koa_logger( (str: string) => {
            console.log(str);
        });
    }
}

const app1 = new KoaD(config); // create koad app1
const app2 = new KoaD(config, "second"); // create koad app2

app1.listen( "*:3001", async () => {

    const response1 = await superagent.get("http://localhost:3001/");
    const response2 = await superagent.get("http://localhost:3001/hello");
    const response3 = await superagent.get("http://localhost:3001/healthcheck");
    const response4 = await superagent.get("http://localhost:3001/healthcheck/hello");

    app.close();

});

app2.listen( "*:3002", async () => {

    const response1 = await superagent.get("http://localhost:3002/");
    const response2 = await superagent.get("http://localhost:3002/hello");
    const response3 = await superagent.get("http://localhost:3002/healthcheck");
    const response4 = await superagent.get("http://localhost:3002/healthcheck/hello");

    app.close();

});

```