# nodejs-restify-redis-mongo-boilerplate

## Endpoints

This API exposes various endpoints following the REST convention.

## Prerequisites

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/docker-for-mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/docker-for-windows/install/) for Windows
* [Install instructions](https://docs.docker.com/engine/installation/linux/ubuntu/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/engine/installation/) for other platforms

Install [Docker Compose](https://docs.docker.com/compose/install/) on your system.

## Usage

### Development

#### With Docker

Run `docker-compose -f docker-compose-dev.yml build` in order to:

* install all dependencies from the package.json in your container with nodemon to have the hot reloading
* expose port 8000 to the host
* instruct the container to execute `npm start` with the proper ENV variables.

To start the API:

* Run `docker-compose -f docker-compose-dev.yml up` to create and start the API and all DB containers. The app should then be running on your docker daemon on port 8000.

To find the API IP use the command:
```bash
$ docker-machine ip
```

**/!\ Nodemon is used with -L by default (in package.json) /!\**

**/!\ Remove it for better performance (required with Docker tool on Windows 8.1) /!\**

#### Without Docker

To launch the api you will need:

* A local mongo server running

* A local redis server running


Then, just type ```node bin/server``` and start doing requests on http://localhost:8000 or whatever port you set in your config

### Production

#### With Docker

Run `docker-compose -f docker-compose-prod.yml build` in order to:

* install production dependencies from the package.json in your container
* expose port 80 to the host
* instruct the container to execute `npm start` with the proper ENV variables.

To start the API:

* Run `docker-compose -f docker-compose-prod.yml up` to create and start the API and all DB containers. The app should then be running on your docker daemon on port 8000.

#### Without Docker

To launch the api you will need:

* A mongo server running, and the host address set in ```config/index.js```

* A redis server running, and the host address set in ```config/index.js```

The env variable ```NODE_ENV``` set to ```production```

Then, use the command ```node bin/server``` and start doing requests on http://localhost:80 or whatever port you set in your config
