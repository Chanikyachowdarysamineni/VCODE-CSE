// Simple test to check if MongoDB has any participant data
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const participantSchema = new mongoose.Schema({}, { strict: false });

const runTest = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB\n');

    const db = mongoose.connection.db;
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log('Collections in database:');
    collections.forEach(col => console.log(`  - ${col.name}`));

    // Count documents in key collections
    console.log('\nDocument counts:');
    const collections_to_check = [
      'codinghunts',
      'codingchallenges', 
      'presenterpresentations',
      'technicalquizzes',
      'sports',
      'hackathons'
    ];

    for (const colName of collections_to_check) {
      try {
        const count = await db.collection(colName).countDocuments();
        console.log(`  ${colName}: ${count}`);
        
        if (count > 0) {
          const sample = await db.collection(colName).findOne();
          console.log(`    Sample: ${JSON.stringify(sample).substring(0, 100)}...`);
        }
      } catch (err) {
        console.log(`  ${colName}: Error - ${err.message.substring(0, 50)}`);
      }
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err.message);
  }
};

runTest();
