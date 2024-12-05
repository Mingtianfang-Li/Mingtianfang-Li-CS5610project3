const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in the .env.local file.');
    process.exit(1);
}

if (!process.env.JWT_SECRET) {
    console.error('Error: JWT_SECRET is not defined in the .env.local file.');
    process.exit(1);
}

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    });
