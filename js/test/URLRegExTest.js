/*
	a simple test to check whether URL RegEx works as expected

 */
var urlRegEx = /^((?:(?:https?|ftp):\/\/)|)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

var domainsToTest = [
	{
		url: "list.com",
		expectedResult: true
	},
	{
		url: "http://foo.com/blah_blah",
		expectedResult: true
	},
	{
		url: "http://foo.com/blah_blah/",
		expectedResult: true
	},
	{
		url: "115.68.20.68",
		expectedResult: true
	},
	{
		url: "http://www.google.com",
		expectedResult: true
	},
	{
		url: "https://www.facebook.com/",
		expectedResult: true
	},
	{
		url: "ftp://ftp.com",
		expectedResult: true
	},
	{
		url: "10.88.186.68",
		expectedResult: true
	},
	{
		url: "to.do.so:1155",
		expectedResult: true
	},
	{
		url: "whatever:8088",
		expectedResult: false
	}
];

var passCount = 0;
var failCount = 0;

for (var i = 0; i < domainsToTest.length; i++) {
	var domainToTest = domainsToTest[i].url;
	var expectedResult = domainsToTest[i].expectedResult;
	var actualResult = urlRegEx.test(domainToTest);
	var testResult = (expectedResult === actualResult);

	if (testResult) passCount++;
	else failCount++;

	console.log("====================================================");
	console.log("Testing " + domainToTest);
	console.log("Result: " + (testResult ? "PASS" : "FAIL"));
	console.log("Expected: " + expectedResult + ", Actual: " + actualResult);
}

console.log("====================================================");
console.log("                       SUMMARY                      ");
console.log("            Pass: " + passCount + ", Fail: " + failCount + ", Total: " + domainsToTest.length);
console.log("====================================================");