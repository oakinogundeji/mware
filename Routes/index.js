'use strict';
/**
 * Module Dependencies
 */
const
    express = require('express'),
    Router = express.Router(),
    DataObjects = require('../models/dataObjects');

/**
 * Route to save Data
 */
Router.post('/saveData', async (req, res) => {
    const data = req.body;
    console.log('data to save:', data);
    const NewDataObjectDoc = new DataObjects({
        data
    });
    try {
        await NewDataObjectDoc.save();
        return res.status(200).json({
            msg: 'save success',
            data: NewDataObjectDoc.id
        });
    }
    catch (err) {
        console.log('err saving data', err);
        return res.status(500).json({
            msg: 'there was an error saving the data',
            data: err
        });
    }
});

/**
 * Route to retrieve Data
 */
Router.get('/getData', async (req, res) => {
    const objID = req.body.id;
    try {
        const dataObj = await DataObjects.findOne({id: objID}, {_id: 0});
        return res.status(200).json({
            msg: 'retrieve success',
            data: dataObj
        });
    }
    catch (err) {
        return res.status(500).json({
            msg: 'there was an error retrieving the data',
            data: err.errors.data.properties
        });
    }
});
/**
 * Export Router
 */
module.exports = Router;