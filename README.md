# nodejs-restify-redis-mongo-boilerplate

## Endpoints

This API exposes various endpoints following the REST convention.

## Prerequisites

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/docker-for-mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/docker-for-windows/install/)
* [Install instructions](https://docs.docker.com/engine/installation/linux/ubuntu/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/engine/installation/) for other platforms

Install [Docker Compose](https://docs.docker.com/compose/install/) on your system.

* Python/pip:
```$ sudo pip install -U docker-compose```
* Other:
	```$ curl -L "https://github.com/docker/compose/releases/download/1.11.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
	```

## Setup

Run `docker-compose build`. It will

* install [nodemon](https://github.com/remy/nodemon) globally in your container
* install all dependencies from the package.json in your container
* expose port 8000 to the host
* instruct the container to execute `npm dev` on start up.

## Start

Run `docker-compose up` to create and start the API and all DB containers. The app should then be running on your docker daemon on port 8000.

## Setup for production

* You need to change the the 'NODE_ENV' to production in `docker-compose.yml`
* You can change the ports in `docker-compose.yml`
