function GetCharacter () {
	function Trim(obj) {
		Object.keys(obj).forEach(k => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
	}
	function GetValue(name){
		return document.getElementById(name).value ?? null;
	}
	const character = {};
	
	character.name = GetValue("CharacterName");
	character.player = GetValue("PlayerName");
	
	character.class = GetValue("Class");
	
	character.race = GetValue("Race");
	character.align = GetValue("Alignment");
	character.gender = GetValue("Gender");
	character.size = GetValue("Size");
	character.deity = GetValue("Deity");
	
	//Ability Scores
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
	
	//Armor Class
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
	
	character.hp_current = GetValue("Base-HP"); //Health
	character.hp_temp = GetValue("Temp-HP");
	character.hp_nonlethal = GetValue("Non-Lethal-Dmg");
	character.hp_max = GetValue("Max-HP");
	
	character.dmg_reduc = GetValue("Damage-Reduction");
	character.spell_resist = GetValue("Spell-Resistance");
	
	//Resistances
	character.fort_total = GetValue("Fortitude-Total"); //Fortitude
	character.fort_base = GetValue("Fortitude-Base");
	character.fort_item = GetValue("Fortitude-Item");
	character.fort_misc = GetValue("Fortitude-Misc");
	character.fort_note = GetValue("Fortitude-Notes");
	
	character.ref_total = GetValue("Reflex-Total"); //Reflex
	character.ref_base = GetValue("Reflex-Base");
	character.ref_item = GetValue("Reflex-Item");
	character.ref_misc = GetValue("Reflex-Misc");
	character.ref_note = GetValue("Reflex-Notes");
	
	character.will_total = GetValue("Will-Total"); //Will
	character.will_base = GetValue("Will-Base");
	character.will_item = GetValue("Will-Item");
	character.will_misc = GetValue("Will-Misc");
	character.will_note = GetValue("Will-Notes");
	
	character.resist = GetValue("Resistances");
	character.immune = GetValue("Immunities");
	
	character.cmd_total = GetValue("Total-CMD"); //CMD
	character.cmd_size = GetValue("Size-CMD");
	character.cmd_misc = GetValue("Misc-CMD");
	
	character.init_total = GetValue("Init-Total");
	character.init_misc = GetValue("Misc-Init");
	
	character.bab = document.getElementsByClassName("BAB")[0].value ?? null; //BAB
	
	character.spd_base = GetValue("Base-Speed"); //Speeds
	character.spd_amr = GetValue("Armor-Speed");
	character.spd_fly = GetValue("Fly-Speed");
	character.spd_swm = GetValue("Swim-Speed");
	character.spd_clb = GetValue("Climb-Speed");
	character.spd_brw = GetValue("Burrow-Speed");
	character.spd_nts = GetValue("Speed-Notes");
	
	character.cmb_total = GetValue("Total-CMB"); //CMB
	character.cmb_size = GetValue("Size-CMB");
	character.cmb_misc = GetValue("Misc-CMB");
	
	character.mList = []; //Melee Attacks
	const mList = document.getElementById("MeleeList").children;
	for (let i = 0; i < mList.length; i++) {
		character.mList[i]  	 = {};
		alert(mList[i].children[1].firstChild.value);
		character.mList[i].name  = mList[i].children[1].firstChild.value ?? null;
		character.mList[i].atk   = mList[i].children[2].firstChild.value ?? null;
		character.mList[i].dmg   = mList[i].children[3].firstChild.value ?? null;
		character.mList[i].crit  = mList[i].children[4].firstChild.value ?? null;
		character.mList[i].type  = mList[i].children[5].firstChild.value ?? null;
		character.mList[i].notes = mList[i].children[6].firstChild.value ?? null;
		Trim(character.mList[i]);
	}
	character.rList = []; //Ranged Attacks
	const rList = document.getElementById("RangedList").childNodes;
	for (let i = 0; i < rList.length; i++) {
		character.rList[i]  	 = {};
		character.rList[i].name  = rList[i].children[1].firstChild.value ?? null;
		character.rList[i].atk   = rList[i].children[2].firstChild.value ?? null;
		character.rList[i].dmg   = rList[i].children[3].firstChild.value ?? null;
		character.rList[i].crit  = rList[i].children[4].firstChild.value ?? null;
		character.rList[i].type  = rList[i].children[5].firstChild.value ?? null;
		character.rList[i].range = rList[i].children[6].firstChild.value ?? null;
		character.rList[i].ammo  = rList[i].children[7].firstChild.value ?? null;
		Trim(character.rList[i]);
	}
	character.skills = {}; //Skills
	function SaveSkill (name, docname) {
		const row = document.getElementById(docname+"-row");
		character.skills[name] = {};
		character.skills[name].cs 	  = row.cells[0].firstChild.checked;
		character.skills[name].total  = row.cells[2].firstChild.value ?? null;
		character.skills[name].rank   = row.cells[5].firstChild.value ?? null;
		character.skills[name].class  = row.cells[6].firstChild.value ?? null;
		character.skills[name].racial = row.cells[7].firstChild.value ?? null;
		character.skills[name].trait  = row.cells[8].firstChild.value ?? null;
		character.skills[name].misc   = row.cells[9].firstChild.value ?? null;
		Trim(character.skills[name]);
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
	
	function SaveMultiSkull (name, docname, rowBefore) {
		character.skills[name] = [];
		const OldIndex = document.getElementById(rowBefore+"-row").rowIndex + 1;
		const NewIndex = document.getElementById(docname+"-row").rowIndex;
		const Offset = NewIndex - OldIndex;
		for (let i = 0; i < Offset; i++) {
			let row = document.getElementById("Skill-Table").rows[i + OldIndex];
			character.skills[name][i]		 = {};
			character.skills[name][i].cs     = row.cells[0].children[0].checked;
			character.skills[name][i].name   = row.cells[1].children[1].value ?? null;
			character.skills[name][i].total  = row.cells[2].children[0].value ?? null;
			character.skills[name][i].rank   = row.cells[5].children[0].value ?? null;
			character.skills[name][i].class  = row.cells[6].children[0].value ?? null;
			character.skills[name][i].racial = row.cells[7].children[0].value ?? null;
			character.skills[name][i].trait  = row.cells[8].children[0].value ?? null;
			character.skills[name][i].misc   = row.cells[9].children[0].value ?? null;
			Trim(character.skills[name][i]);
		}
	}
	SaveMultiSkull("art"  ,"artistry"	,"appraise"	  );
	SaveMultiSkull("craft","craft"		,"artistry"	  );
	SaveMultiSkull("lore" ,"lore"		,"linguistics");
	SaveMultiSkull("perf" ,"perform"	,"lore"		  );
	SaveMultiSkull("prof" ,"profession"	,"perform"	  );
	Trim(character.skills);
	
	character.skill_notes = GetValue("Skill-Notes");
	character.lng = GetValue("Languages");
	
	//Customization items
	character.gList = []; //Feats List
	const gList = document.getElementById("FeatList").childNodes;
	for (let i = 0; i < gList.length; i++) {
		character.gList[i]  	  	 = {};
		Trim(character.gList[i]);
	}
	
	character.saList = []; //Special Abilities List
	const saList = document.getElementById("SpecialAbilityList").childNodes;
	for (let i = 0; i < saList.length; i++) {
		character.saList[i]  	  	 = {};
		Trim(character.saList[i]);
	}
	
	character.tList = []; //Traits List
	const tList = document.getElementById("TraitList").childNodes;
	for (let i = 0; i < tList.length; i++) {
		character.tList[i]  	  	 = {};
		Trim(character.tList[i]);
	}
	
	//Equipment
	character.gp = GetValue("money");
	
	character.acList = []; //AC Items
	const acList = document.getElementById("ACList").childNodes;
	for (let i = 0; i < acList.length; i++) {
		character.acList[i]  	  	  = {};
		character.acList[i].name  	  = acList[i].children[1].firstChild.value ?? null;
		character.acList[i].bonus 	  = acList[i].children[2].firstChild.value ?? null;
		character.acList[i].type  	  = acList[i].children[3].firstChild.value ?? null;
		character.acList[i].penalty	  = acList[i].children[4].firstChild.value ?? null;
		character.acList[i].spellfail = acList[i].children[5].firstChild.value ?? null;
		character.acList[i].notes 	  = acList[i].children[6].firstChild.value ?? null;
		Trim(character.acList[i]);
	}
	character.ac_bonus 	   = GetValue("AC-Bonus");
	character.ac_penalty   = GetValue("AC-Penalty");
	character.ac_spellfail = GetValue("AC-Spell-Failure");
	
	character.gList = []; //Gears List
	const gList = document.getElementById("GearList").childNodes;
	for (let i = 0; i < gList.length; i++) {
		character.gList[i]  	  	 = {};
		Trim(character.gList[i]);
	}
	character.total_weight = GetValue("Total-Weight");
	
	Trim(character);
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