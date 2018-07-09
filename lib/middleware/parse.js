const prettySwag = require("pretty-swag");
const base = {
	format: "singleFile",
	markdown: true,
	fixedNav: true,
	autoTags: false,
	noDate: true,
	collapse: {
		path: false,
		method: true,
		tool: true,
	},
	theme: {
		default: "blue",
		GET: "blue",
		POST: "green",
		DELETE: "red",
		PUT: "amber",
		PATCH: "orange",
	},
};

module.exports = (req, res, next) => {
	if (req.params.type === "json") {
		return next();
	} else if (req.params.type) {
		throw `\`${req.params.type}\` is not a valid path param.`;
	} else {
		prettySwag.run(req.swagger, null, base, (err, data) => {
			req.swagger = data;

			return next(err);
		});
	}
};
