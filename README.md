![Angular-Gerrit](https://raw.github.com/dluksza/angular-gerrit/master/art/angular-gerrit-logo.png)

# Angular-Gerrit

Angular-Gerrit enables you to write [AngularJS](http://angularjs.org) based client side plugins for [Gerrit Code Review](https://code.google.com/p/gerrit/).

**Additional** patches on top of current Gerrit master are **required**! The easiest way to get started is to fetch change #[53341](https://gerrit-review.googlesource.com/#/c/53341) and build it locally.

## Getting started ##

Clone this repo then run `fetch-deps.sh` and copy files from `src/`:

 * init.js
 * js/angular-gerrit.js
 * dists/*

to `static` directory of your plugin. Create `plugin.js` file in `static/` dir. In `plugin.js` put yours AngularJS code wrapped with `AngularGerrit.install()`.

AngularGerrit.install() takes two parameters:

 1. list of additional angular modules - angular-gerrit will load modules to interact with Gerrit so you don't provide them here
 2. angular.Module object to interact with

## Example ##

Directory structure:

````
hello-world
└── static
    ├── dist
    │   ├── angular-1.2.14.js
    │   ├── angular-route-1.2.14.js
    │   ├── bootstrap-3.1.1.css
    │   └── jquery-2.1.0.js
    ├── init.js
    ├── js
    │   └── angular-gerrit.js
    ├── plugin.js
    └── templates
        └── hello.html
````

Content of `plugin.js`:
````javascript
AngularGerrit.install([/* additional modules goes here */],
                       function(app) {
  app.config(function(GerritRouteProvider) {
    GerritRouteProvider
        .when('/', {controller: 'HelloCtrl',
                    templateUrl: 'templates/hello.html'});
  });
  app.controller('HelloCtrl', function($scope) {
    $scope.greeting = 'Hello Diffy!';
  });
});
````

Content of `hello.html`:
````html
<h1>{{greeting}}</h1>
````

## Installing examples ##

In `examples/` directory you will also find more complex example that mimick Gerrit's ChangesScreen. Just run `build-examples.sh` script and copy over resulting *.jar files  to `$gerrit_site/plugins/`.

New plugins will be available under following links:

 * http://<gerrit_host>/#/x/hello-world/ - the hello world plugin example
 * http://<gerrit_host>/#/x/change-screen/q/ - Gerrit ChangesScreen reimplemented with AngularJS
 * http://<gerrit_host>/#/x/change-screen/q-b/ - Gerrit ChangesScreen reimplemented with AngularJS and Bootstrap

### Angular Services ###

Angular-Gerrit wraps standard Gerrit JS API into AngularJS friendly services:

 * GerritRoute - wraps [ngRoute](http://docs.angularjs.org/api/ngRoute) service and simplifies building plugin routes. It will prefix all screen provided URLs with `/x/$plugin_name`. Also urls for templates will be prefixed with `/plugins/$plugin_name/static/`
 * GerritSrv - wraps fallowing [Gerrit JS API](https://gerrit-review.googlesource.com/Documentation/js-api.html#Gerrit) functions:
  * [go](https://gerrit-review.googlesource.com/Documentation/js-api.html#Gerrit_go)
  * [refresh](https://gerrit-review.googlesource.com/Documentation/js-api.html#Gerrit_refresh)
  * [showError](https://gerrit-review.googlesource.com/Documentation/js-api.html#Gerrit_showError)
  * [onAction](https://gerrit-review.googlesource.com/Documentation/js-api.html#Gerrit_onAction)
  * [url](https://gerrit-review.googlesource.com/Documentation/js-api.html#Gerrit_url)
  * [get](https://gerrit-review.googlesource.com/Documentation/js-api.html#Gerrit_get)
  * [post](https://gerrit-review.googlesource.com/Documentation/js-api.html#Gerrit_post)
  * [put](https://gerrit-review.googlesource.com/Documentation/js-api.html#Gerrit_put)
  * [delete](https://gerrit-review.googlesource.com/Documentation/js-api.html#Gerrit_delete)
 * GerritPluginSrv - wraps [plugin instance](https://gerrit-review.googlesource.com/Documentation/js-api.html#self):
  * [getPluginName](https://gerrit-review.googlesource.com/Documentation/js-api.html#self_getPluginName)
  * [on](https://gerrit-review.googlesource.com/Documentation/js-api.html#self_on)
  * [onAction](https://gerrit-review.googlesource.com/Documentation/js-api.html#self_onAction)
  * [get](https://gerrit-review.googlesource.com/Documentation/js-api.html#self_get)
  * [post](https://gerrit-review.googlesource.com/Documentation/js-api.html#self_post)
  * [put](https://gerrit-review.googlesource.com/Documentation/js-api.html#self_put)
  * [delete](https://gerrit-review.googlesource.com/Documentation/js-api.html#self_delete)
 * GerritScreenSrv - wraps [Screen Context](https://gerrit-review.googlesource.com/Documentation/js-api.html#ScreenContext)
  * [body](https://gerrit-review.googlesource.com/Documentation/js-api.html#screen_body)
  * [setTitle](https://gerrit-review.googlesource.com/Documentation/js-api.html#screen.setTitle)
  * [setWindowTitle](https://gerrit-review.googlesource.com/Documentation/js-api.html#screen.setWindowTitle)

## Additional JS/CSS plugin dependencies ##

All additional plugin dependencies must be loaded dynamically before plugin code. By default angular-gerrit will load:

 * jquery
 * angular
 * angular-route
 * twbootstrap

Extra dependencies can be added in `init.js` file.

## Build and deploy ##

Just zip contents of you plugin (the `static` director must be in archive root directory) and change extension of resulting archive to jar. Or run: `zip -r0 ../plugin-name.jar .` within plugin directory. You can also have a look on `examples/build-examples.sh` script.

To deploy plugin in Gerrit instance use its [standard deploy mechanism](https://gerrit-review.googlesource.com/Documentation/dev-plugins.html#deployment)

## Development ##

To simplify development process you can create symlink in `$gerrit_site/plugins/` directory to yours plugin.

## License ##

Copyright (C) 2014 CollabNet. Distributed under the [Apache License Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).
