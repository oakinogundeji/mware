# Nodejs Middleware

## Description: 

This middleware app exposes a set of endpoints which allow storage of data objects to a mongodb datastore and retrieval of those same objects.

### How it works: 

After the app is installed locally or deployed remotely, 2 endpoints will be available (more on this later), one endpoint for saving data, and the other endpoint to retrieve data.

1. **Internals**: There are 4 major modules making up this middleware *server.js*, *app.js*, *Routes/index.js*, and *models/dataObjects.js*. 
- The purpose of *server.js* is to initialize the app by first ensuring a stable connection to a **mongodb datastore** (with connection URI provided via environment variables) and then binding the http server to **port 3030** on **localhost**. To handle connections, the server delegates to an *express js* application server module in *app.js*.
- The purpose of *app.js* is to handle **GET** and **POST** requests through *route handlers* defined in *Routes/index.js* module. The Express App has been configured for security and performance with a standards based middleware stack. This module exposes a */test* endpoint to confirm that all is well post deployment or installation.
- This middleware uses *mongoose* as an **ORM** to interface with *mongodb* allowing the app to leverage the benefits of strong tytping, indexing and some built in validation. THe data model is defined in the *models/dataObjects.js* module using a *mongoose* schema. In *mongoose* SChemas are compiled to Models (the actual class which is instantiated with data and converted to documents for storage on mongodb). Models are compiled by defining the *collection* name (in this case 'DataObject' which will be automatically converted by mongodb into 'dataobjects') and identifying the Schema which will be used (in this case DataObjectSchema). The data model leverages the *unique* indexing method which is built into *mongoose*/*mongodb* and reduces search time from *O(n)* to *O(logn)* i.e. indexing makes for faster and more efficient searching on the indexed field. The index is defined againt the *id* field of the Schema. A sample of the data object is included as *obj.json*

2. **API Endpoints**: The *Routes/index.js* module provides handlers for the **GET** and **POST** endpoints. All data into and out of the middleware is expected to be **JSON**.
- **GET /getData**: This endpoint expects a query string with an *id* field containing an *id* value in order to retrieve the associated document from the mongodb datastore. The retrieved document has been sanitised to remove *mongodb* specific identifiers which is a security measure to reduce the targetable footprint of the middleware. An **HTTP 200** response will be provided and the return data is of the format:

`
{
            msg: 'retrieve success',
            data: dataObj
        }
`
If an **invalid** *id* is provided, the middleware will respond with an **HTTP 404** response and message indicating that the *id* does not exist and a *null* object. The return data is of the format:
`
{
                msg: `data with id: ${objID} does NOT exist, please confirm the correct ID. Thank you.`,
                data: dataObj
            }
`
If for some reason an internal server error occurs when attempting to retrieve the document, the middleware will respond with an **HTTP 500** status and data of the format:
`{
            msg: 'there was an internal server error retrieving the data, please try again later or contact the service provider. THank you',
            data: err
        }
`
- **POST /saveData'**: This endpoint expects a *x-www-form-urlencoded* *POST* request sending a data object of the form shown in *sample-payload.json* file. The only absolutely required field is the *id* field which is used internally by the middleware to build the index on the *mongodb* datastore. If the data is saved without errors, the middleware will respond with an **HTTP 200** status and the *id* of the saved object whuch should match the *id* of the posted data, the response data is of the format:
`{
            msg: 'save success',
            data: NewDataObjectDoc.id
        }
`
If the *id* field is omitted on the data object to be saved, the middleware will respond with an **HTTP 404** status and a message of the format:
`
{
            msg: 'there was an error saving the data, please ensure that the "id" attribute is present. Thank you'
        }
`
If there are issues with the type formats on the data object e.g. strings used where numbers are expected etc, or if the same object is tried to save more than once (i.e. a data object with an identical *id* attribute) then the middleware responds with an **HTTP 404** status with a helpful error object, the response data is of the format: 
`{
            msg: 'there was an error saving the data, please ensure all field values are of the correct data type, or ensure that the "id" attribute is unique. Thank you',
            data: err
        }
`

### Useage:

1. **Local Installation**: To install this middleware locally follow these steps:
- clone from repo
- run `npm i` to install all modules and dependencies
- create a *.env* file in the project root directory e.g. `touch .env`**NB** the *.env* file must be created in the same directory where `npm i` is executed.
- define a *dBURL* varianble in the *.env* file. This variable identifies the *mongodb* datastore to use. If a local mongodb datastore is being used, then use *dBURL=`mongodb://localhost:27017`*. If a remote mongodb datatore is being used *dBURL* will look like *dBURL=`mongodb+srv://<databasename>:<password>@cluster0.pnhl5eq.mongodb.net/?retryWrites=true&w=majority`* **NB** the local mongodb instance does not use this format since there is a default database used and since the instcnae is running locally, no form of authentication is required.
- run `npm start` this will start up the middleware. Please ensure that no other process is running on port **3030**
2. **API Calls**: After starting up the middleware, the endpoints can be tested using the sample data in *sample-payload.json* or any compatible data object