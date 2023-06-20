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
	else if (mod == null){ //If temp score is invalid
		mod = GetMod(name.slice(0,3), null);
	}
	
	const elements = document.getElementsByClassName(name + "-temp-mod");
	for (const element of elements) element.value = mod;
}

function ModifyBAB (value) {
	SaveToCloudFlare();
	const elements = document.getElementsByClassName("BAB");
	for (const element of elements) element.value = value;
}

ModifyAbility("str");
ModifyAbility("dex");
ModifyAbility("cha");
ModifyAbility("int");
ModifyAbility("wis");
ModifyAbility("cha");