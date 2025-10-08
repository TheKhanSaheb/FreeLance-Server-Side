// //server start
// require('dotenv').config()
// const express = require('express');
// const cors = require('cors');
// const app = express()
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Assignment-10 getting hotter')
// });

// app.listen(port, () => {
//     console.log(`Freelance server running at port ${port}`);
// });

// // MONGODB start
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fshzsrc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     //for vercel commented it
//     // await client.connect();
//     // await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB! Db");

//    const jobsCollection = client.db('jobsDB').collection('jobs')
// //post jobs
// app.post('/jobs', async (req, res) => {
//     const newJob = req.body
//     try {
//         const result = await jobsCollection.insertOne(newJob)
//         res.send(result)
//     }
//      catch (error) 
//      {
//         res.status(500).send({ error: 'Failed to insert job' })
//     }
// })

// //get jobs
// app.get('/jobs',async(req,res)=>
// {
//   const cursor =jobsCollection.find();
//   const result =await cursor.toArray()
//   res.send(result)
// })

// app.delete('/jobs/:id', async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: new ObjectId(id) };
//   const result = await jobsCollection.deleteOne(query);
//   res.send(result);
// });


//     app.put("/jobs/:id", async (req, res) => {
//       const id = req.params.id;
//       const updatedJob = req.body;
//       const result = await jobsCollection.updateOne(
//         { _id: new ObjectId(id) },
//         { $set: updatedJob }
//       );
//       res.send(result);
//     });

//     //to get specific

//     app.get("/jobs/:id", async (req, res) => {
//   const id = req.params.id;
//   const job = await jobsCollection.findOne({ _id: new ObjectId(id) });
//   res.send(job);
// });








//   }
  
  
  
  
  
  
  
  
  
  
//   finally {
//     // await client.close();
//   }
// }
// run().catch(console.dir);
// server start
// server start
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ CORS Configuration
const corsOptions = {
  origin: ['https://freelance-3a850.web.app', 'http://localhost:5173'], // allow firebase + local
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Assignment-10 getting hotter');
});

// ✅ MongoDB start
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fshzsrc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect(); // optional for Vercel
    console.log("Pinged your deployment. You successfully connected to MongoDB! Db");

    const jobsCollection = client.db('jobsDB').collection('jobs');

    // POST new job
    app.post('/jobs', async (req, res) => {
      const newJob = req.body;
      try {
        const result = await jobsCollection.insertOne(newJob);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to insert job' });
      }
    });

    // GET all jobs
    app.get('/jobs', async (req, res) => {
      const cursor = jobsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // DELETE a job by ID
    app.delete('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.deleteOne(query);
      res.send(result);
    });

    // PUT (update) job by ID
    app.put('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const updatedJob = req.body;
      const result = await jobsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedJob }
      );
      res.send(result);
    });

    // GET specific job by ID
    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const job = await jobsCollection.findOne({ _id: new ObjectId(id) });
      res.send(job);
    });
  } finally {
    // await client.close(); // optional
  }
}

run().catch(console.dir);

// ✅ Local only: start express normally
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Freelance server running at port ${port}`);
  });
}

// ✅ Vercel: export app for serverless use
module.exports = app;
