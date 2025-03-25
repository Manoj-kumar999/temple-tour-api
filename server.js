const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// SQL Server Connection (Windows Authentication)
const config = {
    server: 'DESKTOP-XXXXXX',  // Replace with your SQL Server name
    database: 'TempleTourDB',
    options: {
        trustedConnection: true,
        encrypt: true,
        trustServerCertificate: true
    }
};

// API: Test Connection
app.get('/', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        res.json({ success: true, message: "Connected to SQL Server!" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
