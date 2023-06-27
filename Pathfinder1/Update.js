//This code runs like an update loop.
function CloseOverlay() {
	document.getElementById("ConfirmDelete").onclick = null;
	document.getElementById("overlay").style.display = "none";
}

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
	let base = parseInt(document.getElementById("Base-HP").value);
	base = isNaN(base) ? 0 : base;
	let temp = parseInt(document.getElementById("Temp-HP").value);
	temp = isNaN(temp) ? 0 : temp;
	let nonlethal = parseInt(document.getElementById("Non-Lethal-Dmg").value);
	nonlethal = isNaN(nonlethal) ? 0 : nonlethal;
	
	document.getElementById("Current-HP").value = base + temp - nonlethal;
}

function UpdateOnStart() { //Call this on start
	ModifyAbility("str");
	ModifyAbility("dex");
	ModifyAbility("con");
	ModifyAbility("int");
	ModifyAbility("wis");
	ModifyAbility("cha");
	ModifyHP();
	
	//Remembers if you had the details closed or opened.
	document.querySelectorAll('details').forEach(deet => {
		deet.open = localStorage.getItem(deet.id) === 'true';
		
		deet.addEventListener('toggle', _ => localStorage.setItem(deet.id, deet.open));
	});
}

function AddSkill(type) {
	const index = document.getElementById(type + "-row").rowIndex;
	const row = document.getElementById("Skill-Table").insertRow(index);
	row.id = type + index;
	let i = 0;
	
	let td = row.insertCell(i++); //Class Skill
	td.innerHTML = "<input type='checkbox' id='"  + type + "-class-skill'>";
	
	td = row.insertCell(i++); //Name of Skill
		let div = document.createElement("div");
		div.innerText = type.charAt(0).toUpperCase() + type.slice(1);
		div.style = "all:unset";
		div.setAttribute("onmouseover","innerText='Delete?'");
		div.setAttribute("onmouseout","innerText='" + type.charAt(0).toUpperCase() + type.slice(1) + "'");
		div.setAttribute("onclick","document.getElementById('Skill-Table').deleteRow(document.getElementById("+row.id+").rowIndex)");

		let suffix = " <input type='text' class='" + type + "-name'";
		suffix += "style='width:145px;text-align:left;display:inline'/>";
	td.innerHTML = div.outerHTML + suffix;
	td.onmouseover = function () {"innerText='Delete?";}

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
	let span = document.createElement("span");
	span.setAttribute("style","clear:both");
	span.setAttribute("id","BIG DIV");
	
	let div = document.createElement("div");
	div.setAttribute("class","black");
	div.setAttribute("style","width:100px;height:50px;margin-right:8px");
		let smallSpan = document.createElement("span");
		smallSpan.innerHTML = type;
		div.appendChild(smallSpan);
		
		let label = document.createElement("label");
		label.setAttribute("class","blackLabel");
		label.innerHTML = type + " Attack";
		
		div.setAttribute("onmouseover","childNodes[0].innerHTML = 'X';" + 
						"childNodes[1].innerHTML = 'Press to Delete'");
						
		div.setAttribute("onmouseout","childNodes[0].innerHTML = '" + type + "';" + 
						"childNodes[1].innerHTML = '" + type + " Attack'");
		
		div.onclick = function () {
			document.getElementById('overlay').style.display = 'block';
			document.getElementById('ConfirmDelete').onclick = function () {
				span.remove();
				CloseOverlay();
			}
		};
	div.appendChild(label);
	span.appendChild(div);
	
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
	span.appendChild(div);
	
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
	span.appendChild(div);
	
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
	span.appendChild(div);
	
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
	span.appendChild(div);
	
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
	span.appendChild(div);
	
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
		span.appendChild(div);
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
		span.appendChild(div);
		
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
		span.appendChild(div);
	}
	document.getElementById(type + "List").appendChild(span);
}