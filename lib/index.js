const Router = require("express").Router;
const middleware = require("./middleware");

module.exports = (options) => {
	const config = require("./config")(options);
	const router = new Router();

	if (~config.NODE_ENV.indexOf(process.env.NODE_ENV)) {
		router
			.get(
				`${config.baseUrl}docs/:type?`,
				middleware.swagger(config),
				middleware.validate,
				middleware.parse,
				(req, res) => {
					res.send(req.swagger);
				}
			);
	}

	return router;
};
