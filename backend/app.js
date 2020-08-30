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
    let posts = [];

    db.collection('posts').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      
      response.send(posts)
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
        

  })


/*
  listen
 */
  app.listen(process.env.PORT || port)

