# Project details

## Basic Info

- Here I employed a code first approach while building the app
- I chosen clean architecture patterns to build the services
- The accesskey-mgmt-svc owns the access key database and has the event based apis for the CRUD of access keys
- The web3-token-info-svc manages the service call to get the token data.
- A dummy gateway is built to connect with these to services via a rabbitmq based event streams

- The gateway is supposed to take care of authentication and authorization, since it was not asked, I haven't done anything on that part.
- Following camelcase naming convention for variables and database properties.
- Since access key data is owned by accesskey-mgmt-service, adhereing to the service oriented architecture principles, I didn't wrote a db call from web3-token-info-svc to access key-mgmt-svc, instead used an event based rpc call.
- As of now I haven't used a caching layer in this web3-token-info-svc, since I was not asked for it. But that will greatly optimise the calls.
- I used pnpm for package management.
- I used a guard for throttling the requests.

## Technologies used

- mongo db as a database
- rabbitmq for event streaming
- nodejs version 20 for development.

## Run the app to test

- clone the repo
- run `docker compose up`
- import the postman_collection.json.json to your postman, from the root
- call generateAccesskey api to generate key
- for the ease of development and to save time, I haven't created another field for access key instead used the auto generated \_id field of mongo document as the access key. set the ratelimit to a small value like 3
- from the generateAccesskey response take the \_id and pass it along X-API-KEY header in fetchweb3tokens api.
- Just call the fetchweb3tokens multiple times and to reach the limit and see if it throws the error and check the logs.
- admin apis route starts with 'admin/access-key' and user apis routes start from '/'
- To run tests run `npm run test`

## Architecture

- Follows clean architecture
- layers include domain -> use cases -> services -> framework(repositories and controllers)
- everything that connects to outside - controllers via http/rpc and database - are inside framework
- There is abstracts for repositories, so that its easy to change the data source (may be change the db or change the service if needed)
- its easy to test as well, since easy to mock the repositories based on the abstracts.
- SOLID principles are followed

## Disclaimer

- No architecture principles followed for dummy gateway service since, it was not a service asked for
- Tests are added only for accesskey.controller.ts in accesskey-mgmt-svc, as I couldn't get enough time
- Logging is not implemented across the app, only added log for access key request. I would have probably wrote a custom logger and injected where ever I need it.
- I haven't added much commenting to the code, with more time I can refactor and comment the code.

## Needed clarifications on

- It was asked to have an endpoint for web3 token info service, but it was also asked for having both services run async with communication via event streams. It was asked to assume a gateway as a proxy, so I was confused on whether to keep web3 token info service as hybrid or microservice or REST based service

- Its said that admin auth happens with JWT, and was asked to not do any auth. So confused whether to write any dummy guards. I haven't wrote any.

- Its asked to not have any http/grpc request between microservice, but to preserve data ownership between services(as per standard SOA way of doing things), I used rpc call from web3 token service to access key service.

- Its asked to follow rest api principles but the task didn't asked to write rest apis but instead event stream based services.
