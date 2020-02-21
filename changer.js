let backgroundUrl;

document.addEventListener("DOMContentLoaded", function(event){

	let  urlField = document.getElementById("imgUrl");

	urlField.onkeyup = function(){

		sendUrlMessage(document.getElementById("imgUrl").value);

	};

});

function sendUrlMessage(backgroundUrl){

	if (backgroundUrl == ""){

		return false;

	}

	//Request IMG
	
	checkImage(backgroundUrl, function(response){

		if (response == true){

			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

				chrome.tabs.sendMessage(tabs[0].id, {data: backgroundUrl}, function(response){

					console.log("you send a new URL: " + backgroundUrl);

				});

			});

			document.getElementById("imgUrl").style.background = "#fff";

		}else{

			document.getElementById("imgUrl").style.background = "#ffbdbd";

		}

	});

}

function checkImage(backgroundUrl, callBack){

	let image = new Image();

	image.onload = function(){

		callBack(true);

	}

	image.onerror = function(){

		callBack(false);

	}

	image.src = backgroundUrl;

}