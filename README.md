# Accedo Programming Test

This is a Media App VOD to test some technologys know-hows.

## How and why

I chose coding the front-end with Reactjs because it’s a javascript framework reference used worldwide.
The back-end is coded using _vanilla_ PHP in a simple MVC-like structure, since it's supposed to be easy to install, and this project does not require something huge like Laravel, but its core can be easily converted if necessary.

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

1. Setup a PHP environment
2. Clone the project
3. Install all JS dependencies `yarn install`
4. Edit `./src/config.js` to point the API Service to `<your enviroment>/api` . Example: _http://localhost/andrepessoa/api_
5. Create a MySQL Database
6. Edit `./public/api/config.php` with DB's access settings
7. Build front-end `yarn build`
8. Copy the `./build` folder to your enviroment root
  
## Simple API Tests

* Test API status - `./api/test`
* Test API DB Connection - `./api/dbtest`
