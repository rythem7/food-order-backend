# backend
This is the backend for the food-order application.

## Getting started
To start the backend, run `npm start` in the root directory of this project. The backend will start on port 3000.

## API Endpoints
The backend provides the following endpoints:

* `GET /meals`: Returns a list of available meals.
* `POST /orders`: Creates a new order. The request body should contain the order data in JSON format.

## Database
The backend stores its data in a JSON file located at `data/available-meals.json`. This file contains a list of available meals.

## Testing
To test the backend, use a tool like `curl` to send a request to one of the endpoints. For example, to get a list of available meals, you can run `curl http://localhost:3000/meals`.
