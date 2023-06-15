function SaveToJSON () {
	
}

async function SaveToCloudFlare () {
	let character = { };
	
	character.name = document.getElementById("CharacterName").value;
	character.player = document.getElementById("PlayerName").value;
	if (!character.player) return;
	
	character.class = document.getElementById("Class").value;
	
	character.race = document.getElementById("Race").value;
	character.alignment = document.getElementById("Alignment").value;
	character.gender = document.getElementById("Gender").value;
	character.size = document.getElementById("Size").value;
	character.deity = document.getElementById("Deity").value;
	
	let index = document.getElementById("CharacterIndex").value;
	const url = "../api/Pathfinder1/" + character.player + "/" + index;
	const response = await fetch(url,{
		method: "PUT",
		headers: { 
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(character)
	});
}