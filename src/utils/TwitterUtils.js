import Twitter from 'twitter'

class TwitterUtils {

    static getTweets(screenName){
        return new Promise((resolve, reject) => {
            let client = new Twitter({
                consumer_key: process.env.CONSUMER_KEY,
                consumer_secret: process.env.CONSUMER_SECRET,
                access_token_key: process.env.ACCESS_TOKEN_KEY,
                access_token_secret: process.env.ACCESS_TOKEN_SECRET
            });

            let params = {
                screen_name: screenName,
                include_rts: false // Exclude retweets
            };
            client.get(`statuses/user_timeline`, params, (err, tweets, response) => {
                if(err){
                    return reject(err);
                }
                return resolve(tweets);
            });
        });
    }
}

export default TwitterUtils