# UI Testing with Cypress

Cypress installation instructions can be found at: https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements
Instructions for writing/running tests can be fount at: https://docs.cypress.io/guides/getting-started/writing-your-first-test

## Test 1

Searches Vega for a product that is in the database.
Steps:
	1) Visits Vega site
	2) Inputs search string
	3) Clicks search button
	4) Checks that the new url is correct
	5) Checks that the product returned matches the search string

## Test 2

Searches Vega for a product that is not in the database.
Steps:
	1) Visits Vega site
	2) Inputs search string
	3) Clicks search button
	4) Checks that the new url is correct
	5) Checks that the product returned does not match the search string

## Test 3

Searches Vega with no input
Steps:
	1) Visits Vega site
	2) Clicks the search button
	3) Checks for the "Empty search input" alert 
	4) Clicks the confirm button of the alert