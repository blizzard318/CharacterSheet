function SaveToJSON () {
	
}

async function SaveToCloudFlare () {
	let character = { };
	
	character.name = document.getElementById("CharacterName").value;
	character.player = document.getElementById("PlayerName").value;
	if (!character.player) return;
	
	character.class = document.getElementById("Class").value;
	
	character.race = document.getElementById("Race").value;
	character.align = document.getElementById("Alignment").value;
	character.gender = document.getElementById("Gender").value;
	character.size = document.getElementById("Size").value;
	character.deity = document.getElementById("Deity").value;
	
	character.str = document.getElementById("str").value;
	character.str_t = document.getElementById("str-temp").value;
	character.dex = document.getElementById("dex").value;
	character.dex_t = document.getElementById("dex-temp").value;
	character.con = document.getElementById("con").value;
	character.con_t = document.getElementById("con-temp").value;
	
	character.int = document.getElementById("int").value;
	character.int_t = document.getElementById("int-temp").value;
	character.wis = document.getElementById("wis").value;
	character.wis_t = document.getElementById("wis-temp").value;
	character.cha = document.getElementById("cha").value;
	character.cha_t = document.getElementById("cha-temp").value;
	
	character.ac_total = document.getElementById("Total-AC").value;
	character.ac_bonus = document.getElementById("Armor-Bonus").value;
	character.ac_shield = document.getElementById("Shield-Bonus").value;
	character.ac_size = document.getElementById("AC-Size").value;
	character.ac_nat = document.getElementById("Natural-Armor").value;
	character.ac_deflec = document.getElementById("Deflection").value;
	character.ac_misc = document.getElementById("AC-Misc").value;
	
	character.ac_t = document.getElementById("Touch-AC").value;
	character.ac_ff = document.getElementById("FlatFoot-AC").value;
	character.ac_other = document.getElementById("Other-AC").value;
	
	character.hp_current = document.getElementById("Current-HP").value;
	character.hp_temp = document.getElementById("Temp-HP").value;
	character.hp_nonlethal = document.getElementById("Non-Lethal-Dmg").value;
	character.hp_max = document.getElementById("Max-HP").value;
	
	character.dmg_reduc = document.getElementById("Damage-Reduction").value;
	character.spell_resist = document.getElementById("Spell-Resistance").value;
	
	character.fort_total = document.getElementById("Fortitude-Total").value;
	character.fort_base = document.getElementById("Fortitude-Base").value;
	character.fort_item = document.getElementById("Fortitude-Item").value;
	character.fort_misc = document.getElementById("Fortitude-Misc").value;
	character.fort_note = document.getElementById("Fortitude-Notes").value;
	
	character.ref_total = document.getElementById("Reflex-Total").value;
	character.ref_base = document.getElementById("Reflex-Base").value;
	character.ref_item = document.getElementById("Reflex-Item").value;
	character.ref_misc = document.getElementById("Reflex-Misc").value;
	character.ref_note = document.getElementById("Reflex-Notes").value;
	
	character.will_total = document.getElementById("Will-Total").value;
	character.will_base = document.getElementById("Will-Base").value;
	character.will_item = document.getElementById("Will-Item").value;
	character.will_misc = document.getElementById("Will-Misc").value;
	character.will_note = document.getElementById("Will-Notes").value;
	
	character.resist = document.getElementById("Resistances").value;
	character.immune = document.getElementById("Immunities").value;
	
	character.cmd_total = document.getElementById("Total-CMD").value;
	character.cmd_size = document.getElementById("Size-CMD").value;
	character.cmd_misc = document.getElementById("Misc-CMD").value;
	
	character.init_total = document.getElementById("Init-Total").value;
	character.init_misc = document.getElementById("Misc-Init").value;
	
	character.bab = document.getElementsByClassName("BAB")[0].value;
	
	character.spd_base = document.getElementById("Base-Speed").value;
	character.spd_amr = document.getElementById("Armor-Speed").value;
	character.spd_fly = document.getElementById("Fly-Speed").value;
	character.spd_swm = document.getElementById("Swim-Speed").value;
	character.spd_clb = document.getElementById("Climb-Speed").value;
	character.spd_brw = document.getElementById("Burrow-Speed").value;
	character.spd_nts = document.getElementById("Speed-Notes").value;
	
	character.cmb_total = document.getElementById("Total-CMB").value;
	character.cmb_size = document.getElementById("Size-CMB").value;
	character.cmb_misc = document.getElementById("Misc-CMB").value;
	
	let index = document.getElementById("CharacterIndex").value;
	const url = "../api/Pathfinder1/" + character.player + "/" + index;
	const response = await fetch(url,{
		method: "PUT",
		headers: { 
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(character)
	});
}