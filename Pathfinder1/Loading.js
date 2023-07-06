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
	
	set("str", character.str); set("str-temp", character.str_t); ModifyAbility("str");
	set("dex", character.dex); set("dex-temp", character.dex_t); ModifyAbility("dex");
	set("con", character.con); set("con-temp", character.con_t); ModifyAbility("con");
	set("int", character.int); set("int-temp", character.int_t); ModifyAbility("int");
	set("wis", character.wis); set("wis-temp", character.wis_t); ModifyAbility("wis");
	set("cha", character.cha); set("cha-temp", character.cha_t); ModifyAbility("cha");
	
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
	ModifyHP();
	
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
	ModifyBAB(document.getElementsByClassName("BAB")[0].value);
	
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
	
	document.getElementById("MeleeList").innerHTML = "";
	for (let melee of character.mList) {
		const span = AddAttack('Melee');
		span.childNodes[1].firstChild.value = melee.name  ?? "";
		span.childNodes[2].firstChild.value = melee.atk   ?? "";
		span.childNodes[3].firstChild.value = melee.dmg   ?? "";
		span.childNodes[4].firstChild.value = melee.crit  ?? "";
		span.childNodes[5].firstChild.value = melee.type  ?? "";
		span.childNodes[6].firstChild.value = melee.notes ?? "";
	}
	document.getElementById("RangedList").innerHTML = "";
	for (let ranged of character.rList) {
		const span = AddAttack('Ranged');
		span.childNodes[1].firstChild.value = ranged.name  ?? "";
		span.childNodes[2].firstChild.value = ranged.atk   ?? "";
		span.childNodes[3].firstChild.value = ranged.dmg   ?? "";
		span.childNodes[4].firstChild.value = ranged.crit  ?? "";
		span.childNodes[5].firstChild.value = ranged.type  ?? "";
		span.childNodes[6].firstChild.value = ranged.range ?? "";
		span.childNodes[7].firstChild.value = ranged.ammo  ?? "";
	}
	
	function LoadSkill (name, docname) {
		if (character.skills[name] == null) return;
		let row = document.getElementById(docname+"-row");
		row.cells[0].firstChild.checked = character.skills[name].cs;
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
		document.getElementById(docname + "-row").innerHTML = "";
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
	set("Skill-Notes", character.skill_notes);
	set("Languages"  , character.lng 		);
	
	//Load customization here
	document.getElementById("FeatList").innerHTML = "";
	document.getElementById("SpecialAbilityList").innerHTML = "";
	document.getElementById("TraitList").innerHTML = "";
	
	set("money-pp"  , character.pp);
	set("money-gp"  , character.gp);
	set("money-sp"  , character.sp);
	set("money-cp"  , character.cp);
	set("money-misc", character.gem);
	
	document.getElementById("ACList").innerHTML = "";
	for (let armor of character.acList) {
		const span = AddACItem();
		span.childNodes[1].firstChild.value = armor.name  	  ?? "";
		span.childNodes[2].firstChild.value = armor.bonus 	  ?? "";
		span.childNodes[3].firstChild.value = armor.type  	  ?? "";
		span.childNodes[4].firstChild.value = armor.penalty	  ?? "";
		span.childNodes[5].firstChild.value = armor.spellfail ?? "";
		span.childNodes[6].firstChild.value = armor.notes 	  ?? "";
	}
	set("AC-Bonus"		  , character.ac_bonus	  );
	set("AC-Penalty"	  , character.ac_penalty  );
	set("AC-Spell-Failure", character.ac_spellfail);
}

//Process json from CharacterSheet.co.uk to CloudFlare KV
function ConvertFromMottokrosh (mottokrosh) {
	const character = { };
	
	character.name = mottokrosh.name;
	if (document.getElementById("CharacterIndex").value == "") //Stranger
		character.player = mottokrosh.user.displayName;
	
	character.class = mottokrosh.level;
	
	character.race 	 = mottokrosh.race;
	character.align  = mottokrosh.alignment
	character.gender = mottokrosh.gender;
	character.size 	 = mottokrosh.size;
	character.deity  = mottokrosh.deity;
	
	character.str	= mottokrosh.abilities.str;
	character.str_t	= mottokrosh.abilities.tempStr;
	character.dex	= mottokrosh.abilities.dex;
	character.dex_t = mottokrosh.abilities.tempDex;
	character.con	= mottokrosh.abilities.con;
	character.con_t = mottokrosh.abilities.tempCon;
	
	character.int	= mottokrosh.abilities.int;
	character.int_t = mottokrosh.abilities.tempInt;
	character.wis	= mottokrosh.abilities.wis;
	character.wis_t = mottokrosh.abilities.tempWis;
	character.cha	= mottokrosh.abilities.cha;
	character.cha_t = mottokrosh.abilities.tempCha;
	
	character.ac_total	 = mottokrosh.ac.total;
	character.ac_bonus	 = mottokrosh.ac.armorBonus;
	character.ac_shield  = mottokrosh.ac.shieldBonus;
	character.ac_size	 = mottokrosh.ac.sizeModifier;
	character.ac_nat	 = mottokrosh.ac.naturalArmor;
	character.ac_deflec  = mottokrosh.ac.deflectionModifier;
	character.ac_misc	 = mottokrosh.ac.miscModifier;
	character.ac_t       = mottokrosh.ac.touch;
	character.ac_ff      = mottokrosh.ac.flatFooted;
	character.ac_other   = mottokrosh.ac.otherModifiers;
	
	character.hp_current	= mottokrosh.hp.wounds;
	character.hp_nonlethal 	= mottokrosh.hp.nonLethal;
	character.hp_max		= mottokrosh.hp.total;
	
	character.dmg_reduc    = mottokrosh.damageReduction;
	character.spell_resist = mottokrosh.spellResistance;
	
	character.fort_total = mottokrosh.saves.fort.total;
	character.fort_base  = mottokrosh.saves.fort.base;
	character.fort_item  = mottokrosh.saves.fort.magicModifier + mottokrosh.saves.fort.tempModifier;
	character.fort_misc  = mottokrosh.saves.fort.miscModifier;
	character.fort_note  = mottokrosh.saves.fort.otherModifiers;
	
	character.ref_total = mottokrosh.saves.reflex.total;
	character.ref_base  = mottokrosh.saves.reflex.base;
	character.ref_item  = mottokrosh.saves.reflex.magicModifier + mottokrosh.saves.fort.tempModifier;
	character.ref_misc  = mottokrosh.saves.reflex.miscModifier;
	character.ref_note  = mottokrosh.saves.reflex.otherModifiers;
	
	character.will_total = mottokrosh.saves.will.total;
	character.will_base  = mottokrosh.saves.will.base;
	character.will_item  = mottokrosh.saves.will.magicModifier + mottokrosh.saves.fort.tempModifier;
	character.will_misc  = mottokrosh.saves.will.miscModifier;
	character.will_note  = mottokrosh.saves.will.otherModifiers;
	
	character.resist = mottokrosh.resistances;
	character.immune = mottokrosh.immunities;
	
	character.cmd_total = mottokrosh.cmd.total;
	character.cmd_size  = mottokrosh.cmd.sizeModifier;
	character.cmd_misc  = mottokrosh.cmd.miscModifiers;
	
	character.init_total = mottokrosh.initiative.total;
	character.init_misc  = mottokrosh.initiative.miscModifier;
	
	character.bab = mottokrosh.bab;
	
	character.spd_base = mottokrosh.speed.base;
	character.spd_amr  = mottokrosh.speed.withArmor;
	character.spd_fly  = mottokrosh.speed.fly;
	character.spd_swm  = mottokrosh.speed.swim;
	character.spd_clb  = mottokrosh.speed.climb;
	character.spd_brw  = mottokrosh.speed.burrow;
	character.spd_nts  = mottokrosh.speed.tempModifiers;
	
	character.cmb_total = mottokrosh.cmb.total;
	character.cmb_size  = mottokrosh.cmb.sizeModifier;
	character.cmb_misc  = mottokrosh.cmb.tempModifiers + mottokrosh.cmb.miscModifiers;
	
	character.mList = [];
	for (let i = 0;i < mottokrosh.melee.length; i++) {
		character.mList[i] 		 = {};
		character.mList[i].name  = mottokrosh.melee[i].weapon;
		character.mList[i].atk   = mottokrosh.melee[i].attackBonus;
		character.mList[i].dmg   = mottokrosh.melee[i].damage;
		character.mList[i].crit  = mottokrosh.melee[i].critical;
		character.mList[i].type  = mottokrosh.melee[i].type;
		character.mList[i].notes = mottokrosh.melee[i].notes;
	}
	
	character.rList = [];
	for (let i = 0;i < mottokrosh.ranged.length; i++) {
		character.rList[i] 		 = {};
		character.rList[i].name  = mottokrosh.ranged[i].weapon;
		character.rList[i].atk   = mottokrosh.ranged[i].attackBonus;
		character.rList[i].dmg   = mottokrosh.ranged[i].damage;
		character.rList[i].crit  = mottokrosh.ranged[i].critical;
		character.rList[i].type  = mottokrosh.ranged[i].type;
		character.rList[i].notes = mottokrosh.ranged[i].notes;
	}
	
	character.skills = [];
	function LoadSkill (name, skill) {
		character.skills[name]		  = {};
		character.skills[name].cs     = skill.cs;
		character.skills[name].total  = skill.total;
		character.skills[name].rank	  = skill.rank;
		character.skills[name].class  = skill.class;
		character.skills[name].racial = skill.racial;
		character.skills[name].trait  = skill.trait;
		character.skills[name].misc	  = skill.misc;
	}
	LoadSkill("acro",mottokrosh.skills.acrobatics);
	LoadSkill("bluff",mottokrosh.skills.bluff);
	LoadSkill("climb",mottokrosh.skills.climb);
	LoadSkill("dip",mottokrosh.skills.diplomacy);
	LoadSkill("dd",mottokrosh.skills.disableDevice);
	LoadSkill("dis",mottokrosh.skills.disguise);
	LoadSkill("ea",mottokrosh.skills.escapeArtist);
	LoadSkill("fly",mottokrosh.skills.fly);
	LoadSkill("heal",mottokrosh.skills.heal);
	LoadSkill("inti",mottokrosh.skills.intimidate);
	LoadSkill("arc",mottokrosh.skills.knowledgeArcana);
	LoadSkill("dun",mottokrosh.skills.knowledgeDungeoneering);
	LoadSkill("loc",mottokrosh.skills.knowledgeLocal);
	LoadSkill("nat",mottokrosh.skills.knowledgeNature);
	LoadSkill("pla",mottokrosh.skills.knowledgePlanes);
	LoadSkill("rel",mottokrosh.skills.knowledgeReligion);
	LoadSkill("per",mottokrosh.skills.perception);
	LoadSkill("ride",mottokrosh.skills.ride);
	LoadSkill("sm",mottokrosh.skills.senseMotive);
	LoadSkill("sc",mottokrosh.skills.spellcraft);
	LoadSkill("ste",mottokrosh.skills.stealth);
	LoadSkill("surv",mottokrosh.skills.survival);
	LoadSkill("swim",mottokrosh.skills.swim);
	LoadSkill("umd",mottokrosh.skills.useMagicDevice);
	//Background skills
	LoadSkill("app",mottokrosh.skills.appraise);
	LoadSkill("ha",mottokrosh.skills.handleAnimal);
	LoadSkill("eng",mottokrosh.skills.knowledgeEngineering);
	LoadSkill("geo",mottokrosh.skills.knowledgeGeography);
	LoadSkill("his",mottokrosh.skills.knowledgeHistory);
	LoadSkill("nob",mottokrosh.skills.knowledgeNobility);
	LoadSkill("lin",mottokrosh.skills.linguistics);
	LoadSkill("soh",mottokrosh.skills.sleightOfHand);
	
	function LoadMultiSkull (name, ...skills) {
		character.skills[name] = [];
		for (let i = 0; i < skills.length; i++) {
			character.skills[name][i]		 = {};
			character.skills[name][i].cs     = skills[i].classSkill;
			character.skills[name][i].name	 = skills[i].name;
			character.skills[name][i].total  = skills[i].total;
			character.skills[name][i].rank	 = skills[i].rank;
			character.skills[name][i].class  = skills[i].class;
			character.skills[name][i].racial = skills[i].racial;
			character.skills[name][i].trait  = skills[i].trait;
			character.skills[name][i].misc	 = skills[i].misc;
		}
	}
	LoadMultiSkull("craft",mottokrosh.skills.craft1, mottokrosh.skills.craft2,mottokrosh.skills.craft3);
	LoadMultiSkull("perf" ,mottokrosh.skills.perform1, mottokrosh.skills.perform2);
	LoadMultiSkull("prof" ,mottokrosh.skills.profession1, mottokrosh.skills.profession2);
	
	character.skill_notes = mottokrosh.skills.conditionalModifiers;
	character.lng = mottokrosh.languages;
	
	//Load customization here
	//document.getElementById("FeatList").innerHTML = "";
	//document.getElementById("SpecialAbilityList").innerHTML = "";
	//document.getElementById("TraitList").innerHTML = "";
	
	character.pp  = mottokrosh.money.pp;
	character.gp  = mottokrosh.money.gp;
	character.sp  = mottokrosh.money.sp;
	character.cp  = mottokrosh.money.cp;
	character.gem = mottokrosh.money.gems + " " + mottokrosh.money.other;
	
	character.acList = [];
	for (let i = 0;i < mottokrosh.ac.items.length; i++) {
		character.acList[i] 	  	  = {};
		character.acList[i].name  	  = mottokrosh.ac.items[i].name;
		character.acList[i].bonus 	  = mottokrosh.ac.items[i].bonus;
		character.acList[i].type  	  = mottokrosh.ac.items[i].type;
		character.acList[i].penalty	  = mottokrosh.ac.items[i].armorCheckPenalty;
		character.acList[i].spellfail = mottokrosh.ac.items[i].spellFailure;
		character.acList[i].notes 	  = mottokrosh.ac.items[i].properties;
	}
	character.ac_bonus 	   = mottokrosh.ac.itemTotals.bonus;
	character.ac_penalty   = mottokrosh.ac.itemTotals.armorCheckPenalty;
	character.ac_spellfail = mottokrosh.ac.itemTotals.spellFailure;
	
	/*character.gList = []; //Gears List
	for (let i = 0; i < gList.length; i++) {
		character.gList[i]  	  	 = {};
	}*/
	
	return character;
}

async function Load () {
	const files = document.getElementById("charsheet").files;
	if (files == null || files.length == 0) return;
	
	const text = await files[0].text();
	let json = JSON.parse(text);
	
	document.getElementById("charsheet").value = ""; //Remove from input
	
	if (json._id != null) json = ConvertFromMottokrosh(json);
	LoadFromJSON(json);
}