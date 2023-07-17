//These are functions that are called in real-time
function CloseOverlay() {
	document.getElementById("ConfirmDelete").onclick = null;
	document.getElementById("DeleteCustom").onclick = null;
	document.getElementById("overlay").style.display = "none";
	document.getElementById('CustomMenu').style.display = 'none';
	document.getElementById('ConfirmMenu').style.display = 'none';
	document.getElementById('GearMenu').style.display = 'none';
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

function GetListByType (type) {
	document.getElementById('overlay').style.display = document.getElementById('CustomMenu').style.display = 'block';
	switch (type) {
		case "Feat":
			document.getElementById('CustomType').title = "General/Combat/Metamagic/Teamwork/etc...";
			return document.getElementById('FeatList');
		case "Special Ability":
			document.getElementById('CustomType').title = "Ex/Su/Sp";
			return document.getElementById('SpecialAbilityList');
		case "Trait":
			document.getElementById('CustomType').title = "Combat/Campaign/Race/Religion/etc...";
			return document.getElementById('TraitList');
	}
}

function EditCustom (button, type) { //Feat/Special Ability/Trait
	document.getElementById('CustomMenuName').innerHTML = "<b>Edit " + type + "</b>";
	document.getElementById('CreateCustom').innerText = "Ok";
	document.getElementById('DeleteCustom').innerText = "Delete";
	document.getElementById('CustomName' ).value = button.dataset.name;
	document.getElementById('CustomType' ).value = button.dataset.type;
	document.getElementById('CustomNotes').value = button.dataset.notes;
	const list = GetListByType(type);
	
	document.getElementById('CreateCustom').onclick = () => {
		const name = document.getElementById('CustomName').value;
		const type = document.getElementById('CustomType').value;
		button.innerHTML = "<b>" + name + "</b> <i>(" + type + ")</i>";
		button.dataset.name  = name;
		button.dataset.type  = type;
		button.dataset.notes = document.getElementById('CustomNotes').value;
		SaveToCloudFlare();
		CloseOverlay();
	};
	
	document.getElementById('DeleteCustom').onclick = () => {
		document.getElementById('CustomMenu').style.display = 'none';
		document.getElementById('ConfirmMenu').style.display = 'block';
		
		document.getElementById('ConfirmDelete').onclick = () => {
			document.getElementById("ConfirmCancel").onclick = CloseOverlay;
			button.remove();
			CloseOverlay();
			SaveToCloudFlare();
		};
		document.getElementById("ConfirmCancel").onclick = () => {
			document.getElementById("ConfirmCancel").onclick = CloseOverlay;
			document.getElementById('CustomMenu').style.display = 'block';
			document.getElementById('ConfirmMenu').style.display = 'none';
		};
	};
}

function AddCustomButton (list, name, type, notes) {
	const button = document.createElement("button");
		button.onclick = () => EditCustom(button, type);
		button.style = "font-size:50%"
		button.className = "custom";
		button.innerHTML = "<b>" + name + "</b> <i>(" + type + ")</i>";
		button.dataset.name  = name;
		button.dataset.type  = type;
		button.dataset.notes = notes;
	list.appendChild(button);
}

function AddCustom (type){ //Feat/Special Ability/Trait
	document.getElementById('CustomMenuName').innerHTML = "<b>New " + type + "</b>";
	document.getElementById('CreateCustom').innerText = "Create";
	document.getElementById('DeleteCustom').innerText = "Cancel";
	document.getElementById('CustomName' ).value = "";
	document.getElementById('CustomType' ).value = "";
	document.getElementById('CustomNotes').value = "";
	const list = GetListByType(type);
	
	document.getElementById('CreateCustom').onclick = () => {
		const name = document.getElementById('CustomName').value;
		const type = document.getElementById('CustomType').value;
		const notes = document.getElementById('CustomNotes').value;
		AddCustomButton(list, name, type, notes);
		
		SaveToCloudFlare();
		CloseOverlay();
	};
	document.getElementById('DeleteCustom').onclick = CloseOverlay;
}

function EditGear (button) {
	document.getElementById('GearMenuName').innerHTML = "<b>Edit Gear</b>";
	document.getElementById('CreateGear').innerText = "Ok";
	document.getElementById('DeleteGear').innerText = "Delete";
	document.getElementById('GearName'		).value = button.dataset.name;
	document.getElementById('GearType'		).value = button.dataset.type;
	document.getElementById('GearLocation'	).value	= button.dataset.loc;
	document.getElementById('GearQuantity'	).value	= button.dataset.qty;
	document.getElementById('GearWeight'	).value = button.dataset.wt;
	document.getElementById('GearNotes'		).value = button.dataset.notes;
	document.getElementById('overlay').style.display = document.getElementById('GearMenu').style.display = 'block';
	
	document.getElementById('CreateGear').onclick = () => {
		const name  = document.getElementById('GearName').value;
		const type  = document.getElementById('GearType').value;
		button.innerHTML = "<b>" + name + "</b> <i>(" + type + ")</i>";
		button.dataset.name  = name;
		button.dataset.type  = type;
		button.dataset.loc   = document.getElementById('GearLocation').value;
		button.dataset.qty   = document.getElementById('GearQuantity').value;
		button.dataset.wt    = document.getElementById('GearWeight').value;
		button.dataset.notes = document.getElementById('GearNotes').value;
		SaveToCloudFlare();
		CloseOverlay();
	};
	
	document.getElementById('DeleteGear').onclick = () => {
		document.getElementById('GearMenu').style.display = 'none';
		document.getElementById('ConfirmMenu').style.display = 'block';
		
		document.getElementById('ConfirmDelete').onclick = () => {
			document.getElementById("ConfirmCancel").onclick = CloseOverlay;
			button.remove();
			CloseOverlay();
			SaveToCloudFlare();
		};
		document.getElementById("ConfirmCancel").onclick = () => {
			document.getElementById("ConfirmCancel").onclick = CloseOverlay;
			document.getElementById('GearMenu').style.display = 'block';
			document.getElementById('ConfirmMenu').style.display = 'none';
		};
	};
}

function AddGearButton (list, name, type, loc, qty, wt, notes){
	const button = document.createElement("button");
		button.onclick = () => EditGear(button);
		button.style = "font-size:90%;float:left"
		button.className = "custom";
		button.innerHTML = "<b>" + name + "</b> <i>(" + type + ")</i>";
		button.dataset.name  = name;
		button.dataset.type  = type;
		button.dataset.loc   = loc;
		button.dataset.qty   = qty;
		button.dataset.wt    = wt;
		button.dataset.notes = notes;
	list.appendChild(button);
}

function AddGear (list){
	document.getElementById('GearMenuName').innerHTML = "<b>New Gear</b>";
	document.getElementById('CreateGear').innerText = "Create";
	document.getElementById('DeleteGear').innerText = "Cancel";
	document.getElementById('GearName').value = "";
	document.getElementById('GearType').value = "";
	document.getElementById('GearLocation').value = "";
	document.getElementById('GearQuantity').value = "";
	document.getElementById('GearWeight').value = "";
	document.getElementById('GearNotes').value = "";
	document.getElementById('overlay').style.display = document.getElementById('GearMenu').style.display = 'block';
	
	document.getElementById('CreateGear').onclick = () => {
		const name  = document.getElementById('GearName').value;
		const type  = document.getElementById('GearType').value;
		const loc   = document.getElementById('GearLocation').value;
		const qty   = document.getElementById('GearQuantity').value;
		const wt    = document.getElementById('GearWeight').value;
		const notes = document.getElementById('GearNotes').value;
		AddGearButton(list, name, type, loc, qty, wt, notes);
		
		SaveToCloudFlare();
		CloseOverlay();
	};
	document.getElementById('DeleteGear').onclick = CloseOverlay;
}

function AddSkill(type) {
	const AdjustedName = type.charAt(0).toUpperCase() + type.slice(1);
	type = type.replace('*','');
	
	const SkillRow = document.getElementById(type + "-row");
	const index = SkillRow.rowIndex;
	let uid = parseInt(SkillRow.dataset.index);
	if (isNaN(uid)) uid = 0;
	const row = document.getElementById("Skill-Table").insertRow(index);
	row.id = type + uid; //Needed for deletion
	SkillRow.dataset.index = uid + 1;
	let i = 0;
	
	let td = row.insertCell(i++); //Class Skill
		let input = document.createElement("input");
		input.setAttribute("type","checkbox");
	td.innerHTML = input.outerHTML;
	
	td = row.insertCell(i++); //Name of Skill
		let div = document.createElement("div");
			div.innerText = AdjustedName;
			div.style = "all:unset";
			div.setAttribute("onmouseover","innerText='Delete?'");
			div.setAttribute("onmouseout","innerText='" + AdjustedName + "'");
			let overlayFunc = "document.getElementById('overlay').style.display = ";
				overlayFunc += "document.getElementById('ConfirmMenu').style.display = 'block';";
				overlayFunc += "document.getElementById('ConfirmDelete').onclick = function () {"
				overlayFunc += "const rowIndex = document.getElementById('" + row.id + "').rowIndex;"
				overlayFunc += "document.getElementById('Skill-Table').deleteRow(rowIndex);"
				overlayFunc += "SaveToCloudFlare();CloseOverlay();}"
		div.setAttribute("onclick", overlayFunc);
	td.innerHTML = div.outerHTML + " <input style='width:145px;text-align:left;display:inline'/>";

	td = row.insertCell(i++); //Total Skill Value
		input = document.createElement("input");
		input.setAttribute("style","width:50px");
	td.innerHTML = input.outerHTML;
	
	td = row.insertCell(i++); //Ability Score Tied
		td.style.textAlign = "center";
		let mod = 0;
		switch (type) {
			case "artistry":case "craft":case "lore": mod = "int"; break;
			case "perform": 						   mod = "cha"; break;
			case "profession":						   mod = "wis"; break;
		}
	td.innerHTML = mod.charAt(0).toUpperCase() + mod.slice(1);
	
	td = row.insertCell(i++); //Ability Modifier
		input = document.createElement("input");
		input.setAttribute("class",'green ' + mod + '-temp-mod');
		input.setAttribute("style","width:50px");
		input.disabled = true;
		input.setAttribute("onfocusout","alert('test')");
	td.innerHTML = input.outerHTML;
	
	td = row.insertCell(i++); //Skill Ranks
		input = document.createElement("input");
		input.setAttribute("style","width:50px");
	td.innerHTML = input.outerHTML;
	
	td = row.insertCell(i++); //Skill Class
		input = document.createElement("input");
		input.setAttribute("style","width:50px");
	td.innerHTML = input.outerHTML;
	
	td = row.insertCell(i++); //Skill Racial
		input = document.createElement("input");
		input.setAttribute("style","width:50px");
	td.innerHTML = input.outerHTML;
	
	td = row.insertCell(i++); //Skill Trait
		input = document.createElement("input");
		input.setAttribute("style","width:50px");
	td.innerHTML = input.outerHTML;
	
	td = row.insertCell(i++); //Skill Misc
		input = document.createElement("input");
		input.setAttribute("style","width:260px");
	td.innerHTML = input.outerHTML;
	
	if (document.getElementById("CharacterIndex").value != "") { //Strangers don't get to save.
		span.querySelectorAll('input').forEach(inp => {
			inp.addEventListener('focusin', _ => inp.oldValue = inp.value);
			inp.addEventListener('focusout', _ => {
				if (inp.value != inp.oldValue) SaveToCloudFlare();
				delete inp.oldValue; //Garbage Collection
			});
		});
	}
	
	return row;
}

function AddACItem () {
	const span = document.createElement("span");
	span.setAttribute("style","clear:both");
	
	let div = document.createElement("div");
	div.setAttribute("class","black");
	div.setAttribute("style","width:110px;height:40px");
		let smallSpan = document.createElement("span");
		smallSpan.setAttribute("style","font-size:25px");
		smallSpan.innerHTML = "AC Item";
		div.appendChild(smallSpan);
		
		let label = document.createElement("label");
		label.setAttribute("class","blackLabel");
		
		div.setAttribute("onmouseover","childNodes[0].innerHTML = 'X';" + 
						"childNodes[1].innerHTML = 'Press to Delete'");
						
		div.setAttribute("onmouseout","childNodes[0].innerHTML = 'AC Item';childNodes[1].innerHTML = null");
		
		div.onclick = () => {
			document.getElementById('overlay').style.display = document.getElementById('ConfirmMenu').style.display = 'block';
			document.getElementById('ConfirmDelete').onclick = function () {
				span.remove();
				CloseOverlay();
				SaveToCloudFlare();
			}
		};
	div.appendChild(label);
	span.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:170px;height:60px;float:left");
		let input = document.createElement("input");
		input.setAttribute("class","AC-Name");
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
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
		label.innerHTML = "Bonus";
	div.appendChild(label);
	span.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:70px;height:60px;float:left");
		input = document.createElement("input");
		input.setAttribute("class","AC-Type");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:80px");
		label.innerHTML = "Type";
	div.appendChild(label);
	span.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:55px;height:60px;float:left");
		input = document.createElement("input");
		input.setAttribute("class","AC-Penalty");
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
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:70px");
		label.innerHTML = "Spell Failure";
	div.appendChild(label);
	span.appendChild(div);
	
	div = document.createElement("div");
	div.setAttribute("style","width:380px;height:60px;float:left");
		input = document.createElement("input");
		input.setAttribute("class","AC-Notes");
		div.appendChild(input);
		
		label = document.createElement("label");
		label.setAttribute("style","font-size:12px;line-height:20px;width:170px");
		label.innerHTML = "Notes & Properties";
	div.appendChild(label);
	span.appendChild(div);
	
	if (document.getElementById("CharacterIndex").value != "") { //Strangers don't get to save.
		span.querySelectorAll('input').forEach(inp => {
			inp.addEventListener('focusin', _ => inp.oldValue = inp.value);
			inp.addEventListener('focusout', _ => {
				if (inp.value != inp.oldValue) SaveToCloudFlare();
				delete inp.oldValue; //Garbage Collection
			});
		});
	}
	
	document.getElementById("ACList").appendChild(span);
	return span;
}

function AddAttack (type) {
	const span = document.createElement("span");
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
		
		div.onclick = () => {
			document.getElementById('overlay').style.display = document.getElementById('ConfirmMenu').style.display = 'block';
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
			div.appendChild(input);
			
			label = document.createElement("label");
			label.setAttribute("style","font-size:12px;line-height:20px;width:60px");
			label.innerHTML = "Ammo";
		div.appendChild(label);
		span.appendChild(div);
	}
	
	if (document.getElementById("CharacterIndex").value != "") { //Strangers don't get to save.
		span.querySelectorAll('input').forEach(inp => {
			inp.addEventListener('focusin', _ => inp.oldValue = inp.value);
			inp.addEventListener('focusout', _ => {
				if (inp.value != inp.oldValue) SaveToCloudFlare();
				delete inp.oldValue; //Garbage Collection
			});
		});
	}
	
	document.getElementById(type + "List").appendChild(span);
	return span;
}

function AddInventory () {
	const list = document.getElementById("InventoryList");
		const special_div = document.createElement("div");
			special_div.setAttribute("style","width:1000px;height:0px;float:left");
	list.appendChild(special_div);
	
	const details = document.createElement("details");
		details.setAttribute("style","padding-left:15px");
		details.open = true;
		
		const summary = document.createElement("summary");
			summary.setAttribute("style","float:left;font-size:120%;font-weight:normal");
			
			const i = document.createElement("span");
				i.contentEditable = true;
				i.innerText = "Name of Container";
				i.setAttribute("style","font-size:100%;background-color:#333333;padding:3px 5px");
			summary.appendChild(i);
			
			let button = document.createElement("button"); //Delete Button
				button.type = "button";
				button.className = "custom";
				button.setAttribute("style","background-color:dimgray;font-size:60%;height:auto;margin-left:8px");
				button.innerText = "X";
				button.onclick = () => {
					document.getElementById('overlay').style.display = document.getElementById('ConfirmMenu').style.display = 'block';
					document.getElementById('ConfirmDelete').onclick = function () {
						details.remove();
						special_div.remove();
						CloseOverlay();
						SaveToCloudFlare();
					}
				};
			summary.appendChild(button);
	details.appendChild(summary);
		
		let div = document.createElement("div");
			div.setAttribute("style","width:1000px;height:0px;float:left");
	details.appendChild(div);
	
		div = document.createElement("div");
			div.setAttribute("style","width:55px;height:60px;float:left;padding-left:20px");
			
			const input = document.createElement("input");
				input.disabled = true;
				input.className = "green weight";
			div.appendChild(input);
			
			const label = document.createElement("label");
				label.setAttribute("style","font-size:12px;line-height:20px;width:65px");
				label.innerText = "Weight";
			div.appendChild(label);
	details.appendChild(div);
	
		button = document.createElement("button");
			button.setAttribute("style","float:left");
			button.innerText = "+Gear";
	details.appendChild(button);
	
		div = document.createElement("div");
			div.className = "GearList";
			button.onclick = () => AddGear(div);
	details.appendChild(div);
	
	list.appendChild(details);
	return details;
}