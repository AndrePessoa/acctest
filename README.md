# Accedo Programming Test

This is a Media App VOD to test some technologys know-hows.

## How and why

I choose code the front-end with Reactjs because it is a javascript framework reference and worldwide used, and this application has front-end focus, but dont suggest any another. On the other hand, the back-end I choose do at a PHP's _vanilla style_ with a simple (almost) MVC structure because it's supposed to be easy to install, and this project does not require some huge like a Laravel, but the core of this can be converted easily if necessary.

LiveDemo http://www.accedo.entreoutros.com/

## Details

* HTML5 with Video API
* CSS3
* React v16.2.0
* PHP 7.0 without frameworks
* MariaDB - 10.1.26

## Dependeces

* Apache v2.4.27
* Node v8.9.4
* Yarn v1.3.2 or npm 4.0.5
* PHP 7.0

## Install

1. Mount a PHP enviroment
2. Clone the project
3. Install JS dependecies `yarn install`
4. Edit `./src/config.js` pointing to API Service to `<your enviroment>/api` , example: _http://localhost/andrepessoa/api_
5. Create a MySQL Database
6. Edit `./public/api/config.php` with DB's access settings
7. Build front-end `yarn build`
8. Copy the `./build` folder to your enviroment root
  
## Simple API Tests

* Test API status - `./api/test`
* Test API DB Connection - `./api/dbtest`
