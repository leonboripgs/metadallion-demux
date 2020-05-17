const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const demux = require('./services/demux');
const io = require('./utils/io');
const router = require('./router');

let app = express();

// let express server use important libraries
// for JSON, logging, etc...
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({
  extended: true
}));

router(app);
const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
  console.log('Server listening on port:', port)
});
io.connect(server);
demux.watch();
