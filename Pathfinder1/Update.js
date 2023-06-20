//This code runs like an update loop.
function GetMod (name, defval) {
	const abi = parseInt(document.getElementById(name).value);
	const mod = Math.floor((abi - 10)/2);
	return isNaN(mod) ? defval : mod;
}

function ModifyAbility (name) {
	SaveToCloudFlare();
	
	let mod = GetMod(name, null);
	 
	if (!name.includes("temp")) { //If original ability score
		document.getElementById(name + "-mod").value = mod;
		mod = GetMod(name + "-temp", mod);
	}
	else { //If temp ability score
		name = name.slice(0,3);
		if (mod == null) mod = GetMod(name, null);
	}
	
	const elements = document.getElementsByClassName(name + "-temp-mod");
	for (const element of elements) element.value = mod;
}

function ModifyBAB (value) {
	SaveToCloudFlare();
	const elements = document.getElementsByClassName("BAB");
	for (const element of elements) element.value = value;
}

function ModifyHP () {
	SaveToCloudFlare();
	let current = document.getElementById("Current-HP").value;
	current = isNaN(current) ? 0 : current;
	let temp = document.getElementById("Temp-HP").value;
	temp = isNaN(temp) ? 0 : temp;
	let nonlethal = document.getElementById("Non-Lethal-Dmg").value;
	nonlethal = isNaN(nonlethal) ? 0 : nonlethal;
	
	document.getElementById("Total-HP").value = current + temp - nonlethal;
}


function UpdateOnStart() { //Call this on start
	ModifyAbility("str");
	ModifyAbility("dex");
	ModifyAbility("con");
	ModifyAbility("int");
	ModifyAbility("wis");
	ModifyAbility("cha");
}