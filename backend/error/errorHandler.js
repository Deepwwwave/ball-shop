export const errorHandler = (err, req, res, next) => {
    console.log('ERROR', err);
    console.log('err.code');
    res.json({
        status: 500,
        msg: "Spotted error "
    });
}