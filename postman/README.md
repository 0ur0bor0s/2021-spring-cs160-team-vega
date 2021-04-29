# Backend testing with Postman
Postman installation instructions can be found here: https://www.postman.com/downloads/

# Setup

To setup the testing environment follow the instructions below:

1. Download the Vega.postman_collection.json file in this directory
2. Open Postman
3. Click on File->Import
4. Drag and drop the Vega.postman_collection.json file

# Tests

The backend tests are divided into three collection; registration, product, and login. Each collection contains a set of requests that contain tests to ensure that the
backend is returning the correct results.

## Registration Tests

1. User successfully logs into account

This scenario includes a test that makes sure that users can register accounts.

2. User tries to register account with an email that is already being used

This scenario includes two tests; the first test checks to see if the registration returns a false success field, and the second test checks to see if there is a message returned from the server.

3. User tries to register account with a username that is already being used

This scenario includes two tests that check for the same things as the test above.

## Product Tests

1. Get Product By Product Seller ID

This scenario incldues a test that checks to see if all the products returned by the backend are actually owned by the user with the product_seller_id = 1.

## Login Tests

1. User successfully logs into account

This scenario includes two tests; the first test checks to see if the id field that's returned matches the id field that is expected. For this test the id that it's expecting is 1. The second test checks to see if the accessToken field is not undefined. 

2. User inputs incorrect password

This scenario includes two tests; the first one checks to see if the id field is null because the login failed. The second test checks to see if the backend returned a message.

3. User tries to login with an account that does not exist

This scenario includes two tests that are similar to the tests above.