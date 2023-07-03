//Process json to sheet
function LoadFromJSON (character) {
	function set (docname, value) {
		document.getElementById(docname).value = value ?? "";
	}
	set("CharacterName", character.name);
	set("PlayerName", character.player);
	
	set("Class", character.class);
	
	set("Race"		, character.race);
	set("Alignment"	, character.align);
	set("Gender"	, character.gender);
	set("Size"		, character.size);
	set("Deity"		, character.deity);
	
	set("str"	  , character.str	);
	set("str-temp", character.str_t	);
	set("dex"	  , character.dex	);
	set("dex-temp", character.dex_t	);
	set("con"	  , character.con	);
	set("con-temp", character.con_t	);
	
	set("int"	  , character.int	);
	set("int-temp", character.int_t	);
	set("wis"	  , character.wis	);
	set("wis-temp", character.wis_t	);
	set("cha"	  , character.cha	);
	set("cha-temp", character.cha_t	);
	
	set("Total-AC"     , character.ac_total	);
	set("Armor-Bonus"  , character.ac_bonus	);
	set("Shield-Bonus" , character.ac_shield);
	set("AC-Size"      , character.ac_size	);
	set("Natural-Armor", character.ac_nat	);
	set("Deflection"   , character.ac_deflec);
	set("AC-Misc"      , character.ac_misc	);
	
	set("Touch-AC"		, character.ac_t	);
	set("FlatFoot-AC"	, character.ac_ff	);
	set("Other-AC"		, character.ac_other);
	
	set("Base-HP"		, character.hp_current	);
	set("Temp-HP"		, character.hp_temp		);
	set("Non-Lethal-Dmg", character.hp_nonlethal);
	set("Max-HP"		, character.hp_max		);
	
	set("Damage-Reduction", character.dmg_reduc   );
	set("Spell-Resistance", character.spell_resist);
	
	set("Fortitude-Total",character.fort_total);
	set("Fortitude-Base" ,character.fort_base );
	set("Fortitude-Item" ,character.fort_item );
	set("Fortitude-Misc" ,character.fort_misc );
	set("Fortitude-Notes",character.fort_note );
	
	set("Reflex-Total", character.ref_total);
	set("Reflex-Base" , character.ref_base );
	set("Reflex-Item" , character.ref_item );
	set("Reflex-Misc" , character.ref_misc );
	set("Reflex-Notes", character.ref_note );
	
	set("Will-Total", character.will_total);
	set("Will-Base" , character.will_base );
	set("Will-Item" , character.will_item );
	set("Will-Misc" , character.will_misc );
	set("Will-Notes", character.will_note );
	
	set("Resistances", character.resist);
	set("Immunities" , character.immune);
	
	set("Total-CMD", character.cmd_total);
	set("Size-CMD" , character.cmd_size );
	set("Misc-CMD" , character.cmd_misc );
	
	set("Init-Total", character.init_total);
	set("Misc-Init" , character.init_misc );
	
	const elements = document.getElementsByClassName("BAB");
	for (const element of elements) element.value = character.bab ?? "";
	
	set("Base-Speed"  , character.spd_base);
	set("Armor-Speed" , character.spd_amr );
	set("Fly-Speed"   , character.spd_fly );
	set("Swim-Speed"  , character.spd_swm );
	set("Climb-Speed" , character.spd_clb );
	set("Burrow-Speed", character.spd_brw );
	set("Speed-Notes" , character.spd_nts );
	
	set("Total-CMB", character.cmb_total);
	set("Size-CMB" , character.cmb_size );
	set("Misc-CMB" , character.cmb_misc );
	
	for (let melee of character.mList) {
		const span = AddAttack('Melee');
		span.childNodes[1] = melee.name  ?? "";
		span.childNodes[2] = melee.atk   ?? "";
		span.childNodes[3] = melee.dmg   ?? "";
		span.childNodes[4] = melee.crit  ?? "";
		span.childNodes[5] = melee.type  ?? "";
		span.childNodes[6] = melee.notes ?? "";
	}
	for (let ranged of character.rList) {
		const span = AddAttack('Ranged');
		span.childNodes[1] = ranged.name  ?? "";
		span.childNodes[2] = ranged.atk   ?? "";
		span.childNodes[3] = ranged.dmg   ?? "";
		span.childNodes[4] = ranged.crit  ?? "";
		span.childNodes[5] = ranged.type  ?? "";
		span.childNodes[6] = ranged.range ?? "";
		span.childNodes[7] = ranged.ammo  ?? "";
	}
	
	function LoadSkill (name, docname) {
		if (character.skills[name] == null) return;
		let row = document.getElementById(docname+"-row");
		row.cells[0].firstChild.checked = character.skills[name].cs;
		row.cells[1].firstChild.value   = character.skills[name].name	?? "";
		row.cells[2].firstChild.value   = character.skills[name].total  ?? "";
		row.cells[5].firstChild.value   = character.skills[name].rank	?? "";
		row.cells[6].firstChild.value   = character.skills[name].class  ?? "";
		row.cells[7].firstChild.value   = character.skills[name].racial ?? "";
		row.cells[8].firstChild.value   = character.skills[name].trait  ?? "";
		row.cells[9].firstChild.value   = character.skills[name].misc	?? "";
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
		if (character.skills[name] == null) return;
		const qty = character.skills[name].length;
		for (let i = 0; i < qty; i++) {
			let row = AddSkill(docname);
			row.cells[0].children[0].checked = character.skills[name][i].cs;
			row.cells[1].children[1].value   = character.skills[name][i].name	?? "";
			row.cells[2].children[0].value   = character.skills[name][i].total  ?? "";
			row.cells[5].children[0].value   = character.skills[name][i].rank	?? "";
			row.cells[6].children[0].value   = character.skills[name][i].class  ?? "";
			row.cells[7].children[0].value   = character.skills[name][i].racial ?? "";
			row.cells[8].children[0].value   = character.skills[name][i].trait  ?? "";
			row.cells[9].children[0].value   = character.skills[name][i].misc	?? "";
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
	LoadFromJSON(json);
}