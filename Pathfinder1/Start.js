function SetUpFunctions() {
	function AbilitySetUp(name) {
		document.getElementById(name).addEventListener('focusout', _ => ModifyAbility(name));
		document.getElementById(name+"-temp").addEventListener('focusout', _ => ModifyAbility(name));
		ModifyAbility(name);
	}
	AbilitySetUp("str");
	AbilitySetUp("dex");
	AbilitySetUp("con");
	AbilitySetUp("int");
	AbilitySetUp("wis");
	AbilitySetUp("cha");
	
	document.getElementById("Base-HP").addEventListener('focusout', _ => ModifyHP());
	document.getElementById("Temp-HP").addEventListener('focusout', _ => ModifyHP());
	document.getElementById("Non-Lethal-Dmg").addEventListener('focusout', _ => ModifyHP());
	ModifyHP();
	
	const BAB = document.getElementsByClassName("BAB")[0];
	BAB.addEventListener('focusout', _ => ModifyBAB(BAB.value));
	ModifyBAB(BAB.value);
	
	document.getElementById("Alignment").addEventListener('focusout', _ => ModifyHP());
	
	//Remembers if you had the details closed or opened.
	document.querySelectorAll('details').forEach(deet => {
		deet.open = localStorage.getItem(deet.id) === 'true';
		deet.addEventListener('toggle', _ => localStorage.setItem(deet.id, deet.open));
	});
	
	document.querySelectorAll('input').forEach(inp => {
		if (inp.type == "checkbox") inp.addEventListener('click', _ => SaveToCloudFlare());
		else inp.addEventListener('focusout', _ => SaveToCloudFlare());
	});
}

async function LoadFromCloudFlare (key) {
	const response = await fetch("../api/Pathfinder1/" + key);
	LoadFromJSON(await response.json());
	document.getElementById("CharacterIndex").value = key.split('/')[1];
}

async function CheckURL () {
	const params = new Proxy(new URLSearchParams(window.location.search), {
	  get: (searchParams, prop) => searchParams.get(prop),
	});
	// Get the value of "some_key" in eg "https://example.com/?key=value"
	const key = params.key; // "value"
	
	if (key != null) { //Not a stranger
		document.getElementById("PlayerName").disabled = true; //Only enabled if its a stranger
		
		//history.replaceState(null, "", location.href.split("?")[0]);
		
		if (key.includes("/")) await LoadFromCloudFlare(key); //Loading a Existing character
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
	SetUpFunctions(); //Load this after everything is loaded.
}
CheckURL ();