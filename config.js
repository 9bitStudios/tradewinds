var config = {};

config.development = {
    
    database: {
		name: 'tradewinds',
		host: 'localhost',
		port: '27017',
		credentials: '' // username:password@
    },
    smtp: {
		username: "username",
		password: "password",
		host: "smtp.gmail.com",
		port: 587,
		ssl: false
    },
    application: {
		port: 1337,
		sessionKey: 'Sh9rXDrGh9nABj',
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
    smtp: {
		username: "username",
		password: "password",
		host: "smtp.yourmailserver.com",
		port: 25,
		ssl: false
    },    
    application: {
		port: 80,
		sessionKey: 'tce6K52sCZOLSV',
		cookieKey: '5SCjWfsTW8ySul'
    }    
    
};

config.environment = 'development';

module.exports = config;