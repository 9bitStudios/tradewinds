Tradewinds
==========

Tradewinds is a web application built on Node.js, Express, and MongoDB that uses the popular Model-View-Controller (MVC) design pattern.

### Installation

After downloading the package, to install the dependency libraries that the application uses simply run the following...

```
npm install
```

Once all dependencies have finished installing you're also going to want to make sure you have [MongoDB](http://www.mongodb.org/) installed as well.

### Running the Application

Before you first run the application you will want to edit your config.js file in the root directory if you want to customize various elements of your application such as database name, hostnames, ports, email, etc. Take a look through the config.js file to configure your setup and environment.

Once you have your configuration set, to run the application you need start up the database and point it at the project's db folder (or wherever it is you are storing your database files). So in your mongodb/bin directory you'd want to run...

```
mongod --dbpath /c/path/to/tradewinds/db
```

Once the database starts up then you then just need to run the following in another console window from the root directory of the project (where tradewinds.js resides)...

```
node tradewinds
```

### Setup

If it is the first time you are running the application you will probably want to go to the /install route...

```
http://localhost:1337/install
``` 

Here you can create your default admin account to install the application and set up the database. Once successful, you'll receive a notification and a prompt to login with the credentials you just provided.