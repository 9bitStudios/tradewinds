Tradewinds
==========

Tradewinds is a web application built on Node.js, Express, and MongoDB that uses the popular Model-View-Controller (MVC) design pattern.

### Installation

To install, simply run the following...

```
npm install
```

Once all dependencies have finished installing, you're also going to want to make sure you have MongoDB installed as well.

### Running the Application

To run the application you need to first start up the database and point it at the project's db folder. So in your mongodb/bin directory you'd want to run...

```
mongod --dbpath /c/path/to/tradewinds/db
```

Once the database starts up then you then just need to run the following...

```
node tradewinds
```

### Setup

Before you first run the application you're going to want to do some things to get started. You may want to edit your config.js file if you want to customize various elements of your application such as database name, hostnames, ports, etc. Take a look through the config.js file to configure your setup and environment.

When you first run the application you'll want to go to the /install route...

```
http://yourwebsite.com/install
``` 

Here you can create your default admin account to install the application and set up the database. Once successful, you'll receive a notification and a prompt to login with the credentials you just provided.