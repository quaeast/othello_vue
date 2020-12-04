module.exports = {
    devServer: {
        port: 8080,
        proxy: {
            "/api": {
                target: "http://localhost:5000",
                pathRewrite:{
                    '^/api':""
                }
            }
        }
    }
};
