/*
  dependencies
 */

  const express = require('express')
  const admin = require('firebase-admin');

  /*
  config - express
  */
 const app = express()
 const port = 3000
 
  /*
  config - firebase
  */
  
  let serviceAccount = require('./serviceAccountKey.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  let db = admin.firestore();
 
 /*
 endpoints
 */
  app.get('/', (request, response) => {
    response.send('I love Node so hard, it hurts!')
    console.log('/ endpoint is working! fine')
  })

  app.get('/posts', (request, response) => {
    let posts = [
      {
        'caption' : 'Golden Gate Bridge',
        'location' : 'San Francisco, United States!'
      },
      {
        'caption' : 'London Eye',
        'location' : 'London, United Kingdom.'
      }
    ]

    response.send(posts)
  })


/*
  listen
 */
  app.listen(process.env.PORT || port)

