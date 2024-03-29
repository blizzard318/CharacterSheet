//These are functions that are called in real-time
function CloseOverlay() {
	document.getElementById("ConfirmDelete").onclick = null;
	document.getElementById("DeleteCustom").onclick = null;
	document.getElementById("overlay").style.display = "none";
	document.getElementById('CustomMenu').style.display = 'none';
	document.getElementById('ConfirmMenu').style.display = 'none';
	document.getElementById('GearMenu').style.display = 'none';
	document.getElementById('SpellListMenu').style.display = 'none';
	document.getElementById('SpellMenu').style.display = 'none';
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
		case "Quality":
			return document.getElementById('QualityList');
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
		button.innerHTML = "<b>" + name + "</b>";
		if (type != "") button.innerHTML +=  " <i>(" + type + ")</i>";
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
		button.innerHTML = "<b>" + name + "</b>";
		if (type != "") button.innerHTML +=  " <i>(" + type + ")</i>";
		button.dataset.name  = name;
		button.dataset.type  = type;
		button.dataset.notes = notes;
	list.appendChild(button);
}

function AddCustom (type){ //Feat/Special Ability/Trait
	document.getElementById('CustomMenuName').innerHTML = "<b>New " + type + "</b>";
	document.getElementById('CustomName' ).value = "";
	document.getElementById('CustomType' ).value = "";
	document.getElementById('CustomNotes').value = "";
	const list = GetListByType(type);
	
	document.getElementById('CreateCustom').innerText = "Create";
	document.getElementById('CreateCustom').onclick = () => {
		const name = document.getElementById('CustomName').value;
		const type = document.getElementById('CustomType').value;
		const notes = document.getElementById('CustomNotes').value;
		AddCustomButton(list, name, type, notes);
		
		SaveToCloudFlare();
		CloseOverlay();
	};
	document.getElementById('DeleteCustom').innerText = "Cancel";
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
	
	const inventories = document.getElementById("InventoryList").children;
	const select = document.getElementById('GearTransfer');
	select.parentElement.style.display = inventories.length > 0 ? 'block' : 'none';
	select.innerHTML = '';
	const exclude = Array.from(inventories).indexOf(button.parentNode.parentNode);
	
	select.add(new Option()); //Blank option do nothing.
	for (let i = 1; i < inventories.length; i += 2) {
		if (i != exclude) select.add(new Option(inventories[i].firstChild.firstChild.innerText, i));
	}
	
	document.getElementById('CreateGear').onclick = () => {
		if (select.value != '') inventories[select.value].lastChild.appendChild(button);
		const name  = document.getElementById('GearName').value;
		const type  = document.getElementById('GearType').value;
		button.innerHTML = "<b>" + name + "</b>";
		if (type != "") button.innerHTML +=  " <i>(" + type + ")</i>";
		button.dataset.name  = name;
		button.dataset.type  = type;
		button.dataset.loc   = document.getElementById('GearLocation').value;
		button.dataset.qty   = document.getElementById('GearQuantity').value;
		button.dataset.wt    = document.getElementById('GearWeight').value;
		button.dataset.notes = document.getElementById('GearNotes').value;
		SaveToCloudFlare();
		CloseOverlay();
		GetLocalWeight(button.parentElement);
	};
	
	document.getElementById('DeleteGear').onclick = () => {
		document.getElementById('GearMenu').style.display = 'none';
		document.getElementById('ConfirmMenu').style.display = 'block';
		
		document.getElementById('ConfirmDelete').onclick = () => {
			document.getElementById("ConfirmCancel").onclick = CloseOverlay;
			const list = button.parentElement;
			button.remove();
			CloseOverlay();
			SaveToCloudFlare();
			GetLocalWeight(list);
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
		button.innerHTML = "<b>" + name + "</b>";
		if (type != "") button.innerHTML +=  " <i>(" + type + ")</i>";
		button.dataset.name  = name;
		button.dataset.type  = type;
		button.dataset.loc   = loc;
		button.dataset.qty   = qty;
		button.dataset.wt    = wt;
		button.dataset.notes = notes;
	list.appendChild(button);
}

function GetLocalWeight (list) {
	let locval = 0;
	
	const Gears = list.childNodes;
	for (let Gear of Gears) {
		let weight = parseInt(Gear.dataset.wt);
		let quantity = parseInt(Gear.dataset.qty);
		if (isNaN(weight) || isNaN(quantity)) continue;
		locval += weight * quantity;
	}
	
	list.parentElement.getElementsByClassName("GearWeight")[0].value = locval;
	ModifyTotalWeight();
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
		GetLocalWeight(list);
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
		input.setAttribute('onfocusout', "UpdateSkillRanksAllocated('Background')");
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
			
			const span = document.createElement("span");
				span.innerText = "Name of Container";
				span.setAttribute("style","font-size:100%;background-color:#333333;padding:3px 5px");
			summary.appendChild(span);
			
			let rbutton = document.createElement("button"); //Rename Button
				rbutton.type = "button";
				rbutton.className = "custom";
				rbutton.setAttribute("style","background-color:dimgray;font-size:70%;height:auto;margin-left:5px");
				rbutton.innerText = "Rename";
				rbutton.onclick = () => {
					span.contentEditable = !span.isContentEditable;
					if (span.isContentEditable) { //Make it edittable.
						span.dataset.previousName = span.innerText;
						rbutton.innerText = "Complete";
						window.getSelection().selectAllChildren(span);
						span.focus();
						span.onblur = () => rbutton.click();
					}
					else { //Make it not-edittable.
						if (span.dataset.previousName != span.innerText) SaveToCloudFlare();
						delete span.dataset.previousName;
						rbutton.innerText = "Rename";
						window.getSelection().removeAllRanges();
						span.onblur = null;
					}
				};
			summary.appendChild(rbutton);
			
			let button = document.createElement("button"); //Delete Button
				button.type = "button";
				button.className = "custom";
				button.setAttribute("style","background-color:dimgray;font-size:70%;height:auto;margin-left:5px");
				button.innerText = "Delete";
				button.onclick = () => {
					document.getElementById('overlay').style.display = document.getElementById('ConfirmMenu').style.display = 'block';
					document.getElementById('ConfirmDelete').onclick = function () {
						details.remove();
						special_div.remove();
						CloseOverlay();
						SaveToCloudFlare();
						ModifyTotalWeight();
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
				input.className = "green GearWeight";
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
	
		div = document.createElement("div"); //List of Gear
			button.onclick = () => AddGear(div);
	details.appendChild(div);
	
	list.appendChild(details);
	return details;
}

function AddSpellList(){
	document.getElementById('SpellListName').value = "";
	document.getElementById('overlay').style.display = document.getElementById('SpellListMenu').style.display = 'block';
	
	document.getElementById('CreateSpellList').onclick = () => {
		const name = document.getElementById('SpellListName').value;
		const type = document.getElementById('SpellListType').value;
		const min  = document.getElementById('LowestSpellLevel').value;
		const max  = document.getElementById('HighestSpellLevel').value;
		AddSpellListTable(name,type,parseInt(min),parseInt(max));
		
		SaveToCloudFlare();
		CloseOverlay();
	};
}

function AddSpellListTable(name,type,min,max) {
	const list = document.getElementById("SpellListList");
		const special_div = document.createElement("div");
			special_div.setAttribute("style","width:1000px;height:0px;float:left");
	list.appendChild(special_div);
	
	const details = document.createElement("details");
		details.dataset.name = name;
		details.dataset.type = type;
		details.dataset.min = min;
		details.dataset.max = max;
		details.setAttribute("style","padding-left:10px");
		details.open = true;
		
		const summary = document.createElement("summary");
		summary.setAttribute("style","float:left;font-size:150%;font-weight:bold");
		summary.innerText = name + " Class Spells";
		details.appendChild(summary);
		
		const table = document.createElement("table");
			table.setAttribute("style","width:97%");
			
			let row = table.insertRow(-1);
				let td = document.createElement("th");
				td.innerHTML = "Spell Level";
			row.appendChild(td);
			
			for (let i = 0,j = min; i <= 9; i++,j++) {
				td = document.createElement("th");
				if (j <= max) {
					switch (j) {
						case 1:  td.innerHTML = "1st"; break;
						case 2:  td.innerHTML = "2nd"; break;
						case 3:  td.innerHTML = "3rd"; break;
						default: td.innerHTML = j + "th"; break;
					}
				}
				row.appendChild(td);
			}
			
			const ColumnCount = max - min;
			if (type == 's') { //Only spontaneous casters have Spells Known
				row = table.insertRow(-1);
				td = row.insertCell();
				td.style.textAlign = 'center';
				td.innerHTML = "Spell Known";
				
				for (let i = 0; i <= 9; i++) {
					td = row.insertCell();
						input = document.createElement("input");
						if (i > ColumnCount){
							input.setAttribute("style","width:50px;visibility:hidden");
							input.disabled = true;
						}else input.setAttribute("style","width:50px");
					td.innerHTML = input.outerHTML;
				}
			}
			
			row = table.insertRow(-1);
			td = row.insertCell();
			td.style.textAlign = 'center';
			td.innerHTML = "Spell DC";
			
			for (let i = 0; i <= 9; i++) {
				let td = row.insertCell();
					input = document.createElement("input");
					if (i > ColumnCount){
						input.setAttribute("style","width:50px;visibility:hidden");
						input.disabled = true;
					}else input.setAttribute("style","width:50px");
				td.innerHTML = input.outerHTML;
			}
			
			if (type == 's') { //Only spontaneous casters have Spells Casted
				row = table.insertRow(-1);
				td = row.insertCell();
				td.style.textAlign = 'center';
				td.innerHTML = "Spells Cast";
				
				for (let i = 0; i <= 9; i++) {
					td = row.insertCell();
						input = document.createElement("input");
						if ((min == 0 && i == 0) || i > ColumnCount){
							input.setAttribute("style","width:50px;visibility:hidden");
							input.disabled = true;
						}else input.setAttribute("style","width:50px");
					td.innerHTML = input.outerHTML;
				}
			}
			
			row = table.insertRow(-1);
			td = row.insertCell();
			td.style.textAlign = 'center';
			td.innerHTML = "Spells Per Day";
			
			for (let i = 0; i <= 9; i++) {
				td = row.insertCell();
					input = document.createElement("input");
					if ((type == 's' && min == 0 && i == 0) || i > ColumnCount){
						input.setAttribute("style","width:50px;visibility:hidden");
						input.disabled = true;
					}else input.setAttribute("style","width:50px");
				td.innerHTML = input.outerHTML;
			}
			
			row = table.insertRow(-1);
			td = row.insertCell();
			td.style.textAlign = 'center';
			td.innerHTML = "Bonus Spells";
			
			for (let i = 0; i <= 9; i++) {
				td = row.insertCell();
					input = document.createElement("input");
					if ((min == 0 && i == 0) || i > ColumnCount){
						input.setAttribute("style","width:50px;visibility:hidden");
						input.disabled = true;
					}else input.setAttribute("style","width:50px");
				td.innerHTML = input.outerHTML;
			}
		details.appendChild(table);
		
		details.appendChild(document.createElement("br"));
		
		let div = document.createElement("div");
			div.className = 'black';
			div.style = "width:130px;height:60px";
			
			let span = document.createElement("span");
				span.innerText = 'Conditional';
			div.appendChild(span);
			
			let label = document.createElement("label");
				label.className = 'blackLabel';
				label.innerText = 'Modifiers';
			div.appendChild(label);
		details.appendChild(div);
			
			
		div = document.createElement("div");
			div.style = "width:340px;height:60px;float:left";
			
			div.appendChild(document.createElement("input"));
			
			label = document.createElement("label");
				label.style = 'font-size:12px;line-height:20px;width:300px';
				label.innerText = 'Spell DC Modifiers';
			div.appendChild(label);
		details.appendChild(div);
		
		
		div = document.createElement("div");
			div.className = 'black';
			div.style = "width:130px;height:60px";
			
			span = document.createElement("span");
				span.innerText = 'Specialty';
			div.appendChild(span);
			
			label = document.createElement("label");
				label.className = 'blackLabel';
				label.innerText = 'School/Domain/Bloodline';
			div.appendChild(label);
		details.appendChild(div);
			
			
		div = document.createElement("div");
			div.style = "width:340px;height:60px;float:left";
			
			div.appendChild(document.createElement("input"));
			
			label = document.createElement("label");
				label.style = 'font-size:12px;line-height:20px;width:300px';
				label.innerText = 'Specialised & Opposed Schools, Bloodlines, Domains';
			div.appendChild(label);
		details.appendChild(div);
		
		for (let i = min; i <= max; i++) {
			div = document.createElement("div");
				div.style = "clear:both;text-align:left";
				
				const list = document.createElement("span"); //List of spells
					switch (i) {
						case 1:  list.dataset.type = "1st Level"; break;
						case 2:  list.dataset.type = "2nd Level"; break;
						case 3:  list.dataset.type = "3rd Level"; break;
						default: list.dataset.type = i + "th Level"; break;
					}
				const button = document.createElement("button");
					button.type = "button";
					button.innerText = '+' + list.dataset.type;
					list.dataset.type += " Spell";
				div.appendChild(button);
				
					button.onclick = () => { AddSpell(list.dataset.type, list, i); };
				div.appendChild(list); 
			details.appendChild(div);
		}
		
	list.appendChild(details);
	return details;
}

function EditSpell(button){
	const type = button.parentNode.dataset.type ?? button.parentNode.parentNode.firstElementChild .dataset.type;
	document.getElementById('SpellMenuName').innerHTML = "<b>Edit " + type + "</b>";
	document.getElementById('SpellName').value = button.dataset.name;
	document.getElementById('SpellDescription').value = button.dataset.description;
	document.getElementById('SpellLevel').value = button.dataset.level;
	document.getElementById('SpellUsed').value = button.dataset.used;
	document.getElementById('SpellPerDay').value = button.dataset.perday;
	document.getElementById('SpellSchool').value = button.dataset.school;
	document.getElementById('SpellSubschool').value = button.dataset.sub;
	document.getElementById('overlay').style.display = document.getElementById('SpellMenu').style.display = 'block';
	
	document.getElementById('CreateSpell').innerText = "Ok";
	document.getElementById('CreateSpell').onclick = () => {
		const name = document.getElementById('SpellName').value;
		const used = document.getElementById('SpellUsed').value;
		const perday = document.getElementById('SpellPerDay').value;
		
		button.innerHTML = "<b>" + name + "</b>";
		if (used != "") {
			button.innerHTML += " <i>[" + used;
			if (perday != "") button.innerHTML += "/" + perday;
			button.innerHTML += "]</i>";
		} else if (perday != "") button.innerHTML += " <i>[0/" + perday + "]</i>";
		
		button.dataset.name  		= name;
		button.dataset.description  = document.getElementById('SpellDescription').value;
		button.dataset.level   		= document.getElementById('SpellLevel').value;
		button.dataset.used   		= used;
		button.dataset.perday    	= perday;
		button.dataset.school 		= document.getElementById('SpellSchool').value;
		button.dataset.sub 			= document.getElementById('SpellSubschool').value;
		SaveToCloudFlare();
		CloseOverlay();
	};
	document.getElementById('DeleteSpell').innerText = "Delete";
	document.getElementById('DeleteSpell').onclick = () => {
		document.getElementById('SpellMenu').style.display = 'none';
		document.getElementById('ConfirmMenu').style.display = 'block';
		
		document.getElementById('ConfirmDelete').onclick = () => {
			document.getElementById("ConfirmCancel").onclick = CloseOverlay;
			button.remove();
			CloseOverlay();
			SaveToCloudFlare();
		};
		document.getElementById("ConfirmCancel").onclick = () => {
			document.getElementById("ConfirmCancel").onclick = CloseOverlay;
			document.getElementById('SpellMenu').style.display = 'block';
			document.getElementById('ConfirmMenu').style.display = 'none';
		};
	};
}

function AddSpellButton(list, name, description, level, used, perday, school, sub){
	const button = document.createElement("button");
		button.onclick = () => EditSpell(button);
		button.style = "font-size:70%"
		button.className = "custom";
		
		button.innerHTML = "<b>" + name + "</b>";
		if (used != "") {
			button.innerHTML += " <i>[" + used;
			if (perday != "") button.innerHTML += "/" + perday;
			button.innerHTML += "]</i>";
		} else if (perday != "") button.innerHTML += " <i>[0/" + perday + "]</i>";
		
		button.dataset.name  		= name;
		button.dataset.description  = description;
		button.dataset.level   		= level;
		button.dataset.used   		= used;
		button.dataset.perday    	= perday;
		button.dataset.school 		= school;
		button.dataset.sub 			= sub;
	list.appendChild(button);
}

function AddSpell(type, list, defaultLevel) {
	document.getElementById('SpellMenuName').innerHTML = "<b>New " + type + "</b>";
	document.getElementById('SpellName').value = "";
	document.getElementById('SpellDescription' ).value = "";
	document.getElementById('SpellLevel').value = "";
	document.getElementById('SpellUsed').value = "";
	document.getElementById('SpellPerDay').value = "";
	document.getElementById('SpellSchool').value = "";
	document.getElementById('SpellSubschool').value = "";
	document.getElementById('overlay').style.display = document.getElementById('SpellMenu').style.display = 'block';
	
	let casterType = list.parentNode.parentNode.dataset.type;
	document.getElementById('SpellLevel').parentNode.style.visibility = casterType == undefined ? "visible" : "hidden";
	casterType ??= list.dataset.type;
	document.getElementById('SpellUsed').parentNode.style.visibility  = casterType != 's' ? "visible" : "hidden";
	document.getElementById('SpellPerDay').parentNode.style.visibility = casterType != 's' ? "visible" : "hidden";
	
	document.getElementById('CreateSpell').innerText = "Create";
	document.getElementById('CreateSpell').onclick = () => {
		const name 		  = document.getElementById('SpellName').value;
		const description = document.getElementById('SpellDescription').value;
		const level 	  = document.getElementById('SpellLevel').value;
		const used 		  = document.getElementById('SpellUsed').value;
		const perday 	  = document.getElementById('SpellPerDay').value;
		const school 	  = document.getElementById('SpellSchool').value;
		const sub		  = document.getElementById('SpellSubschool').value;
		AddSpellButton(list, name, description, level, used, perday, school, sub);
		
		SaveToCloudFlare();
		CloseOverlay();
	};
	document.getElementById('DeleteSpell').innerText = "Cancel";
	document.getElementById('DeleteSpell').onclick = CloseOverlay;
}