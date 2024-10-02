/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: _____Rajesh Sah_________________ Student ID: ___175281211___________ Date: __2024 Oct 02nd____________
*
********************************************************************************/

const express = require('express');
const path = require('path');
const legoData = require('./modules/legoSets');
const fs = require('fs').promises;

const app = express();
const port = 3000;

legoData.initialize()
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Assignment 2: Rajesh Sah - 175281211');
    });

    app.get('/lego/sets', (req, res) => {
      legoData.getAllSets()
        .then(sets => {
          res.json(sets);
        })
        .catch(error => {
          res.status(404).send('Error: Failed to get all sets.');
        });
    });

    app.get('/lego/sets/num-demo', (req, res) => {
        const setNum = '05-1'; 
        legoData.getSetByNum(setNum)
          .then(set => {
            if (set) {
              res.json(set);
            } else {
              res.status(404).send('Error: Set not found.');
            }
          })
          .catch(error => {
            res.status(404).send('Error: Failed to get set by number.');
          });
    });
    
    app.get('/lego/sets/theme-demo', (req, res) => {
        const theme = 'Service Packs'; 
        legoData.getSetsByTheme(theme)
          .then(sets => {
            if (sets.length > 0) {
              res.json(sets);
            } else {
              res.status(404).send('Error: No sets found for the theme.');
            }
          })
          .catch(error => {
            res.status(404).send('Error: Failed to get sets by theme.');
          });
    });
    
    // Handle 404 errors
    app.use((req, res, next) => {
      res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    });

    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });

  })
  .catch(error => {
    console.error('Error initializing Lego data:', error);
  });
