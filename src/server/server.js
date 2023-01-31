const express = require('express');
const cors = require('cors');

const app = express()
const port = 8000

app.use(cors());

app.get('/fake-api', (req, res) => {
    const id = req.query.id;
    console.log(`Received id: ${id}`);
    sleep().then(() => {
        console.log("Returning response")
        res.status(200).json({
            message: "OK",
            myData: id
        });
    }).catch((err) => {
        res.status(500).json({
            error: err.message
        })
    })
})

app.listen(port, () => {
    console.log(`Fake API listening on port ${port}`)
})

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function sleep() {
    console.log("Going to sleep")
    const sec = 2;
    await delay(sec * 1000);
    console.log(`Slept for ${sec}s`);
}
