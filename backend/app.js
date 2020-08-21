/*
  dependencies
 */

const express = require('express')

/*
  config - express
 */
const app = express()
const port = 3000


/*
  endpoints
 */
app.get('/', (request, response) => {
  response.send('Hello World!')
})


/*
  listen
 */
app.listen(port)

