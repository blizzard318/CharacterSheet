//All these functions will never be called again except once on start,
function ModifyTotalWeight (){
	let totval = 0;
	const elements = document.getElementsByClassName("GearWeight");
	for (const element of elements) {
		const val = parseInt(element.value);
		if (!isNaN(val)) totval += val;
	}
	document.getElementById("Total-Weight").value = totval;
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

function UpdateSkillRanksAllocated(type) {
	const Adventuring = type == "Adventuring";
	let totalvalue = 0;
	const Rows = document.getElementById("Skill-Table").rows;
	
	const start = Adventuring ? 1 : 26;
	const end = Adventuring ? 25 : Rows.length - 1;
	for (let i = start; i < end; i++) {//Background Skills
		if (Rows[i].cells.length == 0) continue;
		const val = parseInt(Rows[i].cells[5].firstChild.value);
		if (!isNaN(val)) totalvalue += val;
	}
	const id = Adventuring ? "AdventuringSkillRanksAllocated" : "BackgroundSkillRanksAllocated";
	document.getElementById(id).value = totalvalue;
}

function ModifySpellLevel() {
	const low  = document.getElementById('LowestSpellLevel');
	const high  = document.getElementById('HighestSpellLevel');
	const lowval = low.value;
	const highval = high.value;
	low.innerHTML = high.innerHTML = '';
	for (let i = 0; i <= highval; i++) low.add(new Option(i));
	for (let i = lowval; i <= 9; i++) high.add(new Option(i));
	low.value = lowval;
	high.value = highval;
}

function SetUpFunctions() { //This adds events to elements
	document.getElementById("ConfirmCancel").onclick = CloseOverlay;
	
	function AbilitySetUp(name) {
		document.getElementById(name		).addEventListener('focusout', _ => ModifyAbility(name));
		document.getElementById(name+"-temp").addEventListener('focusout', _ => ModifyAbility(name));
	}
	AbilitySetUp("str");
	AbilitySetUp("dex");
	AbilitySetUp("con");
	AbilitySetUp("int");
	AbilitySetUp("wis");
	AbilitySetUp("cha");
	
	document.getElementById("Base-HP"		).addEventListener('focusout', _ => ModifyHP());
	document.getElementById("Temp-HP"		).addEventListener('focusout', _ => ModifyHP());
	document.getElementById("Non-Lethal-Dmg").addEventListener('focusout', _ => ModifyHP());
	
	const BAB = document.getElementsByClassName("BAB")[0];
	BAB.addEventListener('focusout', _ => ModifyBAB(BAB.value));
	
	document.getElementById("Alignment").addEventListener('focusout', _ => ModifyHP());
	
	//Remembers if you had the details closed or opened.
	document.querySelectorAll('details').forEach(deet => {
		deet.open = localStorage.getItem(deet.id) === 'true';
		deet.addEventListener('toggle', _ => localStorage.setItem(deet.id, deet.open));
	});
	
	const Rows = document.getElementById("Skill-Table").rows;
	for (let i = 1; i < 25; i++) {//Adventuring Skills
		Rows[i].cells[5].firstChild.addEventListener('focusout', _ => UpdateSkillRanksAllocated('Adventuring'));
	}
	for (let i = 26; i < Rows.length - 1; i++) {//Background Skills
		if (Rows[i].cells.length == 0) continue;
		Rows[i].cells[5].firstChild.addEventListener('focusout', _ => UpdateSkillRanksAllocated('Background'));
	}
	
	document.getElementById('LowestSpellLevel').addEventListener('focusout', _ => ModifySpellLevel());
	document.getElementById('HighestSpellLevel').addEventListener('focusout', _ => ModifySpellLevel());
	ModifySpellLevel();
	
	let list = document.getElementById('SpellLikeList');
	document.getElementById('SpellLikeBtn').dataset.type = "Spell-Like";
	document.getElementById('SpellLikeBtn').onclick = () => { AddSpell("Spell-Like", list); };
	
	list = document.getElementById('RitualList');
	document.getElementById('RitualBtn').dataset.type = "Ritual Spell";
	document.getElementById('RitualBtn').onclick = () => { AddSpell("Ritual Spell", list); };
	
	if (document.getElementById("CharacterIndex").value == "") return; //Strangers don't get to save.
	document.querySelectorAll('input').forEach(inp => {
		if (inp.disabled) return;
		if (inp.type == "checkbox") inp.addEventListener('click', _ => SaveToCloudFlare());
		else {
			inp.addEventListener('focusin', _ => inp.oldValue = inp.value);
			inp.addEventListener('focusout', _ => {
				if (inp.value != inp.oldValue) SaveToCloudFlare();
				delete inp.oldValue; //Garbage Collection
			});
		}
	});
}

async function CheckURL () { //Check if friend or stranger
	const params = new Proxy(new URLSearchParams(window.location.search), {
	  get: (searchParams, prop) => searchParams.get(prop),
	});
	// Get the value of "some_key" in eg "https://example.com/?key=value"
	const key = params.key; // "value"
	
	if (key != null) { //Not a stranger
		document.getElementById("PlayerName").disabled = true; //Only enabled if its a stranger
		
		//history.replaceState(null, "", location.href.split("?")[0]);
		
		if (key.includes("/")) { //Loading a Existing character
			document.getElementById("CharacterIndex").value = key.split('/')[1];
			const response = await fetch("../api/Pathfinder1/" + key);
			LoadFromJSON(await response.json());
		}
		else { //Create a New character
			const character = { };

			character.name = document.getElementById("CharacterName").value = "Unnamed Character";
			character.player = document.getElementById("PlayerName").value = key;
			
			const url = "../api/Pathfinder1/" + character.player;
			fetch(url,{
				method: "POST", //THIS IS POST, NEW CHARA. DON'T USE PUT.
				headers: { 
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(character)
			});
		}
	}
	
	SetUpFunctions(); //Load this after everything is loaded.
}
CheckURL ();