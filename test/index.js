const expect = require("chai").expect;
const supertest = require("supertest");
const dummy = supertest(`http://localhost:3000/`);

describe("Lib", () => {
	let server;

	const startServer = (config, done) => {
		const app = require("express")();
		server = require("http").createServer(app);
		app.use(require("../index")(config));
		server = app.listen(3000, done);
	};

	const stopServer = (done) => {
		server.close(() => done());
	};

	describe("Package", () => {
		describe("With basePath, schemes & host", () => {
			before((done) => {
				startServer({
					path: "mocks/",
					basePath: "/v1",
					host: "studiohyperdrive.be",
					schemes: ["https"],
					NODE_ENV: [
						"test",
					],
				}, done);
			});

			after(done => stopServer(done));

			it("Should call the /docs route", (done) => {
				dummy
					.get("docs")
					.then((response) => {
						expect(response.statusCode).to.be.equal(200);
						expect(response.headers).to.have.property("content-type").to.contain("text/html");
						expect(response.body).to.be.an("object");
						done();
					})
					.catch(done);
			});

			it("Should call the /docs/json route", (done) => {
				dummy
					.get("docs/json")
					.then((response) => {
						expect(response.statusCode).to.be.equal(200);
						expect(response.headers).to.have.property("content-type").to.contain("application/json");

						expect(JSON.stringify(response.body.schemes)).to.equal(JSON.stringify(["https"]));
						expect(response.body.host).to.equal("studiohyperdrive.be");
						expect(response.body.basePath).to.equal("/v1");
						expect(response.body.info.description).to.equal("Studio Hyperdrive API docs npm package");

						done();
					})
					.catch(done);
			});
		});

		describe("Enabled NODE_ENV", () => {
			before((done) => {
				startServer({
					path: "mocks/",
					NODE_ENV: [
						"test",
					],
				}, done);
			});
			after(done => stopServer(done));

			it("Should call the /docs route", (done) => {
				dummy
					.get("docs")
					.then((response) => {
						expect(response.statusCode).to.be.equal(200);
						expect(response.headers).to.have.property("content-type").to.contain("text/html");
						expect(response.body).to.be.an("object");
						done();
					})
					.catch(done);
			});

			it("Should call the /docs/json route", (done) => {
				dummy
					.get("docs/json")
					.then((response) => {
						expect(response.statusCode).to.be.equal(200);
						expect(response.headers).to.have.property("content-type").to.contain("application/json");
						done();
					})
					.catch(done);
			});
		});

		describe("Disabled NODE_ENV", () => {
			before((done) => {
				startServer({
					path: "mocks/",
					NODE_ENV: [],
				}, done);
			});
			after(done => stopServer(done));

			it("Should call the /docs route", (done) => {
				dummy
					.get("docs")
					.then((response) => {
						expect(response.statusCode).to.be.equal(404);
						done();
					})
					.catch(done);
			});

			it("Should call the /docs/html route", (done) => {
				dummy
					.get("docs/html")
					.then((response) => {
						expect(response.statusCode).to.be.equal(404);
						done();
					})
					.catch(done);
			});
		});
	});
});
