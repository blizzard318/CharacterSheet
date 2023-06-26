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

function AddSkill(type) {
	const index = document.getElementById(type + "-row").rowIndex;
	const row = document.getElementById("Skill-Table").insertRow(index);
	row.id = type + index;
	let i = 0;
	
	let td = row.insertCell(i++); //Class Skill
	td.innerHTML = "<input type='checkbox' id='"  + type + "-class-skill'>";
	
	td = row.insertCell(i++); //Name of Skill
		let prefix = "<div style='all:unset'";
		prefix += "onmouseover=\"innerText='Delete?'\"";
		prefix += "onmouseout=\"innerText='" + type.charAt(0).toUpperCase() + type.slice(1) + "'\"";
		prefix += "onmouseup=\"document.getElementById('Skill-Table').deleteRow(";
		prefix += "document.getElementById('" + row.id  + "').rowIndex)\">";
		prefix += type.charAt(0).toUpperCase() + type.slice(1) + "</div>";
		
		let suffix = " <input type='text' class='" + type + "-name'";
		suffix += "style='width:145px;text-align:left;display:inline'/>";
	td.innerHTML = prefix + suffix;

	td = row.insertCell(i++); //Total Skill Value
	td.innerHTML = "<input type='text' class='" + type + "-total' style='width:50px'/>";
	
	td = row.insertCell(i++); //Ability Score Tied
		td.style.textAlign = "center";
		let mod = 0;
		switch (type) {
			case "artistry":case "craft":case "lore": mod = "int"; break;
			case "perform": 						  mod = "cha"; break;
			case "profession": 						  mod = "wis"; break;
		}
	td.innerHTML = mod.charAt(0).toUpperCase() + mod.slice(1);
	
	td = row.insertCell(i++); //Ability Modifier
	td.innerHTML = "<input type='text' class='green " + mod + "-temp-mod' readonly='readonly' style='width:50px'/>";
	
	td = row.insertCell(i++); //Skill Ranks
	td.innerHTML = "<input type='text' class='" + type + "-rank' style='width:50px'/>";
	
	td = row.insertCell(i++); //Skill Class
	td.innerHTML = "<input type='text' class='" + type + "-class' style='width:50px'/>";
	
	td = row.insertCell(i++); //Skill Racial
	td.innerHTML = "<input type='text' class='" + type + "-racial' style='width:50px'/>";
	
	td = row.insertCell(i++); //Skill Trait
	td.innerHTML = "<input type='text' class='" + type + "-trait' style='width:50px'/>";
	
	td = row.insertCell(i++); //Skill Misc
	td.innerHTML = "<input type='text' class='" + type + "-misc' style='width:260px'/>";
}

function AddAttack (type) {
	const list = document.getElementById(type + "List");
	
	let div = document.createElement("div");
	div.setAttribute("class","black");
	div.setAttribute("style","width:100px;height:50px;margin-right:8px");
		let span = document.createElement("span");
		span.innerHTML = type;
		div.appendChild(span);
		
		let label = document.createElement("label");
		label.setAttribute("class","blackLabel");
		label.innerHTML = type + " Attack";
		
		div.setAttribute("onmouseover","childNodes[0].innerHTML = 'X';" + 
						"childNodes[1].innerHTML = 'Press to Delete'");
						
		div.setAttribute("onmouseout","childNodes[0].innerHTML = '" + type + "';" + 
						"childNodes[1].innerHTML = '" + type + " Attack'");
		
		let num = type == "Ranged" ? 7 : 6; //Disgustingly Hardcoded.
		let removal = "nextSibling.remove();".repeat(num) + "this.remove();";
		div.setAttribute("onmouseup",removal);
	div.appendChild(label);
	list.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:220px;height:50px;float:left");
		let input = document.createElement("input");
		input.setAttribute("type","text");
		input.setAttribute("class",type + "Name");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:80px");
		label.innerHTML = "Weapon Name";
	div.appendChild(label);
	list.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:140px;height:50px;float:left");
		input = document.createElement("input");
		input.setAttribute("type","text");
		input.setAttribute("class",type + "Atk");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:70px");
		label.innerHTML = "Attack Bonus";
	div.appendChild(label);
	list.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:140px;height:50px;float:left");
		input = document.createElement("input");
		input.setAttribute("type","text");
		input.setAttribute("class",type + "Dmg");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
		label.innerHTML = "Damage";
	div.appendChild(label);
	list.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:80px;height:50px;float:left");
		input = document.createElement("input");
		input.setAttribute("type","text");
		input.setAttribute("class",type + "Crit");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
		label.innerHTML = "Critical";
	div.appendChild(label);
	list.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:50px;height:50px;float:left");
		input = document.createElement("input");
		input.setAttribute("type","text");
		input.setAttribute("class",type + "Type");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
		label.innerHTML = "Type";
	div.appendChild(label);
	list.appendChild(div);
	
	if (type == "Melee") {
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
	} else if (type == "Ranged") {
		div = document.createElement("div");
		div.setAttribute("style","width:70px;height:50px;float:left");
			input = document.createElement("input");
			input.setAttribute("type","text");
			input.setAttribute("class","RangedRange");
			input.setAttribute("onfocusout","SaveToCloudFlare()");
			div.appendChild(input);
			
			label = document.createElement("label");
			label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
			label.innerHTML = "Range";
		div.appendChild(label);
		list.appendChild(div);
		
		div = document.createElement("div");
		div.setAttribute("style","width:80px;height:50px;float:left");
			input = document.createElement("input");
			input.setAttribute("type","text");
			input.setAttribute("class","RangedAmmo");
			input.setAttribute("onfocusout","SaveToCloudFlare()");
			div.appendChild(input);
			
			label = document.createElement("label");
			label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
			label.innerHTML = "Ammo";
		div.appendChild(label);
		list.appendChild(div);
	}
}