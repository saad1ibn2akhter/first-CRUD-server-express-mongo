const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
// saadealif2010
// bJ9oVoxaeqommylM


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://saadealif2010:bJ9oVoxaeqommylM@cluster0.atq5qlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("insertDB").collection("haiku");
        // const haiku = database.collection("haiku");

        app.get('/users', async (req, res) => {
            const cursor = database.find(); 
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log("new user details : ", user);
            const result = await database.insertOne(user);
            res.send(result);
            console.log(`a new user added . ID : ${result.insertedId}`);
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // experiment from the mongo community

        // await client.close();  ## experiment
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("CRUD server running succesfuly !!");
})


app.listen(port, (req, res) => {
    console.log(`server running on port : ${port}`);
})