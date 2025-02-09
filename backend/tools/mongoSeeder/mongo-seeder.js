// This is a seeder tool to have a ready db for dev
const { join } = require('path')
require('dotenv').config({ path: join(__dirname, '../../../build/.env.dev') })
const { MongoClient, ObjectId } = require('mongodb')
console.log(process.env.DOCKER_MONGO_URL)
const uri = process.env.DOCKER_MONGO_URL
const dbName = process.env.DB_NAME
const userCollectionName = process.env.USER_COLLECTION_NAME
const jobCollectionName = process.env.JOB_COLLECTION_NAME
const workerCollectionName = process.env.WORKER_COLLECTION_NAME
const users = [
    {
        _id: new ObjectId('6794b529152453d3b6091fc7'),
        fullName: 'George Tsatsaris',
        email: 'tsatsa@gmail.com',
        password:
            '$2a$10$2Df9Yh1jK6CzU7qvI9/sNOoyNTBW7COULOvOxSvaqEWxv2.yYT2HS',
    },
]

const workers = [
    {
        userID: new ObjectId('6794b529152453d3b6091fc7'),
        title: 'Farmer',
        firstName: 'George',
        lastName: 'Tsatsaris',
        location: 'Thessaloniki, Macedonia and Thrace, Greece',
        skills: ['equipment'],
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
        userID: new ObjectId('6794b529152453d3b6091fc8'),
        title: 'Lugger',
        firstName: 'Cedi',
        lastName: 'Osman',
        location: 'Thessaloniki, Macedonia and Thrace, Greece',
        skills: ['equipment'],
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
        userID: new ObjectId('6794b529152453d3b6091fc9'),
        title: 'Workaholic',
        firstName: 'Giannis',
        lastName: 'Antetokoumpo',
        location: 'Thessaloniki, Macedonia and Thrace, Greece',
        skills: ['equipment'],
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
        userID: new ObjectId('6794b529152453d3b6091fd1'),
        title: 'Farmer',
        firstName: 'Kendrick',
        lastName: 'Nunn',
        location: 'Athens, Attica, Greece',
        skills: ['equipment'],
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
        userID: new ObjectId('6794b529152453d3b6091fd2'),
        title: 'Farmer',
        firstName: 'Kostas',
        lastName: 'Sloukas',
        location: 'Athens, Attica, Greece',
        skills: ['equipment', 'harvesting'],
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
        userID: new ObjectId('6794b529152453d3b6091fd3'),
        title: 'Farmer',
        firstName: 'Nikos',
        lastName: 'Kardivourkos',
        location: 'Athens, Attica, Greece',
        skills: ['equipment', 'lugging'],
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
        userID: new ObjectId('6794b529152453d3b6091fd3'),
        title: 'Farmer',
        firstName: 'Menelaos',
        lastName: 'Kardivourkos',
        location: 'Athens, Attica, Greece',
        skills: ['equipment', 'lugging'],
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
        userID: new ObjectId('6794b529152453d3b6091fd3'),
        title: 'Farmer',
        firstName: 'Ergin',
        lastName: 'Ataman',
        location: 'Athens, Attica, Greece',
        skills: ['equipment', 'lugging'],
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
        userID: new ObjectId('6794b529152453d3b6091fd3'),
        title: 'Farmer',
        firstName: 'Giorgos',
        lastName: 'Bartzokas',
        location: 'Athens, Attica, Greece',
        skills: ['equipment', 'lugging'],
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
]

const jobs = [
    {
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        company: 'Tsatsaris Co',
        location: 'Korinthias, Cyprus, Cyprus',
        datePosted: {
            $date: '2025-01-25T10:08:56.724Z',
        },
        userID: new ObjectId('6794b529152453d3b6091fc7'),
        salary: null,
    },
    {
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        company: 'Tsatsaris Co',
        location: 'Korinthias, Cyprus, Cyprus',
        datePosted: {
            $date: '2025-01-25T10:08:56.724Z',
        },
        userID: new ObjectId('6794b529152453d3b6091fc7'),
        salary: null,
    },
    {
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        company: 'Tsatsaris Co',
        location: 'Korinthias, Cyprus, Cyprus',
        datePosted: {
            $date: '2025-01-25T10:08:56.724Z',
        },
        userID: new ObjectId('6794b529152453d3b6091fc7'),
        salary: null,
    },
    {
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        company: 'Tsatsaris Co',
        location: 'Thessaloniki, Macedonia and Thrace, Greece',
        datePosted: {
            $date: '2025-01-25T10:08:56.724Z',
        },
        userID: new ObjectId('6794b529152453d3b6091fc7'),
        salary: null,
    },
    {
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        company: 'Tsatsaris Co',
        location: 'Thessaloniki, Macedonia and Thrace, Greece',
        datePosted: {
            $date: '2025-01-25T10:08:56.724Z',
        },
        userID: new ObjectId('6794b529152453d3b6091fc7'),
        salary: null,
    },

    {
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        company: 'Tsatsaris Co',
        location: 'Thessaloniki, Macedonia and Thrace, Greece',
        datePosted: {
            $date: '2025-01-25T10:08:56.724Z',
        },
        userID: new ObjectId('6794b529152453d3b6091fc7'),
        salary: null,
    },
    {
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        company: 'Tsatsaris Co',
        location: 'Korinthias, Cyprus, Cyprus',
        datePosted: {
            $date: '2025-01-25T10:08:56.724Z',
        },
        userID: new ObjectId('6794b529152453d3b6091fc7'),
        salary: null,
    },
    {
        title: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        company: 'Tsatsaris Co',
        location: 'Korinthias, Cyprus, Cyprus',
        datePosted: {
            $date: '2025-01-25T10:08:56.724Z',
        },
        userID: new ObjectId('6794b529152453d3b6091fc7'),
        salary: null,
    },
    {
        title: 'Corinth Farmers',
        description: 'I need 4 good Farmers.',
        company: 'Tsatsaris Co',
        location: 'Korinthias, Cyprus, Cyprus',
        datePosted: {
            $date: '2025-01-25T10:08:56.724Z',
        },
        userID: new ObjectId('6794b529152453d3b6091fc7'),
        salary: null,
    },
]

const client = new MongoClient(uri)

const seedDatabase = async () => {
    try {
        await client.connect()
        console.log('Connected to MongoDB')

        const db = client.db(dbName)
        const usersCollection = db.collection(userCollectionName)
        const jobCollection = db.collection(jobCollectionName)
        const workerCollection = db.collection(workerCollectionName)

        await usersCollection.deleteMany({})
        console.log('Existing users removed.')
        await jobCollection.deleteMany({})
        console.log('Existing jobs removed.')
        await workerCollection.deleteMany({})
        console.log('Existing workers removed.')

        // Insert new data
        await usersCollection.insertMany(users)
        console.log('Seed users data added successfully.')
        await jobCollection.insertMany(jobs)
        console.log('Seed jobs data added successfully.')
        await workerCollection.insertMany(workers)
        console.log('Seed workers data added successfully.')
    } catch (error) {
        console.error('Seeding error:', error)
    } finally {
        await client.close()
        console.log('Database connection closed.')
    }
}

seedDatabase()
