var config = {};

config.development = {
    
    database: {
	name: 'tradewinds',
	host: 'localhost',
	port: '27017',
	credentials: '' // username:password@
    },
    
    application: {
	port: 1337,
	cookieKey: '8YQM5GUAtLAT34'
    }
    
};

config.production = {
    
    database: {
	name: 'tradewinds',
	host: 'localhost',
	port: '8080',
	credentials: 'admin:password@' // username:password@
    },
    
    application: {
	port: 80,
	cookieKey: '5SCjWfsTW8ySul'
    }    
    
};

config.environment = 'development';

module.exports = config;