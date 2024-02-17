const mysql = require('mysql2/promise')

const db = async () => {
    try {
        const connection = await mysql.createConnection({
            host: `${process.env.DB_HOST}`,
            user: `${process.env.DB_USER}`,
            password: `${process.env.DB_PASSWORD}`,
            database: `${process.env.DB_NAME}`
        });

        return connection;
    } catch (err) {
        console.error('Error: ', err);
        return null;
    }
}

const insertData = async (connection, data) => {
    const query = 'INSERT INTO ai_analysis_log (image_path, success, message,' +
        ' class, confidence, request_timestamp, response_timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [data.image_path, data.success, data.message, data.class, data.confidence, data.request_timestamp, data.response_timestamp];

    try {
        const [ results ] = await connection.execute(query, values);

        if (results.affectedRows !== 1) {
            return new Error('InsertError');
        }

        return results;
    } catch (err) {
        console.error('Error: ', err);
        return err;
    }
}



module.exports = {
    db,
    insertData
}