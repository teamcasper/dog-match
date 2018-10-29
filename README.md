# Dog Match
https://alchemy-dog-match.herokuapp.com/
## Matching dogs with people who will love them
![Uber happy samoyed](http://www.holidogtimes.com/wp-content/uploads/2018/01/samoyed.png?2e4e73)

**By David Chhing, Sarah Flynn, Karen Painter**
    
## Description

This application was built with the emphasis on the back end server, although a partially functional front-end is provided.  We created a database with a collection of breeds, dogs, matches (between dog seeker and dog provider), and users. Our app provides three primary functions:
1. People can research various dog breeds and find a good fit based on criteria they are seeking.
1. Once they've settled on the kind of dog they want, users can search for dogs in their area that meet their specific criteria.
1. Once they've found dogs they are interested in, they can initiate contact with the dog owner through the site.

Any one can search the site, but users must be authenticated to post or delete dogs or to initiate contact with dog owners.

## Technical Description

### Models

- Dog: a dog available for sale or adoption
- User: a registered user of the application.  Can be a seeker or a provider of dogs.
- Match: a record of the contact initiated between the seeker and the dog owner
- Breed: a general description of a breed

### Routes

Basic CRUD functions are available for all Model types.  

Detailed queries are supported for Dogs and Breeds.

In addition, the following aggregation reports are available:
- minimum, maximum, and average price of dogs by zip code
- minimum, maximum, and average price of dogs by city
- report of successful adoptions

## Setup/Installation Requirements

### Back end
1. have node and mongoDb installed. 
1. Download dog-match from git hub.   Enter your mongoDb location in your .env according to the example provided.
1. install all dependencies (npm i)
1. get an api key from zipcodeapi.com.  You may get two keys for more lookups.  Enter the key(s) in your .env according to the example provided.
1. Begin the application (npm run start).

### Front end
1. Install all dependencies: npm i
2. Ensure that the proxy server address in the vue.config.js file matches your back end
3. npm run serve compiles and hot reloads for development
4. npm run build compiles and minfies for production
5. npm run lint lints and fixes files

## Known Bugs

The front-end of this application is only a quick, partial implementation to demonstrate some of the capabilities of the back-end for the purposes of a class presentation. It is far from finished.

## Technologies Used

    deployment: Heroku
    database: MongoDB, Mongoose
    server: Node, ExpressJS
    front-end: Vue, Vue Router
    authentication: bcrypt, jsonwebtoken
    testing: Postman, Supertest, nodemon, Jest, Morgan, Travis
    version control: Github
    front-end dev dependencies: vue/cli-plugin-babel, vue/cli-plugin-eslint, vue/cli-service, vue-template-compiler

### License

Copyright (c) 2018 David Chhing, Sarah Flynn, Karen Painter
