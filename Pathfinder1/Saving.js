function GetCharacter () {
	let character = { };
	
	character.name = document.getElementById("CharacterName").value;
	character.player = document.getElementById("PlayerName").value;
	
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
	
	character.hp_current = document.getElementById("Base-HP").value;
	character.hp_temp = document.getElementById("Temp-HP").value;
	character.hp_nonlethal = document.getElementById("Non-Lethal-Dmg").value;
	character.hp_max = document.getElementById("Current-HP").value;
	
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
	
	character.mList = [];
	const mList = document.getElementById("MeleeList");
	for (let i = 0; i < mList.childNodes; i++) {
		let span = mList.childNodes[i];
		character.mList[i].name = span.childNodes[1];
		character.mList[i].atk = span.childNodes[2];
		character.mList[i].dmg = span.childNodes[3];
		character.mList[i].crit = span.childNodes[4];
		character.mList[i].type = span.childNodes[5];
		character.mList[i].notes = span.childNodes[6];
	}	
	
	character.rList = [];
	const rList = document.getElementById("RangedList");
	for (let i = 0; i < rList.childNodes; i++) {
		let span = rList.childNodes[i];
		character.rList[i].name = span.childNodes[1];
		character.rList[i].atk = span.childNodes[2];
		character.rList[i].dmg = span.childNodes[3];
		character.rList[i].crit = span.childNodes[4];
		character.rList[i].type = span.childNodes[5];
		character.rList[i].range = span.childNodes[6];
		character.rList[i].ammo = span.childNodes[7];
	}
	
	character.acro_cs = document.getElementById("acrobatics-class-skill").checked;
	character.acro_total = document.getElementById("acrobatics-total").value;
	character.acro_rank = document.getElementById("acrobatics-rank").value;
	character.acro_class = document.getElementById("acrobatics-class").value;
	character.acro_racial = document.getElementById("acrobatics-racial").value;
	character.acro_trait = document.getElementById("acrobatics-trait").value;
	character.acro_misc = document.getElementById("acrobatics-misc").value;
	
	character.bluff_cs = document.getElementById("bluff-class-skill").checked;
	character.bluff_total = document.getElementById("bluff-total").value;
	character.bluff_rank = document.getElementById("bluff-rank").value;
	character.bluff_class = document.getElementById("bluff-class").value;
	character.bluff_racial = document.getElementById("bluff-racial").value;
	character.bluff_trait = document.getElementById("bluff-trait").value;
	character.bluff_misc = document.getElementById("bluff-misc").value;
	
	character.climb_cs = document.getElementById("climb-class-skill").checked;
	character.climb_total = document.getElementById("climb-total").value;
	character.climb_rank = document.getElementById("climb-rank").value;
	character.climb_class = document.getElementById("climb-class").value;
	character.climb_racial = document.getElementById("climb-racial").value;
	character.climb_trait = document.getElementById("climb-trait").value;
	character.climb_misc = document.getElementById("climb-misc").value;
	
	character.dip_cs = document.getElementById("diplomacy-class-skill").checked;
	character.dip_total = document.getElementById("diplomacy-total").value;
	character.dip_rank = document.getElementById("diplomacy-rank").value;
	character.dip_class = document.getElementById("diplomacy-class").value;
	character.dip_racial = document.getElementById("diplomacy-racial").value;
	character.dip_trait = document.getElementById("diplomacy-trait").value;
	character.dip_misc = document.getElementById("diplomacy-misc").value;
	
	character.dd_cs = document.getElementById("disable-device-class-skill").checked;
	character.dd_total = document.getElementById("disable-device-total").value;
	character.dd_rank = document.getElementById("disable-device-rank").value;
	character.dd_class = document.getElementById("disable-device-class").value;
	character.dd_racial = document.getElementById("disable-device-racial").value;
	character.dd_trait = document.getElementById("disable-device-trait").value;
	character.dd_misc = document.getElementById("disable-device-misc").value;
	
	character.dis_cs = document.getElementById("disguise-class-skill").checked;
	character.dis_total = document.getElementById("disguise-total").value;
	character.dis_rank = document.getElementById("disguise-rank").value;
	character.dis_class = document.getElementById("disguise-class").value;
	character.dis_racial = document.getElementById("disguise-racial").value;
	character.dis_trait = document.getElementById("disguise-trait").value;
	character.dis_misc = document.getElementById("disguise-misc").value;
	
	character.ea_cs = document.getElementById("escape-artist-class-skill").checked;
	character.ea_total = document.getElementById("escape-artist-total").value;
	character.ea_rank = document.getElementById("escape-artist-rank").value;
	character.ea_class = document.getElementById("escape-artist-class").value;
	character.ea_racial = document.getElementById("escape-artist-racial").value;
	character.ea_trait = document.getElementById("escape-artist-trait").value;
	character.ea_misc = document.getElementById("escape-artist-misc").value;
	
	character.fly_cs = document.getElementById("fly-class-skill").checked;
	character.fly_total = document.getElementById("fly-total").value;
	character.fly_rank = document.getElementById("fly-rank").value;
	character.fly_class = document.getElementById("fly-class").value;
	character.fly_racial = document.getElementById("fly-racial").value;
	character.fly_trait = document.getElementById("fly-trait").value;
	character.fly_misc = document.getElementById("fly-misc").value;
	
	character.heal_cs = document.getElementById("heal-class-skill").checked;
	character.heal_total = document.getElementById("heal-total").value;
	character.heal_rank = document.getElementById("heal-rank").value;
	character.heal_class = document.getElementById("heal-class").value;
	character.heal_racial = document.getElementById("heal-racial").value;
	character.heal_trait = document.getElementById("heal-trait").value;
	character.heal_misc = document.getElementById("heal-misc").value;
	
	character.inti_cs = document.getElementById("intimidate-class-skill").checked;
	character.inti_total = document.getElementById("intimidate-total").value;
	character.inti_rank = document.getElementById("intimidate-rank").value;
	character.inti_class = document.getElementById("intimidate-class").value;
	character.inti_racial = document.getElementById("intimidate-racial").value;
	character.inti_trait = document.getElementById("intimidate-trait").value;
	character.inti_misc = document.getElementById("intimidate-misc").value;
	
	character.arc_cs = document.getElementById("arcana-class-skill").checked;
	character.arc_total = document.getElementById("arcana-total").value;
	character.arc_rank = document.getElementById("arcana-rank").value;
	character.arc_class = document.getElementById("arcana-class").value;
	character.arc_racial = document.getElementById("arcana-racial").value;
	character.arc_trait = document.getElementById("arcana-trait").value;
	character.arc_misc = document.getElementById("arcana-misc").value;
	
	character.dun_cs = document.getElementById("dungeoneering-class-skill").checked;
	character.dun_total = document.getElementById("dungeoneering-total").value;
	character.dun_rank = document.getElementById("dungeoneering-rank").value;
	character.dun_class = document.getElementById("dungeoneering-class").value;
	character.dun_racial = document.getElementById("dungeoneering-racial").value;
	character.dun_trait = document.getElementById("dungeoneering-trait").value;
	character.dun_misc = document.getElementById("dungeoneering-misc").value;
	
	character.loc_cs = document.getElementById("local-class-skill").checked;
	character.loc_total = document.getElementById("local-total").value;
	character.loc_rank = document.getElementById("local-rank").value;
	character.loc_class = document.getElementById("local-class").value;
	character.loc_racial = document.getElementById("local-racial").value;
	character.loc_trait = document.getElementById("local-trait").value;
	character.loc_misc = document.getElementById("local-misc").value;
	
	character.nat_cs = document.getElementById("nature-class-skill").checked;
	character.nat_total = document.getElementById("nature-total").value;
	character.nat_rank = document.getElementById("nature-rank").value;
	character.nat_class = document.getElementById("nature-class").value;
	character.nat_racial = document.getElementById("nature-racial").value;
	character.nat_trait = document.getElementById("nature-trait").value;
	character.nat_misc = document.getElementById("nature-misc").value;
	
	character.pla_cs = document.getElementById("planes-class-skill").checked;
	character.pla_total = document.getElementById("planes-total").value;
	character.pla_rank = document.getElementById("planes-rank").value;
	character.pla_class = document.getElementById("planes-class").value;
	character.pla_racial = document.getElementById("planes-racial").value;
	character.pla_trait = document.getElementById("planes-trait").value;
	character.pla_misc = document.getElementById("planes-misc").value;
	
	character.rel_cs = document.getElementById("religion-class-skill").checked;
	character.rel_total = document.getElementById("religion-total").value;
	character.rel_rank = document.getElementById("religion-rank").value;
	character.rel_class = document.getElementById("religion-class").value;
	character.rel_racial = document.getElementById("religion-racial").value;
	character.rel_trait = document.getElementById("religion-trait").value;
	character.rel_misc = document.getElementById("religion-misc").value;
	
	character.per_cs = document.getElementById("perception-class-skill").checked;
	character.per_total = document.getElementById("perception-total").value;
	character.per_rank = document.getElementById("perception-rank").value;
	character.per_class = document.getElementById("perception-class").value;
	character.per_racial = document.getElementById("perception-racial").value;
	character.per_trait = document.getElementById("perception-trait").value;
	character.per_misc = document.getElementById("perception-misc").value;
	
	character.ride_cs = document.getElementById("ride-class-skill").checked;
	character.ride_total = document.getElementById("ride-total").value;
	character.ride_rank = document.getElementById("ride-rank").value;
	character.ride_class = document.getElementById("ride-class").value;
	character.ride_racial = document.getElementById("ride-racial").value;
	character.ride_trait = document.getElementById("ride-trait").value;
	character.ride_misc = document.getElementById("ride-misc").value;
	
	character.sm_cs = document.getElementById("sense-motive-class-skill").checked;
	character.sm_total = document.getElementById("sense-motive-total").value;
	character.sm_rank = document.getElementById("sense-motive-rank").value;
	character.sm_class = document.getElementById("sense-motive-class").value;
	character.sm_racial = document.getElementById("sense-motive-racial").value;
	character.sm_trait = document.getElementById("sense-motive-trait").value;
	character.sm_misc = document.getElementById("sense-motive-misc").value;
	
	character.sc_cs = document.getElementById("spellcraft-class-skill").checked;
	character.sc_total = document.getElementById("spellcraft-total").value;
	character.sc_rank = document.getElementById("spellcraft-rank").value;
	character.sc_class = document.getElementById("spellcraft-class").value;
	character.sc_racial = document.getElementById("spellcraft-racial").value;
	character.sc_trait = document.getElementById("spellcraft-trait").value;
	character.sc_misc = document.getElementById("spellcraft-misc").value;
	
	character.ste_cs = document.getElementById("stealth-class-skill").checked;
	character.ste_total = document.getElementById("stealth-total").value;
	character.ste_rank = document.getElementById("stealth-rank").value;
	character.ste_class = document.getElementById("stealth-class").value;
	character.ste_racial = document.getElementById("stealth-racial").value;
	character.ste_trait = document.getElementById("stealth-trait").value;
	character.ste_misc = document.getElementById("stealth-misc").value;
	
	character.surv_cs = document.getElementById("survival-class-skill").checked;
	character.surv_total = document.getElementById("survival-total").value;
	character.surv_rank = document.getElementById("survival-rank").value;
	character.surv_class = document.getElementById("survival-class").value;
	character.surv_racial = document.getElementById("survival-racial").value;
	character.surv_trait = document.getElementById("survival-trait").value;
	character.surv_misc = document.getElementById("survival-misc").value;
	
	character.swim_cs = document.getElementById("swim-class-skill").checked;
	character.swim_total = document.getElementById("swim-total").value;
	character.swim_rank = document.getElementById("swim-rank").value;
	character.swim_class = document.getElementById("swim-class").value;
	character.swim_racial = document.getElementById("swim-racial").value;
	character.swim_trait = document.getElementById("swim-trait").value;
	character.swim_misc = document.getElementById("swim-misc").value;
	
	character.umd_cs = document.getElementById("use-magic-device-class-skill").checked;
	character.umd_total = document.getElementById("use-magic-device-total").value;
	character.umd_rank = document.getElementById("use-magic-device-rank").value;
	character.umd_class = document.getElementById("use-magic-device-class").value;
	character.umd_racial = document.getElementById("use-magic-device-racial").value;
	character.umd_trait = document.getElementById("use-magic-device-trait").value;
	character.umd_misc = document.getElementById("use-magic-device-misc").value;
	
	character.app_cs = document.getElementById("appraise-class-skill").checked;
	character.app_total = document.getElementById("appraise-total").value;
	character.app_rank = document.getElementById("appraise-rank").value;
	character.app_class = document.getElementById("appraise-class").value;
	character.app_racial = document.getElementById("appraise-racial").value;
	character.app_trait = document.getElementById("appraise-trait").value;
	character.app_misc = document.getElementById("appraise-misc").value;
	
	character.ha_cs = document.getElementById("handle-animal-class-skill").checked;
	character.ha_total = document.getElementById("handle-animal-total").value;
	character.ha_rank = document.getElementById("handle-animal-rank").value;
	character.ha_class = document.getElementById("handle-animal-class").value;
	character.ha_racial = document.getElementById("handle-animal-racial").value;
	character.ha_trait = document.getElementById("handle-animal-trait").value;
	character.ha_misc = document.getElementById("handle-animal-misc").value;
	
	character.eng_cs = document.getElementById("engineering-class-skill").checked;
	character.eng_total = document.getElementById("engineering-total").value;
	character.eng_rank = document.getElementById("engineering-rank").value;
	character.eng_class = document.getElementById("engineering-class").value;
	character.eng_racial = document.getElementById("engineering-racial").value;
	character.eng_trait = document.getElementById("engineering-trait").value;
	character.eng_misc = document.getElementById("engineering-misc").value;
	
	character.geo_cs = document.getElementById("geography-class-skill").checked;
	character.geo_total = document.getElementById("geography-total").value;
	character.geo_rank = document.getElementById("geography-rank").value;
	character.geo_class = document.getElementById("geography-class").value;
	character.geo_racial = document.getElementById("geography-racial").value;
	character.geo_trait = document.getElementById("geography-trait").value;
	character.geo_misc = document.getElementById("geography-misc").value;
	
	character.his_cs = document.getElementById("history-class-skill").checked;
	character.his_total = document.getElementById("history-total").value;
	character.his_rank = document.getElementById("history-rank").value;
	character.his_class = document.getElementById("history-class").value;
	character.his_racial = document.getElementById("history-racial").value;
	character.his_trait = document.getElementById("history-trait").value;
	character.his_misc = document.getElementById("history-misc").value;
	
	character.nob_cs = document.getElementById("nobility-class-skill").checked;
	character.nob_total = document.getElementById("nobility-total").value;
	character.nob_rank = document.getElementById("nobility-rank").value;
	character.nob_class = document.getElementById("nobility-class").value;
	character.nob_racial = document.getElementById("nobility-racial").value;
	character.nob_trait = document.getElementById("nobility-trait").value;
	character.nob_misc = document.getElementById("nobility-misc").value;
	
	character.lin_cs = document.getElementById("linguistics-class-skill").checked;
	character.lin_total = document.getElementById("linguistics-total").value;
	character.lin_rank = document.getElementById("linguistics-rank").value;
	character.lin_class = document.getElementById("linguistics-class").value;
	character.lin_racial = document.getElementById("linguistics-racial").value;
	character.lin_trait = document.getElementById("linguistics-trait").value;
	character.lin_misc = document.getElementById("linguistics-misc").value;
	
	character.soh_cs = document.getElementById("sleight-of-hand-class-skill").checked;
	character.soh_total = document.getElementById("sleight-of-hand-total").value;
	character.soh_rank = document.getElementById("sleight-of-hand-rank").value;
	character.soh_class = document.getElementById("sleight-of-hand-class").value;
	character.soh_racial = document.getElementById("sleight-of-hand-racial").value;
	character.soh_trait = document.getElementById("sleight-of-hand-trait").value;
	character.soh_misc = document.getElementById("sleight-of-hand-misc").value;
	
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
	if (!document.getElementById("PlayerName").value) return; //Strangers don't get to save.
	
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