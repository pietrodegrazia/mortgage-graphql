const fs = require('fs');

module.exports.getTranslation = function(key, locale) {
	try {
	    const data = fs.readFileSync(`locales/${locale}/${key}.txt`, 'utf8');
	    return {
	    	key: key,
	    	text: data,
	    	locale: {
	    		key: locale
	    	}
	    }
	} catch(e) {
	    console.log('Error:', e.stack);
	    return
	}
}