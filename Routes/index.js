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
    const dataProps = Object.keys(data);
    const NewDataObject = {};
    const NewDataObjectDoc = new DataObjects({});
    dataProps.forEach(val => {
        NewDataObjectDoc[val] = data[val];
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
    const objID = req.query.id;
    try {
        const dataObj = await DataObjects.findOne({id: objID}, {_id: 0, __v: 0});
        console.log('dataObj', dataObj);
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