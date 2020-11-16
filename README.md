# JobBoard

This project is an open source Job Board. It's primary purpose is to serve as a
training exercise. Development of features is completed in isolation of any
possible future goals for the project. The primary purpose for this is to intentionally
introduce technical debt, this furthers the training capabilities of the project.

## Requirements

* Docker

## Getting Started

1. Clone the repo `git clone git@github.com:MattGibney/JobBoard.git`
2. cd into repo
3. If you have `direnv` allow the environment variables to be loaded
4. If you do not have `direnv`, run `source .envrc`
5. Start service `docker-compose up`

## Frontend

The front end of this application is currently rendered serverside using
Handlebars templates. This may change in the future with a migration to a
separate front end architecture, that's a little over kill for now though. Front
end uses [Bootstrap 5](https://v5.getbootstrap.com/docs/5.0/) beta.

## Deploying

Application deployment is automated via a Github action. It is triggerred when
a new release is published.

1. Tag a new release on the master branch. All tags should reflect the version defined in the `package.json` file
2. Publish a release for that tag in the Github UI.
