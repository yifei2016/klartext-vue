# klartext frontend
> A Vue.js application

## Development

  * Start frontend server

        $ docker-compose up vue

    * You can also choose to `bash` into docker container, then start server with `yarn start`

          $ docker-compose run --rm --service-ports vue sh
          $ yarn install
          $ yarn start

  * Clean up unused docker daemon data

        $ docker system prune

Server with hot reload can be accessed at [localhost:5001](http://localhost:5001)

### Install node modules
Make sure you have a running container then install `node module` with:

    $ docker-compose exec vue yarn add node-sass

### Stop docker container

    $ docker-compose stop vue


## Backend and REST API

First you need to clone [klartext](https://github.com/chuan-su/klartext) repository.

    $ git clone git@github.com:chuan-su/klartext.git
    $ cd klartext

And then start backend development server, instruction can be found here [backend server](https://github.com/chuan-su/klartext/tree/master/frontend)

REST API Documentation can be found [here](https://github.com/chuan-su/klartext/blob/master/backend/API.md)
