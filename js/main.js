// JavaScript Document
// VFW Project 3 
// Joshua Wisecup
// Term 0113 
		


//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){
//alert("Hello, World!");

	//Get ElementById Function
	function $(x){
		var elements = document.getElementById("x");
	return elements;
	}
	
	
	//Create select field element and populate with options
	function makeSelectField() {
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags
			selectDiv = $("selectDiv"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "dropdownSelect");
		for(var i=0, j=pebbleGroups.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = pebbleGroups[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		document.getElementById("selectDiv").appendChild(makeSelect);
	}
	
	//Find value of a selected radio button
	function getCheckBoxValue(){
		if(document.getElementById("fav").checked){
			favoriteValue = document.getElementById("fav").value;
		}else{
			favoriteValue = "No"
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				document.getElementById("pebbleForm").style.display = "none";
				document.getElementById("displayLink").style.display = "none";
				document.getElementById("addPebble").style.display = "block";	
				break;
			case "off":
				document.getElementById("pebbleForm").style.display = "block";
				document.getElementById("addPebble").style.display = "none";	
				document.getElementById("items").style.display = "none";													
				break;
			default:
				return false;
		}
	}
	
	function storeData () {
		var id 				= Math.floor(Math.random()*100000001);
		//Gather up our form field values and store in an object
		//Object properties contain an array with form label and input values
		getCheckBoxValue();
		var item			= {};
		item.dropdownSelect	= ["Group:", document.getElementById("dropdownSelect").value];
		item.inputName		= ["Name:", document.getElementById("inputName").value];
		item.inputAddress	= ["Address:", document.getElementById("inputAddress").value];
		item.inputAddress2	= ["Address2:", document.getElementById("inputAddress2").value];
		item.inputCity		= ["City:", document.getElementById("inputCity").value];
		item.inputState		= ["State:", document.getElementById("inputState").value];
		item.inputZip		= ["Zip:", document.getElementById("inputZip").value];
		item.inputRating	= ["Rating:", document.getElementById("inputRating").value];
		item.inputDate		= ["Date:", document.getElementById("inputDate").value];
		//item.inputHidden	= ["Hidden:", $("inputHidden").value];
		item.inputArea		= ["Area:", document.getElementById("inputArea").value];
		item.inputCheck		= ["Add to Favorites:", favoriteValue];
		
		//Save data into local storage. Use stringify to convert object into a string		
		localStorage.setItem(id, JSON.stringify(item));
		//localStorage.setItem("test","hello");
		//alert(localStorage.length);
		alert("Pebble Saved! You have " + localStorage.length + " pebbles saved.");
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0) {
			alert("There is no data in Local Storage.");
		}
		//write data from local storage to the browser
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ol");
		makeList.setAttribute("class", "unstyled");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		document.getElementById("items").style.display = "block";													

		for (var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement("li");
			var navLinksLi = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeSubList.setAttribute("class", "unstyled well");
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(navLinksLi);
			}
			makeNavLinksLi(localStorage.key(i), navLinksLi); // create edit and delete links for each item in local storage
		}
		document.getElementById("mainContainer").appendChild(makeDiv);
	}
	
	//Make Navigation Links for Items
	//create edit and delete links
	function makeNavLinksLi(key, navLinksLi){
		//add edit single item link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Contact";
		//editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		navLinksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement("br");
		navLinksLi.appendChild(breakTag);
		
		
		//add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Contact";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		navLinksLi.appendChild(deleteLink);
	
	}
	
	function editItem(){
	//Grab data from local storage
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);
	
	//Show the form
	toggleControls("off");
	
	//populate the form fields with current localStorage values
	$("groups").value = item.group[1];
	
	
	}
	
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All pebbles are deleted!");
			window.location.reload();
			return false;
		}
	}
	
	//Variable defaults
	var pebbleGroups = ["--Choose a Type--", "Restaurant", "Gas Station", "Retail Store"],
		favoriteValue = "No"
	;
	makeSelectField();
	
	
	//Set Link and Submit Click Events
	var displayLink = $("displayLink");
	document.getElementById("displayLink").addEventListener("click", getData);
	var clearLink = $("clear");
	document.getElementById("clear").addEventListener("click", clearLocal);
	var save = $("submit");
	document.getElementById("submit").addEventListener("click", storeData);



});





//var myField = document.getElementById("myText");

//console.log("myField");

//var tags = document.getElementsByTagName("li");

//console.log("tags");


/*var myUlTag = document.createElement("ul");
var myDiv = document.getElementById("mainContent");

var colors = [ "Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];

myDiv.appendChild(myUlTag);

for(i=0, j=colors.length; i<j; i++) {
	var liTag = document.createElement("li");
	liTag.innerHTML = colors[i];
	if(i%2 == 1){
	liTag.setAttribute = ("class","even");
	}
	myUlTag.appendChild(liTag);
};*/