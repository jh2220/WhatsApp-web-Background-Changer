let backgroundUrl;

document.addEventListener("DOMContentLoaded", function(event){

	checkPageLocation()

	//Send a new link URL
	$("#imgUrl").keyup(function(){

		sendUrlMessage($("#imgUrl").val());

	});

	//Clear Background
	$("#clearUrl").click(function(){

		requestChange("clear");

		return false;

	});

	//CSS FUNCTIONS
	$("#imgUrl").focus(function(){

		$("#imgUrlUnderBar").stop();
		$("#imgUrlUnderBar").animate({'width':'100%'});

	});

	$("#imgUrl").focusout(function(){

		$("#imgUrlUnderBar").stop();
		$("#imgUrlUnderBar").animate({'width':'0%'});

	});

});

async function sendUrlMessage(backgroundUrl) {
	
	if (backgroundUrl == "") {

		$("#imgUrlUnderBar").css({"background":"#09f"});

		return false;

	}else if( backgroundUrl == "clear" ){

		$("#imgUrlUnderBar").css({"background":"#ff8785"});

		return false;
	
	}

	if (await checkImageExist(backgroundUrl)){

		requestChange(backgroundUrl);

		console.log("true");

		$("#imgUrlUnderBar").css({"background":"#09f"});

	}else{

		console.log("false");

		$("#imgUrlUnderBar").css({"background":"#ff8785"});

	}

}

function checkImageExist(backgroundUrl){

	return new Promise((resolve, reject) => {

		let image = new Image();

		image.onload = function(){

			resolve(true);

		}

		image.onerror = function(){

			resolve(false);

		}

		image.src = backgroundUrl;

	});

}

function requestChange(backgroundUrl){

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

		chrome.tabs.sendMessage(tabs[0].id, {data: backgroundUrl}, function(response){

			console.log("you send a new URL: " + backgroundUrl);

		});

	});

}

function checkPageLocation(){
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

			if (!(tabs[0].url == "https://web.whatsapp.com/" || tabs[0].url == "https://web.whatsapp.com")) {

				$('body').html("<p>you need to be with <a href=\"https://web.whatsapp.com/\" target=\"_blank\">whatsapp web <i class=\"fab fa-whatsapp\"></i></a> open to work this application</p>");

			};

		});


}