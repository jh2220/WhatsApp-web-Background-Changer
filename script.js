let urlpage 	= "web.whatsapp.com";
var img     	= "";
let classname   = "_1_keJ";
let loading;
let amoutDiv;
let Cookie;

//Load Cache

if (localStorage.getItem("whatsappbg") == null){

	localStorage.setItem("whatsappbg","empty");
	img = "";

}else if(localStorage.getItem("whatsappbg") == "empty"){

	img = "";

}else {

	img = localStorage.getItem("whatsappbg");

}

//Load clicks background
function checkIsLoad(){

	loading = setInterval(function(){
	 
		amoutDiv = document.getElementsByClassName("X7YrQ").length;

		if (amoutDiv > 0){

			loadDivsElements();

			clearTimeout(loading);

		}

	}, 300);

}

checkIsLoad();

function loadDivsElements(){

	//Definindo informacoes para ser buscadas
	let clickElement = document.getElementsByClassName("X7YrQ");

	//Change Tab Whats app
	for (let i = 0; i < clickElement.length; i++) {	

		clickElement[i].addEventListener("click", function(){reloadBackground(img)});

	}


	//Exit Whats app
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

//Trocando o BackGround quando clicado
function reloadBackground(newImageUrl){

	try {
		
		document.getElementsByClassName(classname)[0].style.background 				= "url(\"" + newImageUrl + "\")";
		document.getElementsByClassName(classname)[0].style.repeate					= "no-repeat";
		document.getElementsByClassName(classname)[0].style.backgroundSize 			= "cover";
		document.getElementsByClassName(classname)[0].style.backgroundAttachment 	= "fixed";
		document.getElementsByClassName(classname)[0].style.animation 				= "none";

	} catch(err){};

}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){

	img = request['data'];

	localStorage.setItem("whatsappbg",request['data']);

	reloadBackground(request['data']);

});