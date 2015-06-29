var token;

function init(){
  chrome.identity.getAuthToken({ 'interactive': true }, function(authToken) {
    token = authToken;
    console.log('auth done');
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
	});	
}

function serialize(obj) {
  var str = [];
  for(var p in obj)
     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
}

function executeApiRequest(url, request, responseCallback) {
  xhr = new XMLHttpRequest();
  xhr.open(request.method, url + '?' + serialize(request.parameters), true);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  xhr.responseType = 'json';
  xhr.onload = function () { responseCallback(xhr.response); }

  xhr.send();
}

//requesting file list
function getFileList(query,suggest){
    var url = 'https://www.googleapis.com/drive/v2/files';
	var request = {
		'method': 'GET',
		'parameters': {'q': 'title contains "' + query + '"', 'key': 'AIzaSyBk1BMpp_cQ-AUkHDKkQu-oyk9KX0IpRFs'},
	};
	executeApiRequest(url,request, function(response){
		var suggestArray=new Array();
		if(response) {  // doing this because there are sometimes null responses
						// when user is typing too fast
			for( var item in  response.items ){
				suggestArray.push({
					content: response.items[item].alternateLink, 
					description: response.items[item].title });
			}
			suggest(suggestArray);
		}
	});  
}

// zhu li, do the thing!
init();


