async function SaveToCloudFlare1 () {
	let character = { };
	
	character.name = document.getElementsByName("CharacterName")[0].value;
	character.player = document.getElementsByName("PlayerName")[0].value;
	
	character.class = document.getElementsByName("Class")[0].value;
	
	character.race = document.getElementsByName("Race")[0].value;
	character.alignment = document.getElementsByName("Alignment")[0].value;
	character.gender = document.getElementsByName("Gender")[0].value;
	character.size = document.getElementsByName("Size")[0].value;
	character.deity = document.getElementsByName("Deity")[0].value;
	
	const url = "../api/Pathfinder1/" + character.player;
	const response = await fetch(url,{
		method: "POST",
		headers: { 
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(character)
	});
	console.log(response);
	
	/*const xhr = new XMLHttpRequest();
	xhr.open("POST", "https://characters.icecubez.workers.dev/Pathfinder1", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(character));*/
	
	/*const response = await fetch("https://characters.icecubez.workers.dev/Pathfinder1", {
		method: "PUT", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
		  "Content-Type": "application/json",
		  // 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(character), // body data type must match "Content-Type" header
	  });
	  return response.json(); // parses JSON response into native JavaScript objects*/
}