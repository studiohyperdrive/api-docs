const expect = require("chai").expect;
const reqres = require("reqres");
const middleware = require("../lib/middleware");

describe("Middleware", () => {
	describe("Swagger", () => {
		it("Should create the swagger and place in on the request", (done) => {
			const req = reqres.req();
			const res = reqres.res();
			const conf = {
				info: {
					title: "Test Swagger",
					version: "1",
				},
			};

			middleware.swagger(conf, req, res, () => {
				expect(req).to.have.property("swagger").to.be.an("object");
				done();
			});
		});
	});

	describe("Validate", () => {
		it("Should continue without errors when the swagger is valid", (done) => {
			const req = reqres.req({
				swagger: {
					info: {
						title: "Test Swagger",
						version: "1",
					},
					definitions: {},
					parameters: {},
					paths: {},
					responses: {},
					securityDefinitions: {},
					"swagger": "2.0",
					tags: [],
				},
			});
			const res = reqres.res();

			middleware.validate(req, res, (err) => {
				expect(err).to.be.undefined;
				done();
			});
		});

		it("Should error when the swagger is not valid", (done) => {
			const req = reqres.req({
				swagger: {
					info: {
						version: "1",
					},
					definitions: {},
					parameters: {},
					paths: {},
					responses: {},
					securityDefinitions: {},
					"swagger": "2.0",
					tags: [],
				},
			});
			const res = reqres.res();

			middleware.validate(req, res, (err) => {
				expect(err).to.not.be.undefined;
				done();
			});
		});
	});

	describe("Parse", () => {
		it("Should continue when no type is defined", (done) => {
			const req = reqres.req({
				params: {},
				swagger: {
					info: {
						title: "Test Swagger",
						version: "1",
					},
					definitions: {},
					parameters: {},
					paths: {},
					responses: {},
					securityDefinitions: {},
					"swagger": "2.0",
					tags: [],
				},
			});
			const res = reqres.res();

			middleware.parse(req, res, (err) => {
				expect(req.swagger).to.be.an("object");
				expect(err).to.be.undefined;
				done();
			});
		});

		it("Should continue parse to html when type equals html", (done) => {
			const req = reqres.req({
				params: {
					type: "html",
				},
				swagger: {
					info: {
						title: "Test Swagger",
						version: "1",
					},
					definitions: {},
					parameters: {},
					paths: {},
					responses: {},
					securityDefinitions: {},
					"swagger": "2.0",
					tags: [],
				},
			});
			const res = reqres.res();

			middleware.parse(req, res, (err) => {
				expect(req.swagger).to.be.a("string");
				expect(err).to.be.null;
				done();
			});
		});

		it("Should throw an error when type is unknown", (done) => {
			const req = reqres.req({
				params: {
					type: "unknown",
				},
				swagger: {
					info: {
						title: "Test Swagger",
						version: "1",
					},
					definitions: {},
					parameters: {},
					paths: {},
					responses: {},
					securityDefinitions: {},
					"swagger": "2.0",
					tags: [],
				},
			});
			const res = reqres.res();

			expect(() => {
				middleware.parse(req, res);
			}).to.throw("\`unknown\` is not a valid path param.");
			done();
		});
	});
});
