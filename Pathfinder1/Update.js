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
	let current = parseInt(document.getElementById("Current-HP").value);
	current = isNaN(current) ? 0 : current;
	let temp = parseInt(document.getElementById("Temp-HP").value);
	temp = isNaN(temp) ? 0 : temp;
	let nonlethal = parseInt(document.getElementById("Non-Lethal-Dmg").value);
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
	ModifyHP();
}

function MakeMelee () {
	const list = document.getElementById("MeleeList");
	
	let div = document.createElement("div");
	div.setAttribute("class","black");
	div.setAttribute("style","width:100px;height:60px;margin-right:8px");
		let span = document.createElement("span");
		span.innerHTML = "Melee";
		div.appendChild(span);
		
		let label = document.createElement("label");
		label.setAttribute("class","blackLabel");
		label.innerHTML = "Melee Attack";
		div.appendChild(label);
	list.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:220px;height:60px;float:left");
		let input = document.createElement("input");
		input.setAttribute("type","text");
		input.setAttribute("class","MeleeName");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:80px");
		label.innerHTML = "Weapon Name";
		div.appendChild(label);
	list.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:140px;height:60px;float:left");
		input = document.createElement("input");
		input.setAttribute("type","text");
		input.setAttribute("class","MeleeAtk");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:70px");
		label.innerHTML = "Attack Bonus";
		div.appendChild(label);
	list.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:140px;height:60px;float:left");
		input = document.createElement("input");
		input.setAttribute("type","text");
		input.setAttribute("class","MeleeDmg");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
		label.innerHTML = "Damage";
		div.appendChild(label);
	list.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:80px;height:60px;float:left");
		input = document.createElement("input");
		input.setAttribute("type","text");
		input.setAttribute("class","MeleeCrit");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
		label.innerHTML = "Critical";
		div.appendChild(label);
	list.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:50px;height:60px;float:left");
		input = document.createElement("input");
		input.setAttribute("type","text");
		input.setAttribute("class","MeleeType");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
		label.innerHTML = "Type";
		div.appendChild(label);
	list.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:170px;height:50px;float:left");
		input = document.createElement("input");
		input.setAttribute("type","text");
		input.setAttribute("class","MeleeNote");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
		label.innerHTML = "Notes";
		div.appendChild(label);
	list.appendChild(div);
	
	list.appendChild(document.createElement("br"));
}
	//const list = document.getElementById("RangedList");