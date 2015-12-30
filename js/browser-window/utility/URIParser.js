'use strict';

var URIParser = {};

URIParser.parse = function(uri) {
	/*
	 RegEx for URL format by Diego Perini
	 https://gist.github.com/dperini/729294

	 So far, this seems to be the most complete regex for URL formats
	 https://mathiasbynens.be/demo/url-regex
	 */

	var URIInfo = {
		type: null,
		originalURI: uri,
		formattedURI: null
	};

	var isUrl;

	// TODO: enable special ip formats such as 10.10.10.10
	// some users may want to access that range in a internal network setting
	var urlRegEx = /^((?:(?:https?|ftp):\/\/)|)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

	console.log('"' + uri + '".startsWith("http://") == ' + uri.startsWith("http://"));
	console.log('"' + uri + '".startsWith("https://") == ' + uri.startsWith("https://"));
	console.log('"' + uri + '".startsWith("ftp://") == ' + uri.startsWith("ftp://"));

	if (!uri.startsWith("http://") && !uri.startsWith("https://") && !uri.startsWith("ftp://")) {
		// prepend http:// for regex test if no protocol was specified
		var uri = "http://" + uri;
	}

	console.log("urlRegEx.test(" + uri + ")");

	if (urlRegEx.test(uri)) {
		URIInfo.type = "http";
		URIInfo.formattedURI = uri;
	}

	return URIInfo;
};
