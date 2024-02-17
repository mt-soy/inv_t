const fetch = require('node-fetch');
const { AbortController } = require('abort-controller');

const validatePath = (pathStr) => {
    const extensions = /\.(jpg|jpeg|png)$/i;

    if (!extensions.test(pathStr))
        return new Error('InvalidExtensionError');

    return null
}

const getTimestamp = () => {
    const date = new Date().toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo', hour12: false});
    return date.replace(/\//g, '-')
}

// test data
const successJson = {
    'success': true,
    'message': 'Image has been evaluated successfully',
    'estimated_data': {
        'class': 3,
        'confidence': 0.8333
    }
}
// test data
const failureJson = {
    'success': false,
    'message': 'Failed to evaluate image',
    'estimated_data': {}
}

const evaluateImageByAI = async (pathStr) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(process.env.AI_URI, {
            method: 'POST',
            body: JSON.stringify({'image_path': pathStr}),
            headers: {'Content-Type': 'application/json'},
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error('EvalError');
        }

        const data = await response.json();

        // test data
        // const data = successJson;

        data['response_timestamp'] = getTimestamp();

        return data;
    } catch (err) {
        console.error('Error: ', err);
        return err;
    } finally {
        clearTimeout(timeout);
    }
}

const formatData = (data, imgPath) => {
    const {success, message, request_timestamp, response_timestamp, estimated_data} = data;
    const formattedData = {
        image_path: imgPath,
        success,
        message,
        request_timestamp,
        response_timestamp
    }

    if (data.success) {
        return {
            ...formattedData,
            'class': estimated_data.class,
            'confidence': estimated_data.confidence,
        }
    } else {
        return {
            ...formattedData,
            'class': null,
            'confidence': null,
        }
    }
}

module.exports = {
    getTimestamp,
    validatePath,
    evaluateImageByAI,
    formatData
};