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

## Setup

Run `docker-compose build`. It will

* install all dependencies from the package.json in your container with nodemon to have the hot reloading in development
* expose port 8000 to the host
* instruct the container to execute `npm run dev` on start up.

## Start

Run `docker-compose up` to create and start the API and all DB containers. The app should then be running on your docker daemon on port 8000.
**/!\ Nodemon is used with -L by default (in package.json) /!\ **

**/!\ Remove it for better performance (required with Docker tool on Windows 8.1) /!\ **

## Setup for production

* You need to change the the 'NODE_ENV' to production in `docker-compose.yml`
* You can change the ports in `docker-compose.yml` (port is 80 in production by default)
* You can also change the port in the `Dockerfile` (port is 80 in production by default)
