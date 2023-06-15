// Orad Dostra : 208939736
// Niv Vardi: 209083278

const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const schemas = require('./schema');
const generateRandomId = require('./utils')
const User = schemas.User;
const Cost = schemas.Cost;



router.get('/', (req, res) => {
    res.send('Welcome to costs API');
});


router.post('/addcost', async (req, res) => {
    const { user_id, year, month, day, description, category, sum } = req.body;
  
    try {
      const newCost = new Cost({
        user_id,
        year,
        month,
        day,
        id: generateRandomId(),
        description,
        category,
        sum,
      });

      const existingUser = await User.findOne({ id: user_id });
      if (!existingUser) {
          return res.status(404).json({ error: 'User not found' });
      }
      
      const validationError = newCost.validateSync();
      if (validationError) {
        const errorMessages = Object.values(validationError.errors).map(error => error.message);
        return res.status(400).json({ errors: errorMessages });
      }

      const savedCost = await newCost.save();
      res.json(savedCost);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add the cost item' });
    }
  });
  

router.get('/report', async (req, res) => {
    let { user_id, year, month } = req.query;
    
    user_id = parseInt(user_id)
    year = parseInt(year)
    month = parseInt(month)

    const existingUser = await User.findOne({ id: user_id });
      if (!existingUser) {
          return res.status(404).json({ error: 'User not found' });
      }

    try {
      const costs = await Cost.find({ user_id, year, month });
  
      const report = {
        food: [],
        health: [],
        housing: [],
        sport: [],
        education: [],
        transportation: [],
        other: []
      };
  
      costs.forEach(cost => {
        const { category } = cost;
        if (report.hasOwnProperty(category)) {
          report[category].push({
            day: cost.day,
            description: cost.description,
            sum: cost.sum
          });
        } else {
          report.other.push({
            day: cost.day,
            description: cost.description,
            sum: cost.sum
          });
        }
      });
  
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate the cost report' });
    }
  });
  
  

router.get('/about', (req, res) => {
    const developers = [
      { firstname: 'Niv', lastname: 'Vardi', id: 209083278, email: 'nvardi24@gmail.com' },
      { firstname: 'Orad', lastname: 'Dostra', id: 208939736, email: 'orad88@gmail.com' },
    ];
  
    res.json(developers);
  });

  module.exports = router;
