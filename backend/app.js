/*
  dependencies
 */

  const express = require('express')
  const admin = require('firebase-admin');
  let inspect = require('util').inspect;
  let Busboy =  require('busboy');

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

  // Get all posts

  app.get('/posts', (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    let posts = [];

    db.collection('posts').orderBy('date','desc').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      
      response.send(posts)
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
        

  })

  // Create post

  app.post('/posts', (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    let busboy = new Busboy({ headers: request.headers });

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      });
    });

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });

    busboy.on('finish', function() {
      console.log('Done parsing form!');
      // response.writeHead(303, { Connection: 'close', Location: '/' });
      response.send('Done parsing form!');
    });

    request.pipe(busboy);

       

  })


/*
  listen
 */
  app.listen(process.env.PORT || port)

