async function LoadFromCloudFlare () {
	const response = await fetch("../api/Pathfinder1/Andrew/1");
	const character = await response.json();
	
	document.getElementsByName("CharacterName")[0].value = character.name;
	document.getElementsByName("PlayerName")[0].value = character.player;
	
	document.getElementsByName("Class")[0].value = character.class;
	
	document.getElementsByName("Race")[0].value = character.race;
	document.getElementsByName("Alignment")[0].value = character.alignment;
	document.getElementsByName("Gender")[0].value = character.gender;
	document.getElementsByName("Size")[0].value = character.size;
	document.getElementsByName("Deity")[0].value = character.deity;
}