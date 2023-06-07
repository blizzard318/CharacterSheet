async function LoadFromCloudFlare () {
	const params = new Proxy(new URLSearchParams(window.location.search), {
	  get: (searchParams, prop) => searchParams.get(prop),
	});
	// Get the value of "some_key" in eg "https://example.com/?key=value"
	const key = params.key; // "value"
	
	if (key === undefined || key === null) return;
	document.getElementById("PlayerName").disabled = true; //Only disable if its a stranger
	
	history.pushState(null, "", location.href.split("?")[0]);
	
	if (!key.includes("/")) {
		document.getElementById("PlayerName").value = key;
		return;
	}
	
	const response = await fetch("../api/Pathfinder1/" + key);
	const character = await response.json();
	
	document.getElementById("CharacterName").value = character.name;
	document.getElementById("PlayerName").value = character.player;
	
	document.getElementById("Class").value = character.class;
	
	document.getElementById("Race").value = character.race;
	document.getElementById("Alignment").value = character.alignment;
	document.getElementById("Gender").value = character.gender;
	document.getElementById("Size").value = character.size;
	document.getElementById("Deity").value = character.deity;
}

function CheckURL () {
	const params = new Proxy(new URLSearchParams(window.location.search), {
	  get: (searchParams, prop) => searchParams.get(prop),
	});
	// Get the value of "some_key" in eg "https://example.com/?key=value"
	const key = params.key; // "value"
	
	if (key === undefined || key === null) return; //Stranger
	document.getElementById("PlayerName").disabled = true; //Only disable if its a stranger
	
	history.pushState(null, "", location.href.split("?")[0]);
	
	if (key.includes("/")) LoadFromCloudFlare(); //Loading a Existing character
	else { //Create a New character
		let character = { };

		character.name = document.getElementById("CharacterName").value = "Unnamed Character";
		character.player = document.getElementById("PlayerName").value = key;
		
		const url = "../api/Pathfinder1/" + character.player;
		fetch(url,{
			method: "POST", //THIS IS POST, NEW CHARA. DON'T USE PUT.
			headers: { 
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(character)
		});
	}
}