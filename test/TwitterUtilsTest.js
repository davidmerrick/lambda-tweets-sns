import TwitterUtils from '../src/utils/TwitterUtils'

async function test(){
    let tweets = await TwitterUtils.getTweets("realDonaldTrump");
    console.log(tweets);
}

test();