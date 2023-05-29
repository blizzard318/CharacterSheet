async function LoadFromCloudFlare () {
	const params = new Proxy(new URLSearchParams(window.location.search), {
	  get: (searchParams, prop) => searchParams.get(prop),
	});
	// Get the value of "some_key" in eg "https://example.com/?key=value"
	const key = params.key; // "value"
	
	if (key === undefined || key === null) return;
	
	const response = await fetch("../api/Pathfinder1/" + key);
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
LoadFromCloudFlare();