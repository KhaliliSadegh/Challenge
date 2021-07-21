const express = require('express');
const app = express();
const port = 3000;
const removeduplicates = require('./Middleware/RemoveDuplicates');

app.get('/', async (req, res) => {
  try{

      const result = await removeduplicates.uniqueflight()
      res.send(result);
  } catch(error) {
      console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Start listening at http://localhost:${port}`)
})
