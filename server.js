//Install express server
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const authRoute = require("./routes/authRoute");

const app = express();

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200
};

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('connected to mongodb');
    }
})

app.use(cors(corsOptions));
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/ZodFront'));
app.use(bodyParser.json());
app.use("/api/user", authRoute);

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname + '/dist/ZodFront/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(keys.port,  () => console.log(`app listening on port ${keys.port}!`));