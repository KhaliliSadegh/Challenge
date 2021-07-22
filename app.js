const express = require('express');
const redis = require("redis");
const app = express();
const port = 3000;
const removeDuplicates = require('./Middleware/removeDuplicates');
const asyncMiddleware = require('./Middleware/async');

const redisPort = 6379
const client = redis.createClient(redisPort);


/**
 * regular execution
 */
app.get('/', asyncMiddleware(async (req, res) => {
    const result = await removeDuplicates.getFlights()
    res.send(result);
}));



/**
 * implementation of Redis for cache data and response time < 1s
 */
app.get("/cache", (req, res) => {
   
    try {
        const searchTerm = '';
        client.get(searchTerm, async (err, result) => {
            if (err) throw err;
    
            if (result) {
                res.status(200).send({
                    data: JSON.parse(result),
                    message: "data retrieved from the redis cache"
                });
            }
            else {
                const result = await removeDuplicates.getFlights()
                if(result){
                client.setex(searchTerm, 60, JSON.stringify(result));
                res.status(200).send({
                    data: result,
                    message: "cache miss"
                });}
            }
        });
    } catch(err) {
        res.status(500).send({message: err.message});
    }
});


app.listen(port, () => {
    console.log(`Start listening at http://localhost:${port}`)
})


module.exports=app;