import KoaD, { Get } from "../src/index";
import * as Koa from "koa";
import * as superagent from "superagent";
import { expect } from "chai";

describe("KoaD", function () {

    it("healthcheck", function(done) {

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

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        class Healthcheck {

            @Get()
            @Get("/2")
            get (ctx: Koa.Context): void {
                ctx.body = "OK";
                ctx.status = 200;
            }
        }

        const app = new KoaD(config);

        app.listen(config.listening, async () => {

            const response1 = await superagent.get("http://localhost:3001/api/healthcheck");

            expect(response1.status).to.equal(200);
            expect(response1.text).to.equal("OK");

            const response2 = await superagent.get("http://localhost:3001/api/healthcheck/2");

            expect(response2.status).to.equal(200);
            expect(response2.text).to.equal("OK");

            app.close( () => {
                done();
            });

        });

    });

});