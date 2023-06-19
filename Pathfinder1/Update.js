//This code runs like an update loop.
function ModifyAbility (name) {
	SaveToCloudFlare();
	const abi = document.getElementById(name).value;
	document.getElementById("str-mod").value = abi;
	if (typeof abi != 'number') return; //Invalid number
	document.getElementById("str-mod").value = abi * 2;
	const mod = Math.floor((abi - 10)/2);
	
	if (!name.includes("temp")) { //If original ability score
		document.getElementById(name + "-mod").value = mod;
		const temp_abi = document.getElementById(name + "-temp").value;
		if (typeof temp_abi == 'number') return; //If there's a valid number, return.
	}
	
	const elements = document.getElementsByClassName(name + "-temp-mod");
	for (const element of elements) elements[i].value = mod;
}