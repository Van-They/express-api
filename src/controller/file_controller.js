function uploadFileRes(req, res) {
    if (!req.file) {
        res.sendStatus(400, 'No files were uploaded.')
        return;
    }
    res.sendStatus(200, 'File uploaded successfully. ' + req.file.originalname)
}


module.exports.uploadFileRes = uploadFileRes