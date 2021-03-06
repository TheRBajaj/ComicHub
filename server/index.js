const express = require('express');
const path = require('path');
const axios = require("axios");
const app = express();
const port = process.env.PORT || 5000;


//get request for random comic
app.get('/random', (req, res) => {
  const max = 2471;
  const min = 1;
  //generate random valid num for comic
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  //get random URL for comic
  const url = "http://xkcd.com/"+randomNum+"/info.0.json";
  
  //get JSON data for comic
  axios.get(url)
    .then( (response) => {
      res.status(200).send(response.data);
    })
    .catch( (err) => {
      res.status(404).send({
        status: 404,
        message: err
      })
    });
});
//get request for specific comic given id
//'/:id(\\d+$)'
app.get('/:id', (req, res) => {

  const id = req.params.id;
  const url = "http://xkcd.com/"+id+"/info.0.json";
  
  axios.get(url)
    .then( (response) => {
      res.status(200).send(response.data)
    })
    .catch( (err) => {
      res.status(404).send({
        status: 404,
        message: id
      })
    });
});


//heroku custom variable
if (process.env.NODE_ENV === 'production'){
  app.use(express.static('../client/build'));
}

// app.get('*', (request, response) => {
// 	response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

if (process.env.NODE_ENV === "production" || true) {
	app.get('*', function(req, res) {
		res.sendFile('index.html', { 
			root: path.join(__dirname, '../client/build/')
		});
	});
}

app.listen(port, () => {
  console.log(`Express Server listening at port:${port}`);
})