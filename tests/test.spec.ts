/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { KoaD, Get, Controller, Middleware, Post, Context, Next, IMiddleware, IKoaDConfig } from "../src/index";
import * as superagent from "superagent";
import { expect } from "chai";
import * as helmet from "koa-helmet";
import * as koa_logger from "koa-logger";

describe("KoaD", function () {

    it("@Get, @Post @Controller, @Middleware", function(done) {

        this.timeout(5000);
        this.slow(5000);

        const config = {
            listening: "*:3001",
            enable: true,
            prefix: "/",
            proxy: false,
            subdomain_offset: 2,
            proxy_header: "X-Forwarded-For",
            ips_count: 0,
            parsing: {
                enable: false,
                types: ["json"],
                encoding: "utf-8",
                form_limit: "56kb",
                json_limit: "1mb",
                text_limit: "1mb",
                strict: true
            }   
        };

        @Controller()
        @Controller("/")
        class Healthcheck {

            @Middleware()
            middle (ctx: Context, next: Next) {
                ctx.state.flag = true;
                next();
            }

            @Get()
            @Get("/hello")
            @Post()
            @Post("/hello")
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

        const app = new KoaD(config);

        app.listen( async () => {

            const response1 = await superagent.get("http://localhost:3001/");

            expect(response1.status).to.equal(200);
            expect(response1.text).to.equal("OK");

            const response2 = await superagent.get("http://localhost:3001/hello");

            expect(response2.status).to.equal(200);
            expect(response2.text).to.equal("OK");

            const response3 = await superagent.get("http://localhost:3001/healthcheck");

            expect(response3.status).to.equal(200);
            expect(response3.text).to.equal("OK");

            const response4 = await superagent.get("http://localhost:3001/healthcheck/hello");

            expect(response4.status).to.equal(200);
            expect(response4.text).to.equal("OK");

            app.close( () => {
                done();
            });

        });

    });

    it("@Get, @Controller, @Middleware (prefix)", function(done) {

        this.timeout(5000);
        this.slow(5000);

        const config = {
            listening: "*:3001",
            enable: true,
            prefix: "/api",
            proxy: false,
            subdomain_offset: 2,
            proxy_header: "X-Forwarded-For",
            ips_count: 0,
            parsing: {
                enable: false,
                types: ["json"],
                encoding: "utf-8",
                form_limit: "56kb",
                json_limit: "1mb",
                text_limit: "1mb",
                strict: true
            }   
        };

        @Controller()
        @Controller("/")
        class Healthcheck {

            @Middleware()
            middle (ctx: Context, next: Next) {
                ctx.state.flag = true;
                next();
            }

            @Get()
            @Get("/hello")
            @Post()
            @Post("/hello")
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

        const app = new KoaD(config);

        app.listen( async () => {

            const response1 = await superagent.get("http://localhost:3001/api/");

            expect(response1.status).to.equal(200);
            expect(response1.text).to.equal("OK");

            const response2 = await superagent.get("http://localhost:3001/api/hello");

            expect(response2.status).to.equal(200);
            expect(response2.text).to.equal("OK");

            const response3 = await superagent.get("http://localhost:3001/api/healthcheck");

            expect(response3.status).to.equal(200);
            expect(response3.text).to.equal("OK");

            const response4 = await superagent.get("http://localhost:3001/api/healthcheck/hello");

            expect(response4.status).to.equal(200);
            expect(response4.text).to.equal("OK");

            const post_response1 = await superagent.post("http://localhost:3001/api/");

            expect(post_response1.status).to.equal(200);
            expect(post_response1.text).to.equal("OK");

            const post_response2 = await superagent.post("http://localhost:3001/api/hello");

            expect(post_response2.status).to.equal(200);
            expect(post_response2.text).to.equal("OK");

            const post_response3 = await superagent.post("http://localhost:3001/api/healthcheck");

            expect(post_response3.status).to.equal(200);
            expect(post_response3.text).to.equal("OK");

            const post_response4 = await superagent.post("http://localhost:3001/api/healthcheck/hello");

            expect(post_response4.status).to.equal(200);
            expect(post_response4.text).to.equal("OK");

            app.close( () => {
                done();
            });

        });

    });

    it("@Get, @Post @Controller, @Middleware (2 controller)", function(done) {

        this.timeout(5000);
        this.slow(5000);

        const config = {
            listening: "*:3001",
            enable: true,
            prefix: "/",
            proxy: false,
            subdomain_offset: 2,
            proxy_header: "X-Forwarded-For",
            ips_count: 0,
            parsing: {
                enable: false,
                types: ["json"],
                encoding: "utf-8",
                form_limit: "56kb",
                json_limit: "1mb",
                text_limit: "1mb",
                strict: true
            }   
        };

        @Controller()
        @Controller("/")
        class Healthcheck {

            @Middleware()
            middle (ctx: Context, next: Next) {
                ctx.state.flag = true;
                next();
            }

            @Get()
            @Get("/hello")
            @Post()
            @Post("/hello")
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

        @Controller()
        class User {

            @Middleware()
            middle (ctx: Context, next: Next) {
                ctx.state.flag = true;
                next();
            }

            @Get()
            @Post()
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

        const app = new KoaD(config);

        app.listen( async () => {

            const response1 = await superagent.get("http://localhost:3001/");

            expect(response1.status).to.equal(200);
            expect(response1.text).to.equal("OK");

            const response2 = await superagent.get("http://localhost:3001/hello");

            expect(response2.status).to.equal(200);
            expect(response2.text).to.equal("OK");

            const response3 = await superagent.get("http://localhost:3001/healthcheck");

            expect(response3.status).to.equal(200);
            expect(response3.text).to.equal("OK");

            const response4 = await superagent.get("http://localhost:3001/healthcheck/hello");

            expect(response4.status).to.equal(200);
            expect(response4.text).to.equal("OK");

            const response5 = await superagent.get("http://localhost:3001/user/");

            expect(response5.status).to.equal(200);
            expect(response5.text).to.equal("OK");

            const response6 = await superagent.post("http://localhost:3001/user/");

            expect(response6.status).to.equal(200);
            expect(response6.text).to.equal("OK");

            app.close( () => {
                done();
            });

        });

    });

    it("@Middleware class", function(done) {

        this.timeout(5000);
        this.slow(5000);

        const config = {
            listening: "*:3001",
            enable: true,
            prefix: "/",
            proxy: false,
            subdomain_offset: 2,
            proxy_header: "X-Forwarded-For",
            ips_count: 0,
            parsing: {
                enable: false,
                types: ["json"],
                encoding: "utf-8",
                form_limit: "56kb",
                json_limit: "1mb",
                text_limit: "1mb",
                strict: true
            }   
        };

        @Controller()
        class Healthcheck {

            @Get()
            get (ctx: Context): void {
                ctx.body = "OK";
                ctx.status = 200;
            }
        }

        @Middleware()
        class Logger implements IMiddleware {
            use (config: IKoaDConfig): unknown {
                return koa_logger( (str: string) => {
                    //console.log(str);
                });
            }
        }

        @Middleware()
        class Helmet implements IMiddleware {
            use (): unknown {
                return helmet();
            }
        }

        @Middleware()
        class Void implements IMiddleware {
            use (): unknown {
                return;
            }
        }

        const app = new KoaD(config);

        app.listen( async () => {

            const response1 = await superagent.get("http://localhost:3001/healthcheck");

            expect(response1.status).to.equal(200);
            expect(response1.text).to.equal("OK");

            app.close( () => {
                done();
            });

        });

    });

    it("2 applications", function(done) {

        this.timeout(5000);
        this.slow(5000);

        const config = {
            enable: true,
            prefix: "/",
            proxy: false,
            subdomain_offset: 2,
            proxy_header: "X-Forwarded-For",
            ips_count: 0,
            parsing: {
                enable: false,
                types: ["json"],
                encoding: "utf-8",
                form_limit: "56kb",
                json_limit: "1mb",
                text_limit: "1mb",
                strict: true
            }   
        };

        @Controller()
        @Controller("/")
        @Controller({
            app_id: "second"
        })
        @Controller("/", "second")
        class Healthcheck {

            @Middleware()
            @Middleware("second")
            middle (ctx: Context, next: Next) {
                ctx.state.flag = true;
                next();
            }

            @Get()
            @Get("/hello")
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

        const app1 = new KoaD(config);
        const app2 = new KoaD(config, "second");

        app1.listen("*:3001", async () => {

            app2.listen("*:3002", async () => {

                const response1_1 = await superagent.get("http://localhost:3001/");

                expect(response1_1.status).to.equal(200);
                expect(response1_1.text).to.equal("OK");
    
                const response1_2 = await superagent.get("http://localhost:3001/hello");
    
                expect(response1_2.status).to.equal(200);
                expect(response1_2.text).to.equal("OK");

                const response2_1 = await superagent.get("http://localhost:3002/");

                expect(response2_1.status).to.equal(200);
                expect(response2_1.text).to.equal("OK");
    
                const response2_2 = await superagent.get("http://localhost:3002/hello");
    
                expect(response2_2.status).to.equal(200);
                expect(response2_2.text).to.equal("OK");
    
                app1.close( () => {
                    
                    app2.close( () => {
                        done();
                    });

                });
            });

        });

    });
    
});