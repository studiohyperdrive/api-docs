const expect = require("chai").expect;
const config = require("../lib/config");

describe("Check config", () => {
	it("Should throw an error when the path is missing", (done) => {
		expect(() => {
			config({});
		}).to.throw("`path` is a required config property.");

		done();
	});

	it("Should throw an error when the NODE_ENV are missing", (done) => {
		expect(() => {
			config({
				path: "path",
			});
		}).to.throw("`NODE_ENV` is a required config property.");

		done();
	});

	it("Should convert the NODE_ENV to an array when provided as a string", (done) => {
		const conf = config({
			path: "path",
			NODE_ENV: "test",
		});

		expect(conf).to.have.property("NODE_ENV").to.be.an("array").to.have.lengthOf(1);
		expect(conf.NODE_ENV[0]).to.be.equal("test");

		done();
	});

	it("Should set the default values on the config object", (done) => {
		const conf = config({
			path: "path",
			NODE_ENV: "NODE_ENV",
		});
		const packageJson = require("../package.json");
		expect(conf).to.have.all.keys([
			"path",
			"name",
			"description",
			"version",
			"baseUrl",
			"NODE_ENV",
			"basePath",
			"host",
			"schemes",
		]);

		expect(conf.name).to.be.equal(packageJson.name);
		expect(conf.version).to.be.equal(packageJson.version);
		expect(conf.description).to.be.equal(packageJson.description);
		expect(conf.baseUrl).to.be.equal("/");
		expect(conf.basePath).to.be.equal("/");
		expect(JSON.stringify(conf.schemes)).to.be.equal(JSON.stringify(["https"]));
		expect(conf.host).to.be.equal(null);

		done();
	});

	it("Should overwrite provided properties on the config object", (done) => {
		const conf = config({
			path: "path/",
			name: "name",
			description: "some description",
			version: "1",
			baseUrl: "base",
			NODE_ENV: "NODE_ENV",
			basePath: "v1/",
			host: "studiohyperdrive.be",
			schemes: ["https"],
		});
		expect(conf).to.have.all.keys([
			"path",
			"name",
			"description",
			"version",
			"baseUrl",
			"NODE_ENV",
			"basePath",
			"host",
			"schemes",
		]);

		expect(conf.name).to.be.equal("name");
		expect(conf.description).to.be.equal("some description");
		expect(conf.version).to.be.equal("1");
		expect(conf.path).to.be.equal("path/");
		expect(conf.basePath).to.be.equal("v1/");
		expect(conf.host).to.be.equal("studiohyperdrive.be");
		expect(JSON.stringify(conf.schemes)).to.be.equal(JSON.stringify(["https"]));

		done();
	});
});
