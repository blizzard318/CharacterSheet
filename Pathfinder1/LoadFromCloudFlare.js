async function LoadFromCloudFlare () {
	console.log("Why won't you work");
	const response = await fetch("../api/Pathfinder1/Andrew/1");
	const json = await response.json();
	console.log(json);
	
	/*const files = document.getElementById("charsheet").files;
	const text = await files[0].text();
	const json = JSON.parse(text);
	
	let character = { };
	
	character.name = document.getElementsByName("CharacterName")[0].value;
	character.player = document.getElementsByName("PlayerName")[0].value;
	
	character.class = document.getElementsByName("Class")[0].value;
	
	character.race = document.getElementsByName("Race")[0].value;
	character.alignment = document.getElementsByName("Alignment")[0].value;
	character.gender = document.getElementsByName("Gender")[0].value;
	character.size = document.getElementsByName("Size")[0].value;
	character.deity = document.getElementsByName("Deity")[0].value;*/
}