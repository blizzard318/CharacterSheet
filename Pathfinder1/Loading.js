//Process json to sheet
function LoadFromJSON (character) {
	document.getElementById("CharacterName").value = character.name;
	document.getElementById("PlayerName").value = character.player;
	
	document.getElementById("Class").value = character.class;
	
	document.getElementById("Race").value 	   	= character.race;
	document.getElementById("Alignment").value 	= character.align;
	document.getElementById("Gender").value 	= character.gender;
	document.getElementById("Size").value  		= character.size;
	document.getElementById("Deity").value 		= character.deity;
	
	document.getElementById("str").value 	   = character.str;
	document.getElementById("str-temp").value = character.str_t;
	document.getElementById("dex").value      = character.dex;
	document.getElementById("dex-temp").value = character.dex_t;
	document.getElementById("con").value      = character.con;
	document.getElementById("con-temp").value = character.con_t;
	
	document.getElementById("int").value      = character.int;
	document.getElementById("int-temp").value = character.int_t;
	document.getElementById("wis").value      = character.wis;
	document.getElementById("wis-temp").value = character.wis_t;
	document.getElementById("cha").value      = character.cha;
	document.getElementById("cha-temp").value = character.cha_t;
	
	document.getElementById("Total-AC").value      = character.ac_total;
	document.getElementById("Armor-Bonus").value   = character.ac_bonus;
	document.getElementById("Shield-Bonus").value  = character.ac_shield;
	document.getElementById("AC-Size").value       = character.ac_size;
	document.getElementById("Natural-Armor").value = character.ac_nat;
	document.getElementById("Deflection").value    = character.ac_deflec;
	document.getElementById("AC-Misc").value       = character.ac_misc;
	
	document.getElementById("Touch-AC").value    = character.ac_t;
	document.getElementById("FlatFoot-AC").value = character.ac_ff;
	document.getElementById("Other-AC").value    = character.ac_other;
	
	document.getElementById("Base-HP").value 	= character.hp_current;
	document.getElementById("Temp-HP").value 		= character.hp_temp;
	document.getElementById("Non-Lethal-Dmg").value = character.hp_nonlethal;
	document.getElementById("Current-HP").value 		= character.hp_max;
	
	document.getElementById("Damage-Reduction").value  = character.dmg_reduc;
	document.getElementById("Spell-Resistance").value = character.spell_resist;
	
	document.getElementById("Fortitude-Total").value = character.fort_total;
	document.getElementById("Fortitude-Base").value  = character.fort_base;
	document.getElementById("Fortitude-Item").value  = character.fort_item;
	document.getElementById("Fortitude-Misc").value  = character.fort_misc;
	document.getElementById("Fortitude-Notes").value = character.fort_note;
	
	document.getElementById("Reflex-Total").value = character.ref_total;
	document.getElementById("Reflex-Base").value  = character.ref_base;
	document.getElementById("Reflex-Item").value  = character.ref_item;
	document.getElementById("Reflex-Misc").value  = character.ref_misc;
	document.getElementById("Reflex-Notes").value = character.ref_note;
	
	document.getElementById("Will-Total").value = character.will_total;
	document.getElementById("Will-Base").value  = character.will_base;
	document.getElementById("Will-Item").value  = character.will_item;
	document.getElementById("Will-Misc").value  = character.will_misc;
	document.getElementById("Will-Notes").value = character.will_note;
	
	document.getElementById("Resistances").value = character.resist;
	document.getElementById("Immunities").value  = character.immune;
	
	document.getElementById("Total-CMD").value = character.cmd_total;
	document.getElementById("Size-CMD").value  = character.cmd_size;
	document.getElementById("Misc-CMD").value  = character.cmd_misc;
	
	document.getElementById("Init-Total").value = character.init_total;
	document.getElementById("Misc-Init").value = character.init_misc;
	
	const elements = document.getElementsByClassName("BAB");
	for (const element of elements) element.value = character.bab;
	
	document.getElementById("Base-Speed").value   = character.spd_base;
	document.getElementById("Armor-Speed").value  = character.spd_amr;
	document.getElementById("Fly-Speed").value    = character.spd_fly;
	document.getElementById("Swim-Speed").value   = character.spd_swm;
	document.getElementById("Climb-Speed").value  = character.spd_clb;
	document.getElementById("Burrow-Speed").value = character.spd_brw;
	document.getElementById("Speed-Notes").value  = character.spd_nts;
	
	document.getElementById("Total-CMB").value = character.cmb_total;
	document.getElementById("Size-CMB").value  = character.cmb_size;
	document.getElementById("Misc-CMB").value  = character.cmb_misc;
	
	for (let melee of character.mList) {
		const span = AddAttack('Melee');
		span.childNodes[1] = melee.name ;
		span.childNodes[2] = melee.atk  ;
		span.childNodes[3] = melee.dmg  ;
		span.childNodes[4] = melee.crit ;
		span.childNodes[5] = melee.type ;
		span.childNodes[6] = melee.notes;
	}
	for (let ranged of character.rList) {
		const span = AddAttack('Ranged');
		span.childNodes[1] = ranged.name ;
		span.childNodes[2] = ranged.atk  ;
		span.childNodes[3] = ranged.dmg  ;
		span.childNodes[4] = ranged.crit ;
		span.childNodes[5] = ranged.type ;
		span.childNodes[6] = ranged.range;
		span.childNodes[7] = ranged.ammo ;
	}
	
	function LoadSkill (name, docname) {
		let row = document.getElementById(docname+"-row");
		row.cells[0].firstChild.checked = character.skills[name].cs;
		row.cells[1].firstChild.value   = character.skills[name].name;
		row.cells[2].firstChild.value   = character.skills[name].total;
		row.cells[5].firstChild.value   = character.skills[name].rank;
		row.cells[6].firstChild.value   = character.skills[name].class;
		row.cells[7].firstChild.value   = character.skills[name].racial;
		row.cells[8].firstChild.value   = character.skills[name].trait;
		row.cells[9].firstChild.value   = character.skills[name].misc;
	}
	LoadSkill("acro","acrobatics");
	LoadSkill("bluff","bluff");
	LoadSkill("climb","climb");
	LoadSkill("dip","diplomacy");
	LoadSkill("dd","disable-device");
	LoadSkill("dis","disguise");
	LoadSkill("ea","escape-artist");
	LoadSkill("fly","fly");
	LoadSkill("heal","heal");
	LoadSkill("inti","intimidate");
	LoadSkill("arc","arcana");
	LoadSkill("dun","dungeoneering");
	LoadSkill("loc","local");
	LoadSkill("nat","nature");
	LoadSkill("pla","planes");
	LoadSkill("rel","religion");
	LoadSkill("per","perception");
	LoadSkill("ride","ride");
	LoadSkill("sm","sense-motive");
	LoadSkill("sc","spellcraft");
	LoadSkill("ste","stealth");
	LoadSkill("surv","survival");
	LoadSkill("swim","swim");
	LoadSkill("umd","use-magic-device");
	//Background skills
	LoadSkill("app","appraise");
	LoadSkill("ha","handle-animal");
	LoadSkill("eng","engineering");
	LoadSkill("geo","geography");
	LoadSkill("his","history");
	LoadSkill("nob","nobility");
	LoadSkill("lin","linguistics");
	LoadSkill("soh","sleight-of-hand");
	
	function LoadMultiSkull (name, docname) {
		const qty = character.skills[name].length;
		for (let i = 0; i < qty; i++) {
			let row = AddSkill(docname);
			row.cells[0].children[0].checked = character.skills[name][i].cs;
			row.cells[1].children[1].value   = character.skills[name][i].name;
			row.cells[2].children[0].value   = character.skills[name][i].total;
			row.cells[5].children[0].value   = character.skills[name][i].rank;
			row.cells[6].children[0].value   = character.skills[name][i].class;
			row.cells[7].children[0].value   = character.skills[name][i].racial;
			row.cells[8].children[0].value   = character.skills[name][i].trait;
			row.cells[9].children[0].value   = character.skills[name][i].misc;
		}
	}
	LoadMultiSkull("art"  ,"artistry"  );
	LoadMultiSkull("craft","craft"	   );
	LoadMultiSkull("lore" ,"lore"	   );
	LoadMultiSkull("perf" ,"perform"   );
	LoadMultiSkull("prof" ,"profession");
}

//Process json from CharacterSheet.co.uk to CloudFlare KV
function LoadFromMottokrosh (json) {
	const character = { };
	
	character.name = json.name;
	character.alignment = json.alignment
	
	character.class = json.level;
	character.race = json.race;
	character.size = json.size;
	
	character.deity = json.deity;
	character.gender = json.gender;
	
	character.abilities = json.abilities;
	character.ac = json.ac;
	
	character.hp = {};
	character.hp.nonLethal = json.hp.nonLethal;
	character.hp.total = json.hp.total;
	
	character.damageReduction = json.damageReduction;
	character.spellResistance = json.spellResistance;
	
	character.saves = json.saves;
	character.resistances = json.resistances;
	character.immunities = json.immunities;
	character.cmd = json.cmd;
	
	character.initiaive = json.initiative;
	character.bab = json.bab;
	
	character.speed = json.speed;
	character.cmb = json.cmb;
	
	character.melee = json.melee;
	character.ranged = json.ranged;
	
	character.skills = json.skills;
	
	character.languages = json.languages;
	
	character.feats = json.feats;
	character.specialAbilities = json.specialAbilities;
	character.traits = json.traits;
	
	character.money = json.money;
	
	character.gear = [];
	for (let gear in json.gear) {
		const newgear = {};
		newgear.type = gear.type;
		newgear.name = gear.name;
		newgear.location = gear.location;
		newgear.quantity = gear.quantity;
		newgear.notes = gear.notes;
	}
	
	character.spellsConditionalModifiers = json.spellsConditionalModifiers;
	character.spellsSpeciality = json.spellsSpeciality;
	
	character.spellLikes = [];
	for (let spellLike in json.spellLikes) {
		const newspellike = {};
		newspellike.name = spellLike.name;
		newspellike.prepared = spellLike.prepared;
		newspellike.cast = spellLike.cast;
		newspellike.notes = spellLike.notes;
		
		character.spellLikes += newspellike;
	}
	
	character.spells = [];
	for (let spell in json.spells) {
		const newspell = {};
		newspell.totalKnown = spell.totalKnown;
		newspell.dc = spell.dc;
		newspell.totalPerDay = spell.totalPerDay;
		newspell.bonusSpells = spell.bonusSpells;
		
		newspell.slotted = [];
		for (let slot in spell.slotted) {
			newslot.name = slot.name;
			newslot.prepared = slot.prepared;
			newslot.cast = slot.cast;
			newslot.notes = slot.notes;
			
			newspell.slotted += newslot;
		}
		
		character.spells += newspell;
	}
	
	console.log(JSON.stringify(character));
}

async function Load () {
	const files = document.getElementById("charsheet").files;
	const text = await files[0].text();
	const json = JSON.parse(text);
	
	//if (json == mottokrosh) LoadFromMottokrosh(json);
	//else LoadFromJSON(json);
}