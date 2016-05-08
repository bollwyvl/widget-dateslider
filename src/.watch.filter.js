var re = /\.(ts|less|json)$/;

module.exports = function(f){ return re.exec(f); };
