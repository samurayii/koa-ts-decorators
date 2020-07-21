/* eslint-disable @typescript-eslint/no-unused-vars */
import KoaD, { Get, Controller, Middleware, Post, Service } from "../src/index";
import * as Koa from "koa";
import * as superagent from "superagent";
import { expect } from "chai";
import * as helmet from "koa-helmet";

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
            middle (ctx: Koa.Context, next: Koa.Next) {
                ctx.state.flag = true;
                next();
            }

            @Get()
            @Get("/hello")
            @Post()
            @Post("/hello")
            get (ctx: Koa.Context): void {
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

        app.listen(config.listening, async () => {

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
            middle (ctx: Koa.Context, next: Koa.Next) {
                ctx.state.flag = true;
                next();
            }

            @Get()
            @Get("/hello")
            @Post()
            @Post("/hello")
            get (ctx: Koa.Context): void {
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

        app.listen(config.listening, async () => {

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

    it("@Get, @Post @Controller, @Middleware, @Service (2 controller)", function(done) {

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
            middle (ctx: Koa.Context, next: Koa.Next) {
                ctx.state.flag = true;
                next();
            }

            @Get()
            @Get("/hello")
            @Post()
            @Post("/hello")
            get (ctx: Koa.Context): void {
                if (ctx.state.flag === true) {
                    ctx.body = "OK";
                    ctx.status = 200;
                } else {
                    ctx.body = "Error";
                    ctx.status = 500;
                }
            }
        }

        @Service("helmet", helmet())
        @Controller()
        class User {

            @Middleware()
            middle (ctx: Koa.Context, next: Koa.Next) {
                ctx.state.flag = true;
                next();
            }

            @Get()
            @Post()
            get (ctx: Koa.Context): void {
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

        app.listen(config.listening, async () => {

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
    
});