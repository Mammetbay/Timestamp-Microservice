const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/timestamp", function (req, res) {
  const timestamp = req.query.timestamp;
  const text = req.query.text || "";

  let date;

  if(timestamp) {
    date = new Date(parseInt(timestamp)*1000); // Unix
    if(isNaN(date.getTime())) {
      return res.status(400).send("Invalid timestamp")
    }
  } else {
    date = new Date();
  }

  const formattedDate = date.toLocaleDateString() + " " + date.toLocaleTimeString()
  const formattedText = text ? ` - ${text}` : "";

  res.send({
    unix: date.getTime() / 1000,
    utc: formattedDate,
    text: formattedText
  })
});



var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
