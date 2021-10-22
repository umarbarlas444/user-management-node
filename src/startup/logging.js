const winston = require('winston');

module.exports = function(){
    if(!process.env.NODE_ENV || process.env.NODE_ENV !== 'production'){
        winston.add(
            new winston.transports.Console({
                level: 'info',
                format: winston.format.simple(),
                handleExceptions: true
            })
        );
    }
    winston.add(
        new winston.transports.File({
            filename: 'exceptions.log',
            level: 'error',
            handleExceptions: true
        })
    )

    process.on('unhandledRejection', (ex) => {
        throw ex;
    })
}