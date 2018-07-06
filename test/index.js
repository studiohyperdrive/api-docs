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
						expect(response.headers).to.have.property("content-type").to.contain("application/json");
						expect(response.body).to.be.an("object");
						done();
					})
					.catch(done);
			});

			it("Should call the /docs/html route", (done) => {
				dummy
					.get("docs/html")
					.then((response) => {
						expect(response.statusCode).to.be.equal(200);
						expect(response.headers).to.have.property("content-type").to.contain("text/html");
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
