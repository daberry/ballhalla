# Ballhalla

A casual free-for-all king of the hill game with an easy learning curve and no sign up required.

Team

  - Product Owner: David Berry
  - Scrum Master: Sean Brock
  - Developers: James Quillin, Juancarlos Jauregui

## Table of Contents

1. [Usage](https://github.com/DJJS/thesis-project/blob/master/_README.md#usage)
2. [Tools](https://github.com/DJJS/thesis-project/blob/master/_README.md#tools)
    1. [Installing Dependencies](https://github.com/DJJS/thesis-project/blob/master/_README.md#installing-dependencies)
    2. [Running Locally](https://github.com/DJJS/thesis-project/blob/master/_README.md#running-locally)
3. [Workflow](https://github.com/DJJS/thesis-project/blob/master/_README.md#workflow)

## Usage

Just visit the [website](http://pond-game.herokuapp.com/), enter a nickname or optionally sign in, and click Play!

## Tools

- Node.js
- Socket.io
- PlayCanvas
- Redis
- Mocha
- Travis CI

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Running Locally

Create a `.env` file to hold the information for the Redis database. Make sure that the Network.js file points to your localhost, and then start `server.js`  with node or equivalent program.

## Workflow

Fork main PlayCanvas project to your own PlayCanvas profile.  Develop features in the PlayCanvas editor.  Export and download current fork and replace the contents of the public folder with teh exported download.  You can then run the project locally by pointint Network.js to your localhost and opening mulitple tabs.  From there you may make pull requests to the main repo on GitHub, from which the code will be deployed to Heroku, and optionally uploaded to the main PlayCanvas project.

In order to unit test scripts, run ```npm test```  When committing and making a pull request to the main repo on GitHub, Travis CI will run the test suite.
