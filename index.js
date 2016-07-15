var lcfn = require('lambda-cfn');
var message = lcfn.message;
module.exports = {};

module.exports.fn = function(event, callback) { // aqui estamos exportando nuestra funcion, para usar en un ar extern

	if (event.detail.userIdentity.userName == 'root') {
		var notification = {
			subject: 'Root user logged in to the console.',
			summary: 'Patrol detected that the root AWS user logged in to the console.',
			event: event
		};

		message(notification, function(err, result) {
			callback(err, result);
		});

	} else {
		callback(null, 'Not user root');
	}
};
module.exports.config = { // config es un concepto de patrol o sus especificacioness
	name: 'rootLogin',
	eventRule: {
		eventPattern: {
			'detail-type': [
				'AWS API Call via CloudTrail' // para decir que el sevento viene de cludtrail
			],
			detail: {
				eventSource: [ // de que servicio viene el evento
					'signin.amazonaws.com'
				],
				eventName: [ // el evento exacto que queremos
					'ConsoleLogin'
				]
			}
		}
	}

};