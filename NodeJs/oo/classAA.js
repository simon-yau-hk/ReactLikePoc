var classBB = require('./classBB');


function SayHello(a) {
 
    console.log('classAA ' + a);
    return classBB.SayHello(a);
    
};
module.exports = {SayHello};