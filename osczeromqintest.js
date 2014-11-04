var osc = require('node-osc'),
	zmq = require('zmq'),
	config = require('./config.json');

var inSocket = zmq.socket('pull');

inSocket.connect(config.zmq.protocol +'://' + config.zmq.ip + ':' + config.zmq.port);
console.log('Worker connected to port ' + config.zmq.port);

inSocket.on('message', function(msg){
  console.log('work: %s', msg.toString());
});