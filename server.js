const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();
const app = express();

// Files imports
const connectDB = require('./config/db');

// DataBase Connect
connectDB();

const authRoutes = require('./routes/authRoute');

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/v1/auth', authRoutes);


// API's
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to my APP',
    });
});

// Server Connection
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.MODE} at PORT ${PORT}`);
});
