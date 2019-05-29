const packageJson = require(`${process.cwd()}/package.json`);
const props = [
	"path",
	"NODE_ENV",
];

module.exports = (options) => {
	const config = Object.assign({
		name: packageJson.name,
		version: packageJson.version,
		description: packageJson.description,
		baseUrl: "/",
		host: null,
		basePath: "/",
		schemes: ["https"],
	}, options);

	props.forEach(prop => {
		if (!config.hasOwnProperty(prop)) {
			throw new Error(`\`${prop}\` is a required config property.`);
		}
	});

	if (config.baseUrl.slice(-1) !== "/") {
		config.baseUrl += "/";
	}

	if (config.path.slice(-1) !== "/") {
		config.path += "/";
	}

	if (!Array.isArray(config.NODE_ENV)) {
		config.NODE_ENV = [config.NODE_ENV];
	}

	return config;
};
