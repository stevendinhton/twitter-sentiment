# Twitter Sentiment Analysis

This web app allows a user to input a search term. The sentiment of the term will be determined using 50 recent tweets and will be scored as a value from -100% (bad) to 100% (great). Sentiment analysis is performed by using the AFINN-165 wordlist to give a score to specific positive and negative words found in the tweets, and then determining the average by dividing the sum of the score by the number of tokens. 

This project consists of:
* An Express backend for the API endpoint that returns the sentiment analysis results of a search term
* A React frontend for a user to enter a specified term

To run this you need to set environment variables corresponding to your Twitter keys and secrets. If you're not running this locally, you'll also need to ensure the client is pointing towards the correct server url in `./client/config.json`.

Once that's set up, run this to start both the Express backend and React frontend concurrently:

```
npm run dev
```
