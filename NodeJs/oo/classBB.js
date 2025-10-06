var classCC = require('./classCC');


function SayHello(a) {
 
    console.log('classBB ' + a);
    return classCC.SayHello(a);
    
};
module.exports = {SayHello};