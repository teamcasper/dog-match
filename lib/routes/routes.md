# Possible Routes

## Questions

What part of filtering is done by routes vs. by the UI?

### post /signup

### post /signin

### get /verify  (requires authentication)

### get /users

### get /user/:userId

### get /dogs

### get /dogs/:zip

returns all dogs in a zip code

### get /dogs/:zip/city

returns all dogs in a city containing a given zip code

uses middleware to find city for zip code

could include:
* average price by zip
* min and max price in city

### get /dogs/:zip/radius/:miles

returns all dogs in a radius of x miles around a zip code

uses middleware to find zip codes in radius - https://www.zipcodeapi.com/

could include:
* average price by zip
* min and max price in radius

### get /dogs/ 

### get /dogs/:dogId

### post /dogs   (requires authentication)
