function CreateNewCharacter () {
	let character = { };
	
	character.name = "Unnamed Character";
	character.player = document.getElementsByName("PlayerName")[0].value;
	if (!character.player) return;
	
	const url = "../api/Pathfinder1/" + character.player;
	fetch(url,{
		method: "POST",
		headers: { 
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(character)
	});
}