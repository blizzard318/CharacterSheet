//These are functions that are called in real-time
function CloseOverlay() {
	document.getElementById("ConfirmDelete").onclick = null;
	document.getElementById("DeleteCustom").onclick = null;
	document.getElementById("overlay").style.display = "none";
	document.getElementById('CustomMenu').style.display = 'none';
	document.getElementById('ConfirmMenu').style.display = 'none';
}

function GetMod (name, defval) {
	const abi = parseInt(document.getElementById(name).value);
	const mod = Math.floor((abi - 10)/2);
	return isNaN(mod) ? defval : mod;
}

function ModifyAbility (name) {
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
	const elements = document.getElementsByClassName("BAB");
	for (const element of elements) element.value = value;
}

function ModifyHP () {
	let base = parseInt(document.getElementById("Base-HP").value);
	base = isNaN(base) ? 0 : base;
	let temp = parseInt(document.getElementById("Temp-HP").value);
	temp = isNaN(temp) ? 0 : temp;
	let nonlethal = parseInt(document.getElementById("Non-Lethal-Dmg").value);
	nonlethal = isNaN(nonlethal) ? 0 : nonlethal;
	
	document.getElementById("Current-HP").value = base + temp - nonlethal;
}

function AddCustom (type){ //Feat/Special Ability/Trait
	document.getElementById('CustomMenuName').innerText = type;
	document.getElementById('overlay').style.display = 'block';
	document.getElementById('CustomMenu').style.display = 'block';
	document.getElementById('DeleteCustom').onclick = function () {
		const rowIndex = document.getElementById('" + row.id + "').rowIndex;
		document.getElementById('Skill-Table').deleteRow(rowIndex);
		CloseOverlay();
	}
}

function AddSkill(type) {
	const index = document.getElementById(type + "-row").rowIndex;
	const row = document.getElementById("Skill-Table").insertRow(index);
	let i = 0;
	
	let td = row.insertCell(i++); //Class Skill
		let input = document.createElement("input");
		input.setAttribute("type","checkbox");
		input.setAttribute("onclick","SaveToCloudFlare()");
	td.innerHTML = input.outerHTML;
	
	td = row.insertCell(i++); //Name of Skill
		let div = document.createElement("div");
		div.innerText = type.charAt(0).toUpperCase() + type.slice(1);
		div.style = "all:unset";
		div.setAttribute("onfocusout","SaveToCloudFlare()");
		div.setAttribute("onmouseover","innerText='Delete?'");
		div.setAttribute("onmouseout","innerText='" + type.charAt(0).toUpperCase() + type.slice(1) + "'");
		let overlayFunc = "document.getElementById('overlay').style.display = 'block';";
		overlayFunc += "document.getElementById('ConfirmMenu').style.display = 'block';";
		overlayFunc += "document.getElementById('ConfirmDelete').onclick = function () {"
		overlayFunc += "const rowIndex = document.getElementById('" + row.id + "').rowIndex;"
		overlayFunc += "document.getElementById('Skill-Table').deleteRow(rowIndex);"
		overlayFunc += "CloseOverlay();}"
		div.setAttribute("onclick", overlayFunc);
	td.innerHTML = div.outerHTML + "<input style='width:145px;text-align:left;display:inline'/>";

	td = row.insertCell(i++); //Total Skill Value
		input = document.createElement("input");
		input.setAttribute("style","width:50px");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
	td.innerHTML = input.outerHTML;
	
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
		input = document.createElement("input");
		input.setAttribute("class",'green ' + mod + '-temp-mod');
		input.setAttribute("style","width:50px");
		input.setAttribute("readonly","readonly");
	td.innerHTML = input.outerHTML;
	
	td = row.insertCell(i++); //Skill Ranks
		input = document.createElement("input");
		input.setAttribute("style","width:50px");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
	td.innerHTML = input.outerHTML;
	
	td = row.insertCell(i++); //Skill Class
		input = document.createElement("input");
		input.setAttribute("style","width:50px");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
	td.innerHTML = input.outerHTML;
	
	td = row.insertCell(i++); //Skill Racial
		input = document.createElement("input");
		input.setAttribute("style","width:50px");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
	td.innerHTML = input.outerHTML;
	
	td = row.insertCell(i++); //Skill Trait
		input = document.createElement("input");
		input.setAttribute("style","width:50px");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
	td.innerHTML = input.outerHTML;
	
	td = row.insertCell(i++); //Skill Misc
		input = document.createElement("input");
		input.setAttribute("style","width:260px");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
	td.innerHTML = input.outerHTML;
	
	return row;
}

function AddACItem () {
	let span = document.createElement("span");
	span.setAttribute("style","clear:both");
	
	let div = document.createElement("div");
	div.setAttribute("class","black");
	div.setAttribute("style","width:100px;height:40px");
		let smallSpan = document.createElement("span");
		smallSpan.setAttribute("style","font-size:25px");
		smallSpan.innerHTML = "AC Item";
		div.appendChild(smallSpan);
		
		let label = document.createElement("label");
		label.setAttribute("class","blackLabel");
		
		div.setAttribute("onmouseover","childNodes[0].innerHTML = 'X';" + 
						"childNodes[1].innerHTML = 'Press to Delete'");
						
		div.setAttribute("onmouseout","childNodes[0].innerHTML = 'AC Item';childNodes[1].innerHTML = null");
		
		div.onclick = function () {
			document.getElementById('overlay').style.display = 'block';
			document.getElementById('ConfirmMenu').style.display = 'block';
			document.getElementById('ConfirmDelete').onclick = function () {
				span.remove();
				CloseOverlay();
			}
		};
	div.appendChild(label);
	span.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:170px;height:60px;float:left");
		let input = document.createElement("input");
		input.setAttribute("class","AC-Name");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
		label.innerHTML = "Name";
	div.appendChild(label);
	span.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:55px;height:60px;float:left");
		input = document.createElement("input");
		input.setAttribute("class","AC-Bonus");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
		label.innerHTML = "Bonus";
	div.appendChild(label);
	span.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:100px;height:60px;float:left");
		input = document.createElement("input");
		input.setAttribute("class","AC-Type");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
		label.innerHTML = "Type";
	div.appendChild(label);
	span.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:55px;height:60px;float:left");
		input = document.createElement("input");
		input.setAttribute("class","AC-Penalty");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:70px");
		label.innerHTML = "Check Penalty";
	div.appendChild(label);
	span.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:55px;height:60px;float:left");
		input = document.createElement("input");
		input.setAttribute("class","AC-Failure");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:70px");
		label.innerHTML = "Spell Failure";
	div.appendChild(label);
	span.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:350px;height:60px;float:left");
		input = document.createElement("input");
		input.setAttribute("class","AC-Notes");
		input.setAttribute("onfocusout","SaveToCloudFlare()");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:70px");
		label.innerHTML = "Notes";
	div.appendChild(label);
	span.appendChild(div);
	
	document.getElementById("ACList").appendChild(span);
}

function AddAttack (type) {
	let span = document.createElement("span");
	span.setAttribute("style","clear:both");
	
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
			document.getElementById('ConfirmMenu').style.display = 'block';
			document.getElementById('ConfirmDelete').onclick = function () {
				span.remove();
				CloseOverlay();
				SaveToCloudFlare();
			}
		};
	div.appendChild(label);
	span.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:220px;height:50px;float:left");
		let input = document.createElement("input");
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
	return span;
}