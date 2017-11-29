module.exports = {
    jwt: {
        secret: "fashion-pecs@MTWLabsinfo@mtwlabs.com"
        // options: {expiresIn: 60 * 60 * 24} // 1 day
    },
    mongo:{
        url: 'mongodb://localhost/node-demo'
    },
    bodyParserLimit: '50mb',
    port:5000
};
