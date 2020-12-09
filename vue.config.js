// module.exports = {
//     devServer: {
//         port: 8080,
//         proxy: {
//             "/api": {
//                 target: "http://47.240.25.164:5000",
//                 pathRewrite:{
//                     '^/api':""
//                 }
//             }
//         }
//     }
// };

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/othello/'
        : '/'
}
