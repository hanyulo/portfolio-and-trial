
## Log

#### Travis CI
[TravisCI + Google App Engine Note](https://github.com/hanyulo/url-shortener-back-end#travis-ci-set-up)

#### Server Side Rendering
* [overview](https://blog.jakoblind.no/case-study-ssr-react/)
    1. SSR in prod + CSR in dev
        * advantage: dev mode reload quickly because you don't have to generate bundle for every modification
        * drawback: fail to find out bugs in production mode
    2. SSR IN both prod and dev
        * advantage: correct production
        * drawback: slow dev env

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

#### Transpilation
* problem: global.location.protocol Cannot read property 'protocol' of undefined
    * solution one
        * target: node in webpack config
    * solution two
        * use babel plainly


#### Auth State && Unauthorized Redirection

* Unauthorized Redirection
    * Problem
        * In appSehll, app utilizes httpOnly cookie to fetch userProfile from server then flips the authorized flag
        * authorized at client side
        * consequence: can not use react-router to redirect

    * Solution
        1. Redirect by resource-server (x)
            * X, I want my front-end-app is an independent project
                * authorized flag, redirection should be handled at client side
        2. SSR in both dev and prod mode (v)
            * Benefit: prevent myself from accidentally breaking prod mode
        3. work around: check/flip authorized flag before rendering of react-router
            * auth at routes file
            * problem
                * duplicated code
                * state management
                * async functional component ???? (need third party package)
        4. localStorage + context (synchronization)

* Auth State
    * mechanism
        1. In initialization, the app send request with cookie  (access token)
            * fetch userProfile
            * authorized flag
        2. localStorage (persistent storage)
            * userProfile + authorized flag
        3. react app get data either from 1 or 2 then store data in context for whole app (AppShell.js)

    * **the current mechanism should be tmp, the prefer solution is ssr + context/redux store from server side.**


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
    * [x] basic implementation
    * [ ] fetch data from RESTful APIs at server side and insert the data to apps
        * login information
* [ ] React Helmet
* [ ] CORS
    * [x] basic request
    * [ ] api-key
    * [ ] login process
        * [ ] storage check (cookie/localStorage)
        * [ ] against XSS
        * [ ] against CSRF

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
* [ ] ~~Solve PM2 issue on google app engine~~
* [ ] Icons to base64Url
* [x] XSS Example
* [ ] CSRF Example
* [ ] i18n
* [ ] [PWA](https://developers.google.com/web/progressive-web-apps/checklist)
    * serviceworkers
* [ ] Error Boundary Component
* [ ] auth state to redux store + ssr


## Trial
* [ ] AMP
* [ ] Service Workers
* [ ] google compute engine
    * current progress
        * start script (executable)
            * need to make a template and use metadata to run the script
        * single instance
* [ ] CI/CD
    * [ ] circleCI
    * [ ] Google Compute Engine
* [ ] Docker
* [ ] SSR IN both prod and dev

## Question
* should I have ssr in dev mode ?
   * conflict with hot module reload?
* API calls in ssr and client - side??
* staticContext of reacr router
