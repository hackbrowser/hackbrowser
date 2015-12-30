/*
	a simple test to check whether URL RegEx works as expected

	 RegEx for URL format by Diego Perini
	 https://gist.github.com/dperini/729294

	 So far, this seems to be the most complete regex for URL formats
	 https://mathiasbynens.be/demo/url-regex
 */
var urlRegEx = /^((?:(?:https?|ftp):\/\/)|)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

var domainsToTest = [
	{ "url": "list.com", "expectedResult": true },
	{ "url": "http://foo.com/blah_blah", "expectedResult": true },
	{ "url": "http://foo.com/blah_blah/", "expectedResult": true },
	{ "url": "115.68.20.68", "expectedResult": true },
	{ "url": "http://www.google.com", "expectedResult": true },
	{ "url": "https://www.facebook.com/", "expectedResult": true },
	{ "url": "ftp://ftp.com", "expectedResult": true },
	{ "url": "10.88.186.68", "expectedResult": true },
	{ "url": "to.do.so:1155", "expectedResult": true },
	{ "url": "whatever:8088", "expectedResult": false },
	{ "url": "http://foo.com/blah_blah", "expectedResult": true },
	{ "url": "http://foo.com/blah_blah/", "expectedResult": true },
	{ "url": "http://foo.com/blah_blah_(wikipedia)", "expectedResult": true },
	{ "url": "http://foo.com/blah_blah_(wikipedia)_(again)", "expectedResult": true },
	{ "url": "http://www.example.com/wpstyle/?p=364", "expectedResult": true },
	{ "url": "https://www.example.com/foo/?bar=baz&amp;inga=42&amp;quux", "expectedResult": true },
	{ "url": "http://✪df.ws/123", "expectedResult": true },
	{ "url": "http://userid:password@example.com:8080", "expectedResult": true },
	{ "url": "http://userid:password@example.com:8080/", "expectedResult": true },
	{ "url": "http://userid@example.com", "expectedResult": true },
	{ "url": "http://userid@example.com/", "expectedResult": true },
	{ "url": "http://userid@example.com:8080", "expectedResult": true },
	{ "url": "http://userid@example.com:8080/", "expectedResult": true },
	{ "url": "http://userid:password@example.com", "expectedResult": true },
	{ "url": "http://userid:password@example.com/", "expectedResult": true },
	{ "url": "http://142.42.1.1/", "expectedResult": true },
	{ "url": "http://142.42.1.1:8080/", "expectedResult": true },
	{ "url": "http://➡.ws/䨹", "expectedResult": true },
	{ "url": "http://⌘.ws", "expectedResult": true },
	{ "url": "http://⌘.ws/", "expectedResult": true },
	{ "url": "http://foo.com/blah_(wikipedia)#cite-1", "expectedResult": true },
	{ "url": "http://foo.com/blah_(wikipedia)_blah#cite-1", "expectedResult": true },
	{ "url": "http://foo.com/unicode_(✪)_in_parens", "expectedResult": true },
	{ "url": "http://foo.com/(something)?after=parens", "expectedResult": true },
	{ "url": "http://☺.damowmow.com/", "expectedResult": true },
	{ "url": "http://code.google.com/events/#&amp;product=browser", "expectedResult": true },
	{ "url": "http://j.mp", "expectedResult": true },
	{ "url": "ftp://foo.bar/baz", "expectedResult": true },
	{ "url": "http://foo.bar/?q=Test%20URL-encoded%20stuff", "expectedResult": true },
	{ "url": "http://مثال.إختبار", "expectedResult": true },
	{ "url": "http://例子.测试", "expectedResult": true },
	{ "url": "http://उदाहरण.परीक्षा", "expectedResult": true },
	{ "url": "http://-.~_!$&amp;'()*+,;=:%40:80%2f::::::@example.com", "expectedResult": true },
	{ "url": "http://1337.net", "expectedResult": true },
	{ "url": "http://a.b-c.de", "expectedResult": true },
	{ "url": "http://223.255.255.254", "expectedResult": true },
	{ "url": "http://", "expectedResult": false },
	{ "url": "http://.", "expectedResult": false },
	{ "url": "http://..", "expectedResult": false },
	{ "url": "http://../", "expectedResult": false },
	{ "url": "http://?", "expectedResult": false },
	{ "url": "http://??", "expectedResult": false },
	{ "url": "http://??/", "expectedResult": false },
	{ "url": "http://#", "expectedResult": false },
	{ "url": "http://##", "expectedResult": false },
	{ "url": "http://##/", "expectedResult": false },
	{ "url": "http://foo.bar?q=Spaces should be encoded", "expectedResult": false },
	{ "url": "//", "expectedResult": false },
	{ "url": "//a", "expectedResult": false },
	{ "url": "///a", "expectedResult": false },
	{ "url": "///", "expectedResult": false },
	{ "url": "http:///a", "expectedResult": false },
	{ "url": "foo.com", "expectedResult": true },
	{ "url": "rdar://1234", "expectedResult": false },
	{ "url": "h://test", "expectedResult": false },
	{ "url": "http:// shouldfail.com", "expectedResult": false },
	{ "url": ":// should fail", "expectedResult": false },
	{ "url": "http://foo.bar/foo(bar)baz quux", "expectedResult": false },
	{ "url": "ftps://foo.bar/", "expectedResult": false },
	{ "url": "http://-error-.invalid/", "expectedResult": false },
	{ "url": "http://a.b--c.de/", "expectedResult": false },
	{ "url": "http://-a.b.co", "expectedResult": false },
	{ "url": "http://a.b-.co", "expectedResult": false },
	{ "url": "http://0.0.0.0", "expectedResult": false },
	{ "url": "http://10.1.1.0", "expectedResult": false },
	{ "url": "http://10.1.1.255", "expectedResult": false },
	{ "url": "http://224.1.1.1", "expectedResult": false },
	{ "url": "http://1.1.1.1.1", "expectedResult": false },
	{ "url": "http://123.123.123", "expectedResult": false },
	{ "url": "http://3628126748", "expectedResult": false },
	{ "url": "http://.www.foo.bar/", "expectedResult": false },
	{ "url": "http://www.foo.bar./", "expectedResult": false },
	{ "url": "http://.www.foo.bar./", "expectedResult": false },
	{ "url": "http://10.1.1.1", "expectedResult": false },
	{ "url": "http://10.1.1.254", "expectedResult": false }
];

var passCount = 0;
var failCount = 0;

for (var i = 0; i < domainsToTest.length; i++) {
	var domainToTest = domainsToTest[i].url;
	var expectedResult = domainsToTest[i].expectedResult;
	var actualResult = urlRegEx.test(domainToTest);
	var testResult = (expectedResult === actualResult);

	// increase pass/fail counts
	if (testResult) passCount++;
	else failCount++;

	// only print result if pass fails
	if (testResult === false) {
		console.log("====================================================");
		console.log("Testing " + domainToTest);
		console.log("Result: " + (testResult ? "PASS" : "FAIL"));
		console.log("Expected: " + expectedResult + ", Actual: " + actualResult);
	}
}

console.log("====================================================");
console.log("                       SUMMARY                      ");
console.log("            Pass: " + passCount + ", Fail: " + failCount + ", Total: " + domainsToTest.length);
console.log("====================================================");