'use strict'

import TwitterUtils from './utils/TwitterUtils'
import AWS from 'aws-sdk'
import regeneratorRuntime from 'regenerator-runtime' // Important! This needs to be imported here for Babel to transpile correctly.

exports.handler = async function index(event, context, callback){
    const SNS_TOPIC = process.env.SNS_TOPIC || callback(new Error("Please specify an SNS_TOPIC."));

    let screenName = process.env.SCREEN_NAME;
    let allTweets = await TwitterUtils.getTweets(screenName);
    allTweets = TwitterUtils.filterOutRetweets(allTweets);
    const sns = new AWS.SNS();
    let params = {
        Message: JSON.stringify(allTweets),
        Subject: "New Tweets",
        TopicArn: SNS_TOPIC
    };

    sns.publish(params, (err, data) => {
        if(err){
            return callback(err);
        }
        console.log("Successfully published to SNS");
        return callback(null);
    });
};