//This code runs like an update loop.
function ModifyAbility (name) {
	SaveToCloudFlare();
	const abi = parseInt(document.getElementById(name).value);
	if (typeof abi != 'number') return; //Invalid number
	const mod = Math.floor((abi - 10)/2);
	
	if (!name.includes("temp")) { //If original ability score
		document.getElementById(name + "-mod").value = mod;
		const temp_abi = parseInt(document.getElementById(name + "-temp").value);
		if (temp_abi != null && temp_abi != "" && temp_abi == typeof temp_abi == 'number') return;
	}
	
	const elements = document.getElementsByClassName(name + "-temp-mod");
	for (const element of elements) elements[i].value = mod;
}