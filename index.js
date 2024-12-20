const express = require('express');
const { exec } = require('child_process');
const cors = require('cors')
const app = express();
app.use(cors())
app.get('/traceroute', (req, res) => {
    const ipAddress = req.query.target; // Replace with a dynamic parameter if needed
    const command = ` traceroute  ${ipAddress}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`Error in traceroute: ${stderr}`);
            return res.status(400).json({ error: stderr });
        }
        res.status(200).send(stdout);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
