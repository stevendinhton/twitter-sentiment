// ESM syntax is supported.
export { startAPI }

import express from 'express';
import cors from 'cors';
import Dotenv from 'dotenv';
import Twitter from 'twitter';
import Sentiment from 'sentiment';

Dotenv.config();
const app = express();

function startAPI() {
  const sentiment = new Sentiment();
  const twitter = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
  });

  app.use(cors());

  app.get('/:search', function (req, res) {
    twitter.get('search/tweets', {q: req.params.search, result_type: 'recent', count: 50}, function(error, tweet, response) {
      const sentimentAnalysis = sentiment.analyze(tweet.statuses.map(tweet => tweet.text).join('. '));
      res.json(sentimentAnalysis);
    });
  });

  app.listen(3001);
}
