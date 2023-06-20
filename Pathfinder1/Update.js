//This code runs like an update loop.
function ModifyAbility (name) {
	SaveToCloudFlare();
	const abi = parseInt(document.getElementById(name).value);
	if (isNaN(abi)) return; //Invalid number
	const mod = Math.floor((abi - 10)/2);
	
	if (!name.includes("temp")) { //If original ability score
		document.getElementById(name + "-mod").value = mod;
		
		const temp_abi = parseInt(document.getElementById(name + "-temp").value);
		if (!isNaN(temp_abi)) return;
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