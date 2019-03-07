const glob = require("glob");
const swaggerJSDoc = require("swagger-jsdoc");
const R = require("ramda");

module.exports = R.curry((config, req, res, next) => {
	req.swagger = swaggerJSDoc({
		swaggerDefinition: {
			info: {
				title: config.name,
				version: config.version,
			},
			...(config.basePath && { basePath: config.basePath }),
			...(config.schemes && { schemes: config.schemes }),
			...(config.host && { host: config.host }),
		},
		apis: glob.sync(`${config.path}**/*.js`, {
			absolute: true,
		}),
	});
	next();
});
