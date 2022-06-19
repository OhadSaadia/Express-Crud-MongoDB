
import express from "express";
import bodyParser from"body-parser";
import { MongoClient } from "mongodb";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.set('view engine' , 'ejs');

async function main() {
    
    const myDb = await connectToDB();

    const myCollection = myDb.collection('idiums');


    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(bodyParser.json());

    app.get('/', async (req, res) => {
        try {
            const idiums = await myCollection.find().toArray();
            res.render('index', {quotes:idiums});
        } catch (error) {
            console.error(error);
        }



        res.sendFile(__dirname + '\\index.html');
    });

    app.post('/quotes',async (req, res) => {
        
        try {
            console.log(req.body);
            await myCollection.insertOne(req.body);
            res.redirect('/');
        } catch (error) {
            console.error(error);
        }
    })

    app.put('/quotes', async (req,res) => {
        try {
            console.log(req.body)
            await myCollection.findOneAndUpdate(
                { name: "Annie"},
                { $set: {
                            name: req.body.name,
                            quote: req.body.quote
                        }
                },
                {upsert:true}
            );
            res.status(200).send('OK');
            
        } catch (error) {
            console.error(error);
        }
    });

    app.delete('/quotes' , async (req,res) => {
        try {
            await myCollection.deleteOne({name:req.body.name});
            res.json('success');
        } catch (error) {
            console.error(error);
        }
    })

    app.listen(3000, () => {
        console.log("Server is listening on port 3000..");
    });



}


async function connectToDB() {
    try {
        const client = await MongoClient.connect("mongodb://localhost:27017");
        console.log("Connected to DB..");
        let db = await client.db('quotes');
        return db;
    } catch (error) {
        console.log(error);
    }

}

main();