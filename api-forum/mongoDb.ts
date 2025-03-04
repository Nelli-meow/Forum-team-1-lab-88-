import {Db, MongoClient} from 'mongodb';
let db: Db;
let client: MongoClient;

const connect = async () => {
    client = await MongoClient.connect('mongodb://localhost');
    db = client.db('forum');
};

const disconnect = async () => {
    await client.close();
};

const mongoDb = {
    connect,
    disconnect,
};

export default mongoDb;