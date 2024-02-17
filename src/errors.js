const validateError = (err, imgPath) => {
    if (err.name === "InvalidExtensionError") {
        return 'This is not a valid image file. Please choose one of the following: .jpg, .jpeg, .png';
    } else if (err.name === "PathError") {
        return `This image file is not exists: ${imgPath}`;
    }
}

const evaluateError = (err, imgPath) => {
    if (err.name === "TimeoutError") {
        return `Evaluation of image: ${imgPath} has timed out`;
    } else if (err.name === "AbortError") {
        return `Evaluation of image: ${imgPath} has been aborted`;
    } else {
        return `Evaluation of image: ${imgPath} has failed`;
    }
}

const connectionError = () => {
    return 'Database connection failed';
}

const insertError = () => {
    return 'Insertion of data failed';
}

module.exports = {
    validateError,
    evaluateError,
    connectionError,
    insertError
}