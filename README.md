# Ballhalla!

A casual free-for-all king of the hill game with an easy learning curve and no sign up required.

Team

  - Product Owner: David Berry
  - Scrum Master: Sean Brock
  - Developers: James Quillin, Juancarlos Jauregui

## Table of Contents

1. [Usage](https://github.com/DJJS/thesis-project/blob/master/README.md#usage)
2. [Tools](https://github.com/DJJS/thesis-project/blob/master/README.md#tools)
    1. [Installing Dependencies](https://github.com/DJJS/thesis-project/blob/master/README.md#installing-dependencies)
    2. [Running Locally](https://github.com/DJJS/thesis-project/blob/master/README.md#running-locally)
3. [Workflow](https://github.com/DJJS/thesis-project/blob/master/README.md#workflow)
    1. [File Structure](https://github.com/DJJS/thesis-project/blob/master/README.md#file-structure)
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

Run ```npm test``` to unit test scripts.  When committing and making a pull request to the main repo on GitHub, Travis CI will run the test suite.

### File Structure

Exporting from playcanvas packages each asset within an individually assigned file with associated individual numeric identifiers such as ex-> 8668841/1/ - these numbers will be reassigned on individuals forked projects within playcanvas, so some initial navigation will be required to build familiarity within public/files/assets/...

Within the playcanvas editor, these numeric identifiers are abstracted, and much of your work will take place within the playcanvas editor. 

Below are some of the most important commonly used file locations. 

 - Network.js - public/files/assets/8668841/... - this file sets up our socket.io
 
 - collider.js - public/files/assets/8668838/... - this file sets up our player collisions
 
 - teleportable.js - public/files/assets/8668839/... - this file puts players in the right spot on update
 
 - start-screen.js - public/files/assets/8658762/... - this creates a new player
 
 - movement.js - public/files/assets/8668840/... - this defines movevment of player and tracks other players
 
