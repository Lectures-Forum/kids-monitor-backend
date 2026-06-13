const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let deviceLogs = []; 

app.post('/api/log', (req, res) => {
    const { deviceName, appOpened } = req.body;
    deviceLogs.push({
        id: Date.now(),
        deviceName: deviceName || 'Unknown',
        appOpened: appOpened || 'Unknown App',
        timestamp: new Date().toISOString()
    });
    if(deviceLogs.length > 100) deviceLogs.shift(); 
    res.status(200).json({ message: 'تم الاستلام' });
});

app.get('/api/logs', (req, res) => {
    res.status(200).json(deviceLogs);
});

// المنصات السحابية تستخدم process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`الخادم يعمل على منفذ ${PORT}`);
});
