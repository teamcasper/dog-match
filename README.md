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

# Front end
1. Download all components from git hub
    - dog-match (back end)
    - dog-match-app (front) 

# Back


## Known Bugs


The front-end of this application is only a partial implementation to demonstrate the capabilities of the back-end.

## Technologies Used

    deployment: Heroku
    database: MongoDB, Mongoose
    server: Node, ExpressJS
    front-end: Vue
    authentication: bcrypt, jsonwebtoken
    testing: Postman, Supertest, nodemon, Jest, Morgan
    version control: Github

### License

Copyright (c) 2018 David Chhing, Sarah Flynn, Karen Painter
