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

## Caveat
* PORT
    * dev mode: 3000
    * Prod mode: 8080
        * google app engine only route incoming requests to port 8080 [ref](https://cloud.google.com/appengine/docs/flexible/custom-runtimes/build#listening_to_port_8080)

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

#### List of Main Dependencies
* :white_check_mark: react@^16.11
    * :fire: with hook implementation
* :fire: react-router-dom 5

## To Do
* [ ] redux
* [ ] redux thunk
* [ ] testing
    * [x] Jest
    * [x] Enzyme
    * [ ] styled-components
    * [x] react-test-renderer
    * [x] react-testing-library
* [ ] styled-components
* [ ] sub issues of HMR
    * entry file
* [ ] webpack setting
    * [ ] Code Splitting
    * [ ] Lazy Load
    * [ ] Tree Shaking
    * [ ] production optimization
* [ ] react setting
    * [ ] lazy load
    * [ ] server side rendering
* [ ] server side rendering
* [ ] React Helmet
* [ ] CORS
    * [ ] api-key
    * [ ] login process
        * [ ] storage check (cookie/localStorage)

* [ ] typescript || flow
    * choose typescript
    * flow doc is not thorough and clear
* [ ] CHANGELOG.md
* [ ] CI/CD
    * [ ] TravisCI
    * [ ] Google Engine
* [ ] Eslint pre commit hook (TDD)
* [ ] Automatic Dark Mode
* [ ] JS DOC


## Trial
* [ ] PWA
* [ ] AMP
* [ ] Service Workers
* [ ] XXS / CSRF
* [ ] google compute engine
    * current progress
        * start script (executable)
            * need to make a template and use metadata to run the script
        * single instance
* [ ] CI/CD
    * [ ] circleCI
    * [ ] Google Compute Engine
* [ ] Docker
