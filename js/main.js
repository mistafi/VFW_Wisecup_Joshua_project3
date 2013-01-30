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
		if(document.getElementById("addfav").checked){
			favoriteValue = document.getElementById("addfav").value;
		}else{
			favoriteValue = "No"
		}
	}
	
	function toggleTheControls(n){
		switch(n){
			case "on":
				document.getElementById("pebbleForm").style.display = "none";
				document.getElementById("displayDataLink").style.display = "block";
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
	
	function storeTheData (key) {
		//if no key, then it's brand new and we need a new key
		if(!key){
		var id 				= Math.floor(Math.random()*100000001);
		}else {
			//set the id to the existing key so it will not overwrite the data
			id = key;
		}
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
	
	function getStorageData(){
		toggleTheControls("on");
		if(localStorage.length === 0) {
			alert("There is no data in Local Storage so default data was added.");
			autoFillDefault();
		}
		//write data from local storage to the browser
		var makeNewDiv = document.createElement("div");
		makeNewDiv.setAttribute("id", "items");
		var makeNewList = document.createElement("ol");
		makeNewList.setAttribute("class", "unstyled");
		makeNewDiv.appendChild(makeNewList);
		document.body.appendChild(makeNewDiv);
		document.getElementById("items").style.display = "block";													

		for (var i=0, len=localStorage.length; i<len;i++){
			var makeNewLi = document.createElement("li");
			var navLinksLi = document.createElement("li");
			makeNewList.appendChild(makeNewLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeSubList.setAttribute("class", "unstyled well");
			makeNewLi.appendChild(makeSubList);
			getCatImage(obj.dropdownSelect[1],makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(navLinksLi);
			}
			makeNavLinksLi(localStorage.key(i), navLinksLi); // create edit and delete links for each item in local storage
		}
		document.getElementById("mainContainer").appendChild(makeNewDiv);
	}
	
	//Get image for right category
	function getCatImage(categoryName, makeSubList){
		var imageNewLi = document.createElement("li");
		makeSubList.appendChild(imageNewLi);
		var newCatImg = document.createElement("img");
		var setSrc = newCatImg.setAttribute("src", "images/"+ categoryName + ".png");
		imageNewLi.appendChild(newCatImg);
	}
	
	
	
	//Auto Fill Local Storage as default
	function autoFillDefault(){
		//store JSON into Local Storage
		for(var n in jsonData){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(jsonData[n]));
		}
	}
	
	
	//Make Navigation Links for Items
	//create edit and delete links
	function makeNavLinksLi(key, navLinksLi){
		//add edit single item link
		var editDataLink = document.createElement("a");
		editDataLink.href = "#";
		editDataLink.key = key;
		var editDataText = "Edit Contact";
		editDataLink.addEventListener("click", editDataItem);
		editDataLink.innerHTML = editDataText;
		navLinksLi.appendChild(editDataLink);
		
		//add line break
		var breakReturnTag = document.createElement("br");
		navLinksLi.appendChild(breakReturnTag);
		
		
		//add delete single item link
		var deleteDataLink = document.createElement("a");
		deleteDataLink.href = "#";
		deleteDataLink.key = key;
		var deleteDataText = "Delete Contact";
		deleteDataLink.addEventListener("click", deleteDataItem);
		deleteDataLink.innerHTML = deleteDataText;
		navLinksLi.appendChild(deleteDataLink);
	
	}
	
	function editDataItem(){
	//Grab data from local storage
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);
	
	//Show the form
	toggleTheControls("off");
	
	//populate the form fields with current localStorage values
	document.getElementById("dropdownSelect").value = item.dropdownSelect[1];
	document.getElementById("inputName").value = item.inputName[1];
	document.getElementById("inputAddress").value = item.inputAddress[1];
	document.getElementById("inputAddress2").value = item.inputAddress2[1];
	document.getElementById("inputCity").value = item.inputCity[1];
	document.getElementById("inputState").value = item.inputState[1];
	document.getElementById("inputZip").value = item.inputZip[1];
	document.getElementById("inputRating").value = item.inputRating[1];
	document.getElementById("inputDate").value = item.inputDate[1];
	document.getElementById("inputArea").value = item.inputArea[1];
	if(item.inputCheck[1] == "Yes"){
		document.getElementById("addfav").setAttribute("checked", "checked");
	}
	
	//Remove inital listener from save button
	submit.removeEventListener("click", storeTheData);
	
	//change submit button to edit button
	document.getElementById("submit").value = "Edit Contact";
	var editSubmit = document.getElementById("submit");
	
	//save key value for reuse
	editSubmit.addEventListener("click", validate);
	editSubmit.key = this.key;
	
	
	
	}
	
	function deleteDataItem(){
		var ask = confirm("Are you sure you want to delete this pebble?");	
		if(ask){
			localStorage.removeItem(this.key);
			alert("Pebble was deleted.");
			window.location.reload();
		}else{
			alert("Pebble was not deleted.");
		}
	}
	
	function clearLocalStorage(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All pebbles are deleted!");
			window.location.reload();
			return false;
		}
	}
	
	function validate(v){
		//define the elements we want to check
		var checkGroup = document.getElementById("dropdownSelect");
		var checkName = document.getElementById("inputName");
		var checkAddress = document.getElementById("inputAddress");
		var checkCity = document.getElementById("inputCity");
		var checkState = document.getElementById("inputState");
		
		//reset error messages
		errMessage.innerHTML = "";
		checkGroup.style.border = "1px solid #cccccc";
		checkName.style.border = "1px solid #cccccc";
		checkAddress.style.border = "1px solid #cccccc";
		checkCity.style.border = "1px solid #cccccc";
		checkState.style.border = "1px solid #cccccc";

		//get error messages
		var messagesArray = [];
		
		//group validation
		if(checkGroup.value === "--Choose a Type--"){
			var checkGroupError = "Please choose a group."
			checkGroup.style.border = "1px solid red";
			messagesArray.push(checkGroupError);
		}
		//name validation
		if(checkName.value === ""){
			var checkNameError = "Please enter a name."
			checkName.style.border = "1px solid red";
			messagesArray.push(checkNameError);
		}
		//address validation
		if(checkAddress.value === ""){
			var checkAddressError = "Please enter an address."
			checkAddress.style.border = "1px solid red";
			messagesArray.push(checkAddressError);
		}
		//city validation
		if(checkCity.value === ""){
			var checkCityError = "Please enter a city."
			checkCity.style.border = "1px solid red";
			messagesArray.push(checkCityError);
		}
		//state validation
		if(checkState.value === ""){
			var checkStateError = "Please enter a state."
			checkState.style.border = "1px solid red";
			messagesArray.push(checkStateError);
		}
		
		//if there are errors, display them
		if(messagesArray.length >= 1){
			for(var i=0, j=messagesArray.length; i < j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = messagesArray[i];
				errMessage.appendChild(txt);
			}
			v.preventDefault();
			return false;
		}else{
			//if no errors, save data. send key val from editData function
			//remember this key value was passed through editSubmit as a property
			storeTheData(this.key);
		}

		
	}
	
	//Variable defaults
	var pebbleGroups = ["--Choose a Type--", "Restaurant", "Gas Station", "Retail Store"],
		favoriteValue = "No",
		errMessage = document.getElementById("errorMessages");
	;
	makeSelectField();
	
	
	//Set Link and Submit Click Events
	var displayDataLink = $("displayDataLink");
	document.getElementById("displayDataLink").addEventListener("click", getStorageData);
	var clearDataLink = $("clearData");
	document.getElementById("clearData").addEventListener("click", clearLocalStorage);
	var saveData = $("submit");
	document.getElementById("submit").addEventListener("click", validate);
	


});

