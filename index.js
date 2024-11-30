const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://iftekarrahmanruhit2003:hpBltpbBjgSnkQkO@cluster0.iofbf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Send a ping to confirm a successful connection

    const database = client.db("userDB");
    const userCollection = database.collection("users");

    app.get('/users', async(req,res)=>{
        const cursor = userCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })


    app.post('/users', async(req,res)=>{
        const user= req.body;
        console.log('new user',user)
        const result = await userCollection.insertOne(user);
        res.send(result)
    })

    app.delete('/users/:id', (req, res)=>{
      const id = req.params.id;
      console.log('Delete from database',id)
      
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/',(req,res)=>{
    res.send('SIMPLE CRUD IS RUNNING')
})

app.listen(port,()=>{
    console.log(`Simple crud is running ${port}`)
})