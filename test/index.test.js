var tape = require('tape'); // estanos jalando tape del archivo node-modules para usar
var rule = require('../index.js');

tape('Detects root login correctly', function(t) {
	var rootLoginEvent = require('./fixtures/rootLoginEvent.json'); // require funciona  solo con arch jsons

	rule.fn(rootLoginEvent, function(err, message) {
		t.equal(message.subject, 'Root user logged in to the console.', 'Detected root user login');
		t.end();
	});

});

tape('Detects not user root', function(t) {
	var notRootLoginEvent = require('./fixtures/notRootLoginEvent.json'); // require funciona  solo con arch jsons
	rule.fn(notRootLoginEvent, function(err, message) {
		t.equal(message, 'Not user root', 'No es usuario root');
		t.end();
	});

});
