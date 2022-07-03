const express = require('express');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require ('dotenv').config();
const MongoServer = process.env.MONGODB_SERVER;


MongoClient.connect(MongoServer, (err, client) => 
{
    if (err) return console.error(err)
    console.log('Connected to MongoAtlast DB')

    const db = client.db('Artist-names')
    const artistCollection = db.collection('artistNames')

    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({ extended: true}))
    app.use(express.static('public'))
    app.use(bodyParser.json())

    app.listen(3000, function() {
        console.log('listening on port 3000')
    })

    app.get('/', (req, res) => {
        
        db.collection('artistNames').find().toArray()
            .then(results => {
                res.render('index.ejs', { artistNames: results })
            })
            .catch(error => console.error(error))
        
        //res.sendFile(__dirname + '/index.html')
    })

    app.post('/artists', (req, res) => {
        // console.log(req.body)
        artistCollection.insertOne(req.body)
            .then(result => {
                // console.log(result)
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })

    app.put('/artistNames', (req, res) => {
        //console.log(req.body);

        artistCollection.findOneAndUpdate(
            { name: 'hi' },
            {
                $set: {
                    name: req.body.name,
                    realName: req.body.realName
                }
            },
            {
                upsert: true
            }
        )
            .then(result => {
                res.json('success')
            })
            .catch(error => console.error(error))
    })

    app.delete('/artistNames', (req, res) => {
        artistCollection.deleteOne(
            { name: req.body.name }
        )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No more Dr. Dre entries to delete')
                }
                res.json('Deleted Dr. Dre entry')
            })
            .catch(error => console.error(error))
    })

    
})

// app.use(bodyParser.urlencoded({ extended: true}))

// app.listen(3000, function() {
//     console.log('listening on port 3000')
// })

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })

// app.post('/artists', (req, res) => {
//     console.log(req.body)
// })