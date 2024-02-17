const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const multer = require('multer');
const {db, insertData} = require('./db');
const {validatePath, evaluateImageByAI, formatData, getTimestamp} = require('./logic');
const {validateError, evaluateError, connectionError, insertError} = require("./errors");

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({storage: multer.memoryStorage()});


app.route('/image_evaluation')

    .get( (req, res) => {
        console.log('Health check OK');
        res.status(200).send('Server is running!');
    })

    .post(upload.single('image'), async (req, res) => {
        try {
            console.log('Received POST request', req.file);
            const imgPath = req.file.originalname;

            const valid = validatePath(imgPath);
            if (valid instanceof Error) {
                const errMsg = validateError(valid, imgPath);
                res.status(400).send(errMsg);
                return;
            }

            const reqTime = getTimestamp();

            const evalRes = await evaluateImageByAI(imgPath);
            if (evalRes instanceof Error) {
                const errMsg = evaluateError(evalRes, res, imgPath);
                res.status(500).send(errMsg);
                return;
            }

            evalRes['request_timestamp'] = reqTime;
            const formattedData = formatData(evalRes, imgPath);

            const connection = await db();
            if (connection === null) {
                const errMsg = connectionError(null, res);
                res.status(500).send(errMsg);
                return;
            }

            const results = await insertData(connection, formattedData);
            if (results instanceof Error) {
                const errMsg = insertError(results, res);
                res.status(500).send(errMsg);
                return;
            }

            res.status(200).send('Successfully uploaded your image evaluation on DB');
        } catch (err) {
            console.error('Error: ', err);
            res.status(500).send('Internal server error');
        }
    })

app.listen(port, () => {
    console.log(`listening to localhost:${port}`);
});