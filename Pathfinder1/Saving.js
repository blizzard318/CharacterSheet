function GetCharacter () {
	function GetValue(name){
		return document.getElementById(name).value ?? null;
	}
	let character = { };
	
	character.name = GetValue("CharacterName");
	character.player = GetValue("PlayerName");
	
	character.class = GetValue("Class");
	
	character.race = GetValue("Race");
	character.align = GetValue("Alignment");
	character.gender = GetValue("Gender");
	character.size = GetValue("Size");
	character.deity = GetValue("Deity");
	
	character.str = GetValue("str");
	character.str_t = GetValue("str-temp");
	character.dex = GetValue("dex");
	character.dex_t = GetValue("dex-temp");
	character.con = GetValue("con");
	character.con_t = GetValue("con-temp");
	
	character.int = GetValue("int");
	character.int_t = GetValue("int-temp");
	character.wis = GetValue("wis");
	character.wis_t = GetValue("wis-temp");
	character.cha = GetValue("cha");
	character.cha_t = GetValue("cha-temp");
	
	character.ac_total = GetValue("Total-AC");
	character.ac_bonus = GetValue("Armor-Bonus");
	character.ac_shield = GetValue("Shield-Bonus");
	character.ac_size = GetValue("AC-Size");
	character.ac_nat = GetValue("Natural-Armor");
	character.ac_deflec = GetValue("Deflection");
	character.ac_misc = GetValue("AC-Misc");
	
	character.ac_t = GetValue("Touch-AC");
	character.ac_ff = GetValue("FlatFoot-AC");
	character.ac_other = GetValue("Other-AC");
	
	character.hp_current = GetValue("Base-HP");
	character.hp_temp = GetValue("Temp-HP");
	character.hp_nonlethal = GetValue("Non-Lethal-Dmg");
	character.hp_max = GetValue("Current-HP");
	
	character.dmg_reduc = GetValue("Damage-Reduction");
	character.spell_resist = GetValue("Spell-Resistance");
	
	character.fort_total = GetValue("Fortitude-Total");
	character.fort_base = GetValue("Fortitude-Base");
	character.fort_item = GetValue("Fortitude-Item");
	character.fort_misc = GetValue("Fortitude-Misc");
	character.fort_note = GetValue("Fortitude-Notes");
	
	character.ref_total = GetValue("Reflex-Total");
	character.ref_base = GetValue("Reflex-Base");
	character.ref_item = GetValue("Reflex-Item");
	character.ref_misc = GetValue("Reflex-Misc");
	character.ref_note = GetValue("Reflex-Notes");
	
	character.will_total = GetValue("Will-Total");
	character.will_base = GetValue("Will-Base");
	character.will_item = GetValue("Will-Item");
	character.will_misc = GetValue("Will-Misc");
	character.will_note = GetValue("Will-Notes");
	
	character.resist = GetValue("Resistances");
	character.immune = GetValue("Immunities");
	
	character.cmd_total = GetValue("Total-CMD");
	character.cmd_size = GetValue("Size-CMD");
	character.cmd_misc = GetValue("Misc-CMD");
	
	character.init_total = GetValue("Init-Total");
	character.init_misc = GetValue("Misc-Init");
	
	character.bab = document.getElementsByClassName("BAB")[0].value ?? null;
	
	character.spd_base = GetValue("Base-Speed");
	character.spd_amr = GetValue("Armor-Speed");
	character.spd_fly = GetValue("Fly-Speed");
	character.spd_swm = GetValue("Swim-Speed");
	character.spd_clb = GetValue("Climb-Speed");
	character.spd_brw = GetValue("Burrow-Speed");
	character.spd_nts = GetValue("Speed-Notes");
	
	character.cmb_total = GetValue("Total-CMB");
	character.cmb_size = GetValue("Size-CMB");
	character.cmb_misc = GetValue("Misc-CMB");
	
	character.mList = [];
	const mList = document.getElementById("MeleeList");
	for (let i = 0; i < mList.childNodes; i++) {
		let span = mList.childNodes[i];
		character.mList[i].name = span.childNodes[1] ?? null;
		character.mList[i].atk = span.childNodes[2] ?? null;
		character.mList[i].dmg = span.childNodes[3] ?? null;
		character.mList[i].crit = span.childNodes[4] ?? null;
		character.mList[i].type = span.childNodes[5] ?? null;
		character.mList[i].notes = span.childNodes[6] ?? null;
	}	
	
	character.rList = [];
	const rList = document.getElementById("RangedList");
	for (let i = 0; i < rList.childNodes; i++) {
		let span = rList.childNodes[i];
		character.rList[i].name = span.childNodes[1] ?? null;
		character.rList[i].atk = span.childNodes[2] ?? null;
		character.rList[i].dmg = span.childNodes[3] ?? null;
		character.rList[i].crit = span.childNodes[4] ?? null;
		character.rList[i].type = span.childNodes[5] ?? null;
		character.rList[i].range = span.childNodes[6] ?? null;
		character.rList[i].ammo = span.childNodes[7] ?? null;
	}
	
	character.acro_cs = document.getElementById("acrobatics-class-skill").checked;
	character.acro_total = GetValue("acrobatics-total");
	character.acro_rank = GetValue("acrobatics-rank");
	character.acro_class = GetValue("acrobatics-class");
	character.acro_racial = GetValue("acrobatics-racial");
	character.acro_trait = GetValue("acrobatics-trait");
	character.acro_misc = GetValue("acrobatics-misc");
	
	character.bluff_cs = document.getElementById("bluff-class-skill").checked;
	character.bluff_total = GetValue("bluff-total");
	character.bluff_rank = GetValue("bluff-rank");
	character.bluff_class = GetValue("bluff-class");
	character.bluff_racial = GetValue("bluff-racial");
	character.bluff_trait = GetValue("bluff-trait");
	character.bluff_misc = GetValue("bluff-misc");
	
	character.climb_cs = document.getElementById("climb-class-skill").checked;
	character.climb_total = GetValue("climb-total");
	character.climb_rank = GetValue("climb-rank");
	character.climb_class = GetValue("climb-class");
	character.climb_racial = GetValue("climb-racial");
	character.climb_trait = GetValue("climb-trait");
	character.climb_misc = GetValue("climb-misc");
	
	character.dip_cs = document.getElementById("diplomacy-class-skill").checked;
	character.dip_total = GetValue("diplomacy-total");
	character.dip_rank = GetValue("diplomacy-rank");
	character.dip_class = GetValue("diplomacy-class");
	character.dip_racial = GetValue("diplomacy-racial");
	character.dip_trait = GetValue("diplomacy-trait");
	character.dip_misc = GetValue("diplomacy-misc");
	
	character.dd_cs = document.getElementById("disable-device-class-skill").checked;
	character.dd_total = GetValue("disable-device-total");
	character.dd_rank = GetValue("disable-device-rank");
	character.dd_class = GetValue("disable-device-class");
	character.dd_racial = GetValue("disable-device-racial");
	character.dd_trait = GetValue("disable-device-trait");
	character.dd_misc = GetValue("disable-device-misc");
	
	character.dis_cs = document.getElementById("disguise-class-skill").checked;
	character.dis_total = GetValue("disguise-total");
	character.dis_rank = GetValue("disguise-rank");
	character.dis_class = GetValue("disguise-class");
	character.dis_racial = GetValue("disguise-racial");
	character.dis_trait = GetValue("disguise-trait");
	character.dis_misc = GetValue("disguise-misc");
	
	character.ea_cs = document.getElementById("escape-artist-class-skill").checked;
	character.ea_total = GetValue("escape-artist-total");
	character.ea_rank = GetValue("escape-artist-rank");
	character.ea_class = GetValue("escape-artist-class");
	character.ea_racial = GetValue("escape-artist-racial");
	character.ea_trait = GetValue("escape-artist-trait");
	character.ea_misc = GetValue("escape-artist-misc");
	
	character.fly_cs = document.getElementById("fly-class-skill").checked;
	character.fly_total = GetValue("fly-total");
	character.fly_rank = GetValue("fly-rank");
	character.fly_class = GetValue("fly-class");
	character.fly_racial = GetValue("fly-racial");
	character.fly_trait = GetValue("fly-trait");
	character.fly_misc = GetValue("fly-misc");
	
	character.heal_cs = document.getElementById("heal-class-skill").checked;
	character.heal_total = GetValue("heal-total");
	character.heal_rank = GetValue("heal-rank");
	character.heal_class = GetValue("heal-class");
	character.heal_racial = GetValue("heal-racial");
	character.heal_trait = GetValue("heal-trait");
	character.heal_misc = GetValue("heal-misc");
	
	character.inti_cs = document.getElementById("intimidate-class-skill").checked;
	character.inti_total = GetValue("intimidate-total");
	character.inti_rank = GetValue("intimidate-rank");
	character.inti_class = GetValue("intimidate-class");
	character.inti_racial = GetValue("intimidate-racial");
	character.inti_trait = GetValue("intimidate-trait");
	character.inti_misc = GetValue("intimidate-misc");
	
	character.arc_cs = document.getElementById("arcana-class-skill").checked;
	character.arc_total = GetValue("arcana-total");
	character.arc_rank = GetValue("arcana-rank");
	character.arc_class = GetValue("arcana-class");
	character.arc_racial = GetValue("arcana-racial");
	character.arc_trait = GetValue("arcana-trait");
	character.arc_misc = GetValue("arcana-misc");
	
	character.dun_cs = document.getElementById("dungeoneering-class-skill").checked;
	character.dun_total = GetValue("dungeoneering-total");
	character.dun_rank = GetValue("dungeoneering-rank");
	character.dun_class = GetValue("dungeoneering-class");
	character.dun_racial = GetValue("dungeoneering-racial");
	character.dun_trait = GetValue("dungeoneering-trait");
	character.dun_misc = GetValue("dungeoneering-misc");
	
	character.loc_cs = document.getElementById("local-class-skill").checked;
	character.loc_total = GetValue("local-total");
	character.loc_rank = GetValue("local-rank");
	character.loc_class = GetValue("local-class");
	character.loc_racial = GetValue("local-racial");
	character.loc_trait = GetValue("local-trait");
	character.loc_misc = GetValue("local-misc");
	
	character.nat_cs = document.getElementById("nature-class-skill").checked;
	character.nat_total = GetValue("nature-total");
	character.nat_rank = GetValue("nature-rank");
	character.nat_class = GetValue("nature-class");
	character.nat_racial = GetValue("nature-racial");
	character.nat_trait = GetValue("nature-trait");
	character.nat_misc = GetValue("nature-misc");
	
	character.pla_cs = document.getElementById("planes-class-skill").checked;
	character.pla_total = GetValue("planes-total");
	character.pla_rank = GetValue("planes-rank");
	character.pla_class = GetValue("planes-class");
	character.pla_racial = GetValue("planes-racial");
	character.pla_trait = GetValue("planes-trait");
	character.pla_misc = GetValue("planes-misc");
	
	character.rel_cs = document.getElementById("religion-class-skill").checked;
	character.rel_total = GetValue("religion-total");
	character.rel_rank = GetValue("religion-rank");
	character.rel_class = GetValue("religion-class");
	character.rel_racial = GetValue("religion-racial");
	character.rel_trait = GetValue("religion-trait");
	character.rel_misc = GetValue("religion-misc");
	
	character.per_cs = document.getElementById("perception-class-skill").checked;
	character.per_total = GetValue("perception-total");
	character.per_rank = GetValue("perception-rank");
	character.per_class = GetValue("perception-class");
	character.per_racial = GetValue("perception-racial");
	character.per_trait = GetValue("perception-trait");
	character.per_misc = GetValue("perception-misc");
	
	character.ride_cs = document.getElementById("ride-class-skill").checked;
	character.ride_total = GetValue("ride-total");
	character.ride_rank = GetValue("ride-rank");
	character.ride_class = GetValue("ride-class");
	character.ride_racial = GetValue("ride-racial");
	character.ride_trait = GetValue("ride-trait");
	character.ride_misc = GetValue("ride-misc");
	
	character.sm_cs = document.getElementById("sense-motive-class-skill").checked;
	character.sm_total = GetValue("sense-motive-total");
	character.sm_rank = GetValue("sense-motive-rank");
	character.sm_class = GetValue("sense-motive-class");
	character.sm_racial = GetValue("sense-motive-racial");
	character.sm_trait = GetValue("sense-motive-trait");
	character.sm_misc = GetValue("sense-motive-misc");
	
	character.sc_cs = document.getElementById("spellcraft-class-skill").checked;
	character.sc_total = GetValue("spellcraft-total");
	character.sc_rank = GetValue("spellcraft-rank");
	character.sc_class = GetValue("spellcraft-class");
	character.sc_racial = GetValue("spellcraft-racial");
	character.sc_trait = GetValue("spellcraft-trait");
	character.sc_misc = GetValue("spellcraft-misc");
	
	character.ste_cs = document.getElementById("stealth-class-skill").checked;
	character.ste_total = GetValue("stealth-total");
	character.ste_rank = GetValue("stealth-rank");
	character.ste_class = GetValue("stealth-class");
	character.ste_racial = GetValue("stealth-racial");
	character.ste_trait = GetValue("stealth-trait");
	character.ste_misc = GetValue("stealth-misc");
	
	character.surv_cs = document.getElementById("survival-class-skill").checked;
	character.surv_total = GetValue("survival-total");
	character.surv_rank = GetValue("survival-rank");
	character.surv_class = GetValue("survival-class");
	character.surv_racial = GetValue("survival-racial");
	character.surv_trait = GetValue("survival-trait");
	character.surv_misc = GetValue("survival-misc");
	
	character.swim_cs = document.getElementById("swim-class-skill").checked;
	character.swim_total = GetValue("swim-total");
	character.swim_rank = GetValue("swim-rank");
	character.swim_class = GetValue("swim-class");
	character.swim_racial = GetValue("swim-racial");
	character.swim_trait = GetValue("swim-trait");
	character.swim_misc = GetValue("swim-misc");
	
	character.umd_cs = document.getElementById("use-magic-device-class-skill").checked;
	character.umd_total = GetValue("use-magic-device-total");
	character.umd_rank = GetValue("use-magic-device-rank");
	character.umd_class = GetValue("use-magic-device-class");
	character.umd_racial = GetValue("use-magic-device-racial");
	character.umd_trait = GetValue("use-magic-device-trait");
	character.umd_misc = GetValue("use-magic-device-misc");
	
	character.app_cs = document.getElementById("appraise-class-skill").checked;
	character.app_total = GetValue("appraise-total");
	character.app_rank = GetValue("appraise-rank");
	character.app_class = GetValue("appraise-class");
	character.app_racial = GetValue("appraise-racial");
	character.app_trait = GetValue("appraise-trait");
	character.app_misc = GetValue("appraise-misc");
	
	character.ha_cs = document.getElementById("handle-animal-class-skill").checked;
	character.ha_total = GetValue("handle-animal-total");
	character.ha_rank = GetValue("handle-animal-rank");
	character.ha_class = GetValue("handle-animal-class");
	character.ha_racial = GetValue("handle-animal-racial");
	character.ha_trait = GetValue("handle-animal-trait");
	character.ha_misc = GetValue("handle-animal-misc");
	
	character.eng_cs = document.getElementById("engineering-class-skill").checked;
	character.eng_total = GetValue("engineering-total");
	character.eng_rank = GetValue("engineering-rank");
	character.eng_class = GetValue("engineering-class");
	character.eng_racial = GetValue("engineering-racial");
	character.eng_trait = GetValue("engineering-trait");
	character.eng_misc = GetValue("engineering-misc");
	
	character.geo_cs = document.getElementById("geography-class-skill").checked;
	character.geo_total = GetValue("geography-total");
	character.geo_rank = GetValue("geography-rank");
	character.geo_class = GetValue("geography-class");
	character.geo_racial = GetValue("geography-racial");
	character.geo_trait = GetValue("geography-trait");
	character.geo_misc = GetValue("geography-misc");
	
	character.his_cs = document.getElementById("history-class-skill").checked;
	character.his_total = GetValue("history-total");
	character.his_rank = GetValue("history-rank");
	character.his_class = GetValue("history-class");
	character.his_racial = GetValue("history-racial");
	character.his_trait = GetValue("history-trait");
	character.his_misc = GetValue("history-misc");
	
	character.nob_cs = document.getElementById("nobility-class-skill").checked;
	character.nob_total = GetValue("nobility-total");
	character.nob_rank = GetValue("nobility-rank");
	character.nob_class = GetValue("nobility-class");
	character.nob_racial = GetValue("nobility-racial");
	character.nob_trait = GetValue("nobility-trait");
	character.nob_misc = GetValue("nobility-misc");
	
	character.lin_cs = document.getElementById("linguistics-class-skill").checked;
	character.lin_total = GetValue("linguistics-total");
	character.lin_rank = GetValue("linguistics-rank");
	character.lin_class = GetValue("linguistics-class");
	character.lin_racial = GetValue("linguistics-racial");
	character.lin_trait = GetValue("linguistics-trait");
	character.lin_misc = GetValue("linguistics-misc");
	
	character.soh_cs = document.getElementById("sleight-of-hand-class-skill").checked;
	character.soh_total = GetValue("sleight-of-hand-total");
	character.soh_rank = GetValue("sleight-of-hand-rank");
	character.soh_class = GetValue("sleight-of-hand-class");
	character.soh_racial = GetValue("sleight-of-hand-racial");
	character.soh_trait = GetValue("sleight-of-hand-trait");
	character.soh_misc = GetValue("sleight-of-hand-misc");
	
	/*character.artRow = [];
	const ogArtRowIndex = 27; //Magic number/Hardcode
	const nuArtRowIndex = document.getElementById("artistry-row").rowIndex;
	const artRowQty = ogArtRowIndex - nuArtRowIndex;
	if (artRowQty > 0) { //If there's been artistry skills created
		for (let i = 0; i < artRowQty; i++) {
			let row = document.getElementById("Skill-Table")
			character.artRow[i].art_cs = artRow
			character.artRow[i].art_name = 
			character.artRow[i].art_total =
			character.artRow[i].art_rank = 
			character.artRow[i].art_class =
			character.artRow[i].art_racial =
			character.artRow[i].art_trait =
			character.artRow[i].art_misc = 
		}
	}*/
	
	return character;
}

function SaveToJSON () {
	const character = GetCharacter();
	const link = document.createElement("a");
	const file = new Blob([JSON.stringify(character)], { type: 'text/json' });
	link.href = URL.createObjectURL(file);
	link.download = character.name + ".json";
	link.click();
	URL.revokeObjectURL(link.href);
}

async function SaveToCloudFlare () {
	if (document.getElementById("CharacterIndex").value == null) return; //Strangers don't get to save.
	
	const character = GetCharacter();
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