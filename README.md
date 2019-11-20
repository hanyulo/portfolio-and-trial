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


## Note

#### Travis CI
[TravisCI + Google App Engine Note](https://github.com/hanyulo/url-shortener-back-end#travis-ci-set-up)

#### Server Side Rendering
* Concept
    * client code
        * entry: index.js with `ReactDOM.hydrate`
        * for both development and production mode
            * dev: client-side rendering (fully)
            * prod: event-handler, componentDidMount (partial)
    * server code
        * entry: server.js
            * generate skeleton code
                * html
                * part of javascript
                * full css
        * only for production


* setup notice (bumped errors)
    * production webpack config: target node for `entry: server.js`
    * undefined moduleId
        * external: `exclude node/express modules`
    * undefined modulId
        * scenario: use webpack 4 and compiling node server with optimization
            * solutions
                1. need webpack 5 (but has compatiable issue with html-webapck-plugin)
                2. don't set optimization -> splitChunks: all in webpack 4. [ref1](https://github.com/manuelbieh/react-ssr-setup/blob/master/config/webpack.config.ts/client.base.ts)
                    ```js
                        cacheGroups: {
                          commons: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendor',
                            chunks: 'all',
                          },
                        },
                    ```
    * var style = document.createElement('style');
        * isomorphic-style-loader
    * index.js with `reactDOM.hydrate`
        * it is client code entry
        * development
            * bundle entry for development mode
        * production
            1. bundle the client code first, and put it in to dist
            2. bundle the server code and transfer the server in to dist
            3. run the server
                1. browser receive skeleton of app, which include style, html, part of javascript
                2. browser get client bundle and run the rest of code ( such as componentDidMount )
                    * [ref](https://stackoverflow.com/questions/33990133/react-componentdidmount-not-firing)
                    * [ref2](https://reactjs.org/docs/react-dom.html#hydrate)

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
    * [x] server side rendering
    * [ ] Code Splitting - [loadable components](https://github.com/smooth-code/loadable-components)
* [x] server side rendering
* [ ] React Helmet
* [ ] CORS
    * [x] basic request
    * [ ] api-key
    * [ ] login process
        * [ ] storage check (cookie/localStorage)

* [ ] typescript || flow
    * choose typescript
    * flow doc is not thorough and clear
* [x] CHANGELOG.md
* [x] CI/CD
    * [x] TravisCI
    * [x] Google Engine
* [ ] Eslint pre commit hook (TDD)
* [ ] Automatic Dark Mode
* [ ] JS DOC
* [ ] Solve PM2 issue on google app engine


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
