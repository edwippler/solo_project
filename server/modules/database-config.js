// console.log('mongo', process.env.MONGODB_URI);
module.exports = process.env.MONGODB_URI ||'mongodb://localhost:27017/wipit';
