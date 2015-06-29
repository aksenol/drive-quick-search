//initializing oAuth
var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
  'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
  'consumer_key': 'anonymous',
  'consumer_secret': 'anonymous',
  'scope': 'https://www.googleapis.com/auth/drive',
  'app_name':'GoogleDriveQuickSearch'
});
oauth.authorize( function(token,secret) {} );

//function to handle API request
handleRequest=function(suggest){
	return function(response,xhr){
		var obj=JSON.parse(response);
		var suggestArray=new Array();
		for( var item in  obj.items ){
			suggestArray.push({content: obj.items[item].alternateLink, description: obj.items[item].title });
		}
		suggest(suggestArray);
	};
}

//requesting file list
function getFileList(query,suggest){
    var url = 'https://www.googleapis.com/drive/v2/files';
	var request = {
		'method': 'GET',
		'parameters': {'q': 'title contains "' + query + '"', 'key': 'AIzaSyBk1BMpp_cQ-AUkHDKkQu-oyk9KX0IpRFs'},
	};
	oauth.sendSignedRequest(url,handleRequest(suggest),request);  
}

chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
	chrome.omnibox.setDefaultSuggestion({description:"Search "+text+" in Google Drive"});
	getFileList(text,suggest);
});

chrome.omnibox.onInputEntered.addListener(
  function(text) {
	var regexp = /https:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/;
	if(!regexp.test(text)) 
		chrome.tabs.update({url:  "https://drive.google.com/#search/"+text});	
	else 
		chrome.tabs.update({url: text});
  });


