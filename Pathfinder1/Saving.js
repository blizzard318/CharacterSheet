function GetCharacter () {
	function GetValue(name){
		return document.getElementById(name).value ?? null;
	}
	const character = { };
	
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
	const mList = document.getElementById("MeleeList").childNodes;
	for (let i = 0; i < mList.length; i++) {
		character.mList[i].name  = mList[i].childNodes[1] ?? null;
		character.mList[i].atk   = mList[i].childNodes[2] ?? null;
		character.mList[i].dmg   = mList[i].childNodes[3] ?? null;
		character.mList[i].crit  = mList[i].childNodes[4] ?? null;
		character.mList[i].type  = mList[i].childNodes[5] ?? null;
		character.mList[i].notes = mList[i].childNodes[6] ?? null;
	}	
	character.rList = [];
	const rList = document.getElementById("RangedList").childNodes;
	for (let i = 0; i < rList.length; i++) {
		character.rList[i].name  = rList[i].childNodes[1] ?? null;
		character.rList[i].atk   = rList[i].childNodes[2] ?? null;
		character.rList[i].dmg   = rList[i].childNodes[3] ?? null;
		character.rList[i].crit  = rList[i].childNodes[4] ?? null;
		character.rList[i].type  = rList[i].childNodes[5] ?? null;
		character.rList[i].range = rList[i].childNodes[6] ?? null;
		character.rList[i].ammo  = rList[i].childNodes[7] ?? null;
	}
	
	character.skills = [];
	function SaveSkill (name, docname) {
		let row = document.getElementById(docname+"-row");
		character.skills[name].cs 	  = row.cells[0].firstChild.checked;
		character.skills[name].name   = row.cells[1].firstChild.value;
		character.skills[name].total  = row.cells[2].firstChild.value;
		character.skills[name].rank   = row.cells[5].firstChild.value;
		character.skills[name].class  = row.cells[6].firstChild.value;
		character.skills[name].racial = row.cells[7].firstChild.value;
		character.skills[name].trait  = row.cells[8].firstChild.value;
		character.skills[name].misc   = row.cells[9].firstChild.value;
	}
	SaveSkill("acro","acrobatics");
	SaveSkill("bluff","bluff");
	SaveSkill("climb","climb");
	SaveSkill("dip","diplomacy");
	SaveSkill("dd","disable-device");
	SaveSkill("dis","disguise");
	SaveSkill("ea","escape-artist");
	SaveSkill("fly","fly");
	SaveSkill("heal","heal");
	SaveSkill("inti","intimidate");
	SaveSkill("arc","arcana");
	SaveSkill("dun","dungeoneering");
	SaveSkill("loc","local");
	SaveSkill("nat","nature");
	SaveSkill("pla","planes");
	SaveSkill("rel","religion");
	SaveSkill("per","perception");
	SaveSkill("ride","ride");
	SaveSkill("sm","sense-motive");
	SaveSkill("sc","spellcraft");
	SaveSkill("ste","stealth");
	SaveSkill("surv","survival");
	SaveSkill("swim","swim");
	SaveSkill("umd","use-magic-device");
	//Background skills
	SaveSkill("app","appraise");
	SaveSkill("ha","handle-animal");
	SaveSkill("eng","engineering");
	SaveSkill("geo","geography");
	SaveSkill("his","history");
	SaveSkill("nob","nobility");
	SaveSkill("lin","linguistics");
	SaveSkill("soh","sleight-of-hand");
	
	function SaveMultiSkull (name, oldIndex, docname) {
		character.skills[name] = [];
		const newIndex = document.getElementById(docname+"-row").rowIndex;
		const delta = newIndex - oldIndex;
		for (let i = 0; i < newIndex; i++) {
			let row = document.getElementById("Skill-Table").rows[i + oldIndex];
			character.skills[name][i].cs     = row.cells[0].children[0].checked;
			character.skills[name][i].name   = row.cells[1].children[1].value;
			character.skills[name][i].total  = row.cells[2].children[0].value;
			character.skills[name][i].rank   = row.cells[5].children[0].value;
			character.skills[name][i].class  = row.cells[6].children[0].value;
			character.skills[name][i].racial = row.cells[7].children[0].value;
			character.skills[name][i].trait  = row.cells[8].children[0].value;
			character.skills[name][i].misc   = row.cells[9].children[0].value;
		}
	}
	SaveMultiSkull("art"  ,27,"artistry"  );
	SaveMultiSkull("craft",28,"craft"	  );
	SaveMultiSkull("lore" ,35,"lore"	  );
	SaveMultiSkull("perf" ,36,"perform"	  );
	SaveMultiSkull("prof" ,37,"profession");
	
	return character.keys(obj).forEach(k => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
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
	const index = document.getElementById("CharacterIndex").value;
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