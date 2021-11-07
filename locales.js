const fs = require('fs');

module.exports.getLocales = function() {
	try {
		const entries = fs.readdirSync("locales", { withFileTypes: true })
		const dirs = entries.filter(e => e.isDirectory())
		return dirs.map(function(e) { return { key: e.name } })
	} catch(e) {
	    console.log('Error:', e.stack);
	    return []
	}
}