const parser = require("swagger-parser");

module.exports = (req, res, next) => {
	parser.validate(req.swagger)
		.then(() => {
			next();
		})
		.catch(next);
};
