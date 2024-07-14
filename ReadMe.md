# Project details
 
## Basic Info

* Here I employed a code first approach while building the app
* I chosen clean architecture patterns to build the services
* The accesskey-mgmt-svc owns the access key database and has the event based apis for the CRUD of access keys
* The web3-token-info-svc manages the service call to get the token data.
* A dummy gateway is built to connect with these to services via a rabbitmq based event streams

* The gateway is supposed to take care of authentication and authorization, since it was not asked, I haven't done anything on that part.
* Following camelcase naming convention for variables and database properties.
* Since access key data is owned by accesskey-mgmt-service, adhereing to the service oriented architecture principles, I didn't wrote a db call from web3-token-info-svc to access key-mgmt-svc, instead used an event based rpc call. 
* As of now I haven't used a caching layer in this web3-token-info-svc, since I was not asked for it. But that will greatly optimise the calls.

## Todos

* Token expiry check - done
* Exception handling - done in gateway
* Tests for sample
* Architecture optimisation for web3 service - done
* hardcode a valid output for the token info service
* Author and book check - done
* Add repository and service module for fetching web3 token - done
* Logger
* remove unwanted console logs
* Improve documentation
* Readme of architecture
