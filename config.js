var config = {};

config.development = {
    
    database: {
	name: 'tradewinds',
	host: 'localhost',
	port: '27017',
	credentials: '' // username:password@
    }
};

config.production = {
    
    database: {
	name: 'tradewinds',
	host: 'localhost',
	port: '8080',
	credentials: 'admin:password@' // username:password@
    }
};

config.environment = 'development';

module.exports = config;