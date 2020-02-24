let urlpage 	= "web.whatsapp.com";
let img     	= "";
let classname   = "_1_keJ";
let loading;
let amoutDiv;
let Cookie;

/*_______________________________________________________
[+] Load if exist a local image save in you local Storage
_________________________________________________________*/
if (localStorage.getItem("whatsappbg") == null){

	localStorage.setItem("whatsappbg","empty");
	img = "";

}else {

	img = localStorage.getItem("whatsappbg");

}
/*_______________________________________________________
[-] Load if exist a local image save in you local Storage
_________________________________________________________*/


/*____________________________________________________________
[+] The check was loaded with the elements of the application.
______________________________________________________________*/
function checkIsLoad(){

	loading = setInterval(function(){
	 
	 	//Calls the main functions when whats app is logged.
		amoutDiv = document.getElementsByClassName("X7YrQ").length;

		if (amoutDiv > 0){

			loadDivsElements();

			clearTimeout(loading);

		}

	}, 300);

}

document.onload = checkIsLoad();
/*____________________________________________________________
[-] The check was loaded with the elements of the application.
______________________________________________________________*/

/*_______________________
[+] Click event functions
_________________________*/
function loadDivsElements(){

	//When user click in anythig... background is reloaded
	document.addEventListener("click", function(){reloadBackground(img)});

	//Exit Whats app - Clear the background set for last user
	document.getElementsByClassName('_3j8Pd')[0].addEventListener("click", function(){

		try{

			document.getElementsByClassName('Sl-9e')[0].addEventListener("click",function(){

				localStorage.setItem("whatsappbg","null");

				img = "";

				reloadBackground("");

			});

		}catch (err){};

	});

}
/*_______________________
[-] Click event functions
_________________________*/

/*_______________________________________________
[+] Event responsible for changing the background
_________________________________________________*/
function reloadBackground(newImageUrl){

	/*[!] Every time you change the convert from whats app. 
	There is an event of deletion of the "div" and the re-creation, 
	so it is for this reason that it checks whether the inserted background is the same.*/

	try {
		
		if (newImageUrl != document.getElementsByClassName(classname)[0].style.background ) {

			document.getElementsByClassName(classname)[0].style.background 						= "url(\"" + newImageUrl + "\")";
			document.getElementsByClassName(classname)[0].style.repeate								= "no-repeat";
			document.getElementsByClassName(classname)[0].style.backgroundSize 				= "cover";
			document.getElementsByClassName(classname)[0].style.backgroundAttachment 	= "fixed";
			document.getElementsByClassName(classname)[0].style.animation							= "none";

		}

	} catch(err){};

}
/*_______________________________________________
[-] Event responsible for changing the background
_________________________________________________*/


/*_______________________________________________________________
[+] "CHROME" API event to receive the background exchange request
_________________________________________________________________*/
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){

	img = request['data'];

	if (img != "clear") {

		localStorage.setItem("whatsappbg",request['data']);

		reloadBackground(request['data']);

	}else{

		localStorage.removeItem("whatsappbg");

		reloadBackground("");

	}

});
/*_______________________________________________________________
[-] "CHROME" API event to receive the background exchange request
_________________________________________________________________*/