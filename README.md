# Icrudapp

## A simple demo of creating a CRUD app on IBM i

This project is fairly simple in concept.  It is a Angular app that uses PHP in the backend to render or update records in an existing demo file.  There are pieces of this app taken from various "to-do" projects and a little trouble-shooting on my part to make it work.  I run on an IBM i at 7.5 TR2 when this was originally written.

* It is using the HTTP Server for IBM i to serve the Angular app and PHP files
* Your best bet is to start with creating the HTTP Server config and test it, then create a "vanilla" Angular app, build and deploy it to your HTTP server folder (whatever it is).
* Then create the components and redeploy the skeletal app
* Then copy the PHP source from this repo to the HTTP server folder you created (your index file should be there as well).
* Test the execution of the PHP SQL queries from the browser to make sure your CORS settings are correct
* Then being copying and pasting the code for each component, one at a time and test them.
* OR just pull the whole repo but remember:  The Angular source code should live on your development PC/Laptop NOT the IBM i.  The only thing you need to deploy to IBM i (the server folder) are the artifacts from the "dist" folder in your angular project after you build it.
* I will update a blog post at https://www.ossgarden.org with the slide deck.  Eventually there will be a video.

# Angular Boilerplate info:
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
