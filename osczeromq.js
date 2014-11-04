var osc = require('node-osc'),
	zmq = require('zmq'),
	config = require('./config.json');

var outSocket = zmq.socket('push');

outSocket.bindSync(config.zmq.protocol +'://' + config.zmq.ip + ':' + config.zmq.port);

var oscServer = new osc.Server(config.osc.port, config.osc.ip);
oscServer.on("message", function (msg, rinfo) {

      var string = "[",
      	  count = 0;

      for(key in msg) {

      		if(count > 0) {
      			string+= ",";
      		}

      		//Add quotes to json string if value is itself a string.
      		if(isNaN(msg[key].value)) {
      			string += "\"" + msg[key] + "\"";
      		} else {
      			string += "" + msg[key];
      		}

      		count++;
      		
      }

      string += "]";

      outSocket.send(string);

      console.log(string);

});