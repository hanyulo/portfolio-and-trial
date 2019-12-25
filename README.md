# Hanyulo's Portfolio and Trial

Originally, this repo is just the front-end part of my url-shortener project. However, since I would like to try out a lot of stuffs, it grows gradually and become the city of London ([Mortal Engines](https://en.wikipedia.org/wiki/Mortal_Engines_(film)#Plot)).

Now, this project works as my portfolio landing and trial of several web-dev-features. I will extract part of the project to form a react-starter later on.

* Purpose of this project
    * portfolio website
    * trial
    * side projects and work history index

* Long-term Goal: separate the project
    * Create an react-starter with thorough devOps
    * Fully working server for my projects
    * Generate static portfolio page and extract related code to different repo

## Compound

#### General Setup
* :fire: Babel 7
* :fire: Webpack 4
* :fire: Eslint 6 - AirBnB
* :white_check_mark: Testing Framework
    * :fire: Jest
    * :fire: Enzyme
    * :fire: react-test-renderer
    * :fire: react-testing-library
* :white_check_mark: CSS Modules
* :white_check_mark: How Module Replacement
* :white_check_mark: Dev Mode with Node Server
* :white_check_mark: Prod Mode to Dist
* :white_check_mark: Server Side Rendering

#### List of Main Dependencies
* :white_check_mark: react@^16.11
    * :fire: with hook implementation
* :fire: react-router-dom 5



## Caveat
* PORT
    * Dev mode: 3000
    * Prod mode: 8080
        * google app engine only route incoming requests to port 8080 [ref](https://cloud.google.com/appengine/docs/flexible/custom-runtimes/build#listening_to_port_8080)

## Prod V.S Dev
|  | Production | Development |
| --- | --- | --- |
| Port | 8080 | 3000 |
| Rendering | Server-Side | Client-Side |
