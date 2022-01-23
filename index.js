const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ioymr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("carSite");
        const carProducts = database.collection("carProducts");
        const carShopProducts = database.collection("carShop");

        // get api
        app.get('/carProducts', async(req, res) => {
                const cursor = carProducts.find({});
                const tour = await cursor.toArray();
                res.send(tour);


            })
            // get api
        app.get('/carShop', async(req, res) => {
            const cursor = carShopProducts.find({});
            const carShop = await cursor.toArray();
            res.send(carShop);


        })


    } finally {
        //await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`complete successfully at http://localhost:${port}`)
})