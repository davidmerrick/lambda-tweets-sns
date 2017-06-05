'use strict'

import TwitterUtils from './utils/TwitterUtils'
import AWS from 'aws-sdk'

exports.handler = async function index(event, context, callback){
    const SNS_TOPIC = process.env.SNS_TOPIC || callback(new Error("Please specify an SNS_TOPIC."));

    let screenName = process.env.SCREEN_NAME;
    let allTweets = await TwitterUtils.getTweets(screenName);
    allTweets = TwitterUtils.filterOutRetweets(allTweets);
    const sns = new AWS.SNS();
    let params = {
        Message: allTweets,
        Subject: "New Tweets",
        TopicArn: SNS_TOPIC
    };

    sns.publish(params, context.done);
    return callback(null);
};