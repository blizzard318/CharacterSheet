function SetUpFunctions() {
	function AbilitySetUp(name) {
		document.getElementById(name).addEventListener('focusout', _ => ModifyAbility(name));
		document.getElementById(name+"-temp").addEventListener('focusout', _ => ModifyAbility(name));
		ModifyAbility(name);
	}
	AbilitySetUp("str");
	AbilitySetUp("dex");
	AbilitySetUp("con");
	AbilitySetUp("int");
	AbilitySetUp("wis");
	AbilitySetUp("cha");
	
	document.getElementById("Base-HP").addEventListener('focusout', _ => ModifyHP());
	document.getElementById("Temp-HP").addEventListener('focusout', _ => ModifyHP());
	document.getElementById("Non-Lethal-Dmg").addEventListener('focusout', _ => ModifyHP());
	ModifyHP();
	
	const BAB = document.getElementsByClassName("BAB")[0];
	BAB.addEventListener('focusout', _ => ModifyBAB(BAB.value));
	ModifyBAB(BAB.value);
	
	document.getElementById("Alignment").addEventListener('focusout', _ => ModifyHP());
	
	//Remembers if you had the details closed or opened.
	document.querySelectorAll('details').forEach(deet => {
		deet.open = localStorage.getItem(deet.id) === 'true';
		deet.addEventListener('toggle', _ => localStorage.setItem(deet.id, deet.open));
	});
	
	document.querySelectorAll('input').forEach(inp => {
		inp.addEventListener('focusout', _ => SaveToCloudFlare());
	});
}

async function LoadFromCloudFlare (key) {
	const response = await fetch("../api/Pathfinder1/" + key);
	const character = await response.json();
	
	document.getElementById("CharacterName").value = character.name;
	document.getElementById("CharacterIndex").value = key.split('/')[1];
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
	
	for (let i = 0; i < character.mList; i++) {
		let span = AddAttack('Melee');
		span.childNodes[1] = character.mList[i].name ;
		span.childNodes[2] = character.mList[i].atk  ;
		span.childNodes[3] = character.mList[i].dmg  ;
		span.childNodes[4] = character.mList[i].crit ;
		span.childNodes[5] = character.mList[i].type ;
		span.childNodes[6] = character.mList[i].notes;
	}
	
	for (let i = 0; i < character.rList; i++) {
		let span = AddAttack('Ranged');
		span.childNodes[1] = character.rList[i].name ;
		span.childNodes[2] = character.rList[i].atk  ;
		span.childNodes[3] = character.rList[i].dmg  ;
		span.childNodes[4] = character.rList[i].crit ;
		span.childNodes[5] = character.rList[i].type ;
		span.childNodes[6] = character.rList[i].range;
		span.childNodes[7] = character.rList[i].ammo ;
	}
	
	document.getElementById("acrobatics-class-skill").checked = character.acro_cs    ;
	document.getElementById("acrobatics-total").value         = character.acro_total ;
	document.getElementById("acrobatics-rank").value          = character.acro_rank  ;
	document.getElementById("acrobatics-class").value         = character.acro_class ;
	document.getElementById("acrobatics-racial").value        = character.acro_racial;
	document.getElementById("acrobatics-trait").value         = character.acro_trait ;
	document.getElementById("acrobatics-misc").value          = character.acro_misc  ;
	
	document.getElementById("bluff-class-skill").checked = character.bluff_cs    ;
	document.getElementById("bluff-total").value         = character.bluff_total ;
	document.getElementById("bluff-rank").value          = character.bluff_rank  ;
	document.getElementById("bluff-class").value         = character.bluff_class ;
	document.getElementById("bluff-racial").value        = character.bluff_racial;
	document.getElementById("bluff-trait").value         = character.bluff_trait ;
	document.getElementById("bluff-misc").value          = character.bluff_misc  ;
	
	document.getElementById("climb-class-skill").checked = character.climb_cs    ;
	document.getElementById("climb-total").value         = character.climb_total ;
	document.getElementById("climb-rank").value          = character.climb_rank  ;
	document.getElementById("climb-class").value         = character.climb_class ;
	document.getElementById("climb-racial").value        = character.climb_racial;
	document.getElementById("climb-trait").value         = character.climb_trait ;
	document.getElementById("climb-misc").value          = character.climb_misc  ;
	
	document.getElementById("diplomacy-class-skill").checked = character.dip_cs    ;
	document.getElementById("diplomacy-total").value         = character.dip_total ;
	document.getElementById("diplomacy-rank").value          = character.dip_rank  ;
	document.getElementById("diplomacy-class").value         = character.dip_class ;
	document.getElementById("diplomacy-racial").value        = character.dip_racial;
	document.getElementById("diplomacy-trait").value         = character.dip_trait ;
	document.getElementById("diplomacy-misc").value          = character.dip_misc  ;
	
	document.getElementById("disable-device-class-skill").checked = character.dd_cs    ;
	document.getElementById("disable-device-total").value         = character.dd_total ;
	document.getElementById("disable-device-rank").value          = character.dd_rank  ;
	document.getElementById("disable-device-class").value         = character.dd_class ;
	document.getElementById("disable-device-racial").value        = character.dd_racial;
	document.getElementById("disable-device-trait").value         = character.dd_trait ;
	document.getElementById("disable-device-misc").value          = character.dd_misc  ;
	
	document.getElementById("disguise-class-skill").checked = character.dis_cs    ;
	document.getElementById("disguise-total").value         = character.dis_total ;
	document.getElementById("disguise-rank").value          = character.dis_rank  ;
	document.getElementById("disguise-class").value         = character.dis_class ;
	document.getElementById("disguise-racial").value        = character.dis_racial;
	document.getElementById("disguise-trait").value         = character.dis_trait ;
	document.getElementById("disguise-misc").value          = character.dis_misc  ;
	
	document.getElementById("escape-artist-class-skill").checked = character.ea_cs    ;
	document.getElementById("escape-artist-total").value         = character.ea_total ;
	document.getElementById("escape-artist-rank").value          = character.ea_rank  ;
	document.getElementById("escape-artist-class").value         = character.ea_class ;
	document.getElementById("escape-artist-racial").value        = character.ea_racial;
	document.getElementById("escape-artist-trait").value         = character.ea_trait ;
	document.getElementById("escape-artist-misc").value          = character.ea_misc  ;
	
	document.getElementById("fly-class-skill").checked = character.fly_cs    ;
	document.getElementById("fly-total").value         = character.fly_total ;
	document.getElementById("fly-rank").value          = character.fly_rank  ;
	document.getElementById("fly-class").value         = character.fly_class ;
	document.getElementById("fly-racial").value        = character.fly_racial;
	document.getElementById("fly-trait").value         = character.fly_trait ;
	document.getElementById("fly-misc").value          = character.fly_misc  ;
	
	document.getElementById("heal-class-skill").checked = character.heal_cs    ;
	document.getElementById("heal-total").value         = character.heal_total ;
	document.getElementById("heal-rank").value          = character.heal_rank  ;
	document.getElementById("heal-class").value         = character.heal_class ;
	document.getElementById("heal-racial").value        = character.heal_racial;
	document.getElementById("heal-trait").value         = character.heal_trait ;
	document.getElementById("heal-misc").value          = character.heal_misc  ;
	
	document.getElementById("intimidate-class-skill").checked = character.inti_cs    ;
	document.getElementById("intimidate-total").value         = character.inti_total ;
	document.getElementById("intimidate-rank").value          = character.inti_rank  ;
	document.getElementById("intimidate-class").value         = character.inti_class ;
	document.getElementById("intimidate-racial").value        = character.inti_racial;
	document.getElementById("intimidate-trait").value         = character.inti_trait ;
	document.getElementById("intimidate-misc").value          = character.inti_misc  ;
	
	document.getElementById("arcana-class-skill").checked = character.arc_cs    ;
	document.getElementById("arcana-total").value         = character.arc_total ;
	document.getElementById("arcana-rank").value          = character.arc_rank  ;
	document.getElementById("arcana-class").value         = character.arc_class ;
	document.getElementById("arcana-racial").value        = character.arc_racial;
	document.getElementById("arcana-trait").value         = character.arc_trait ;
	document.getElementById("arcana-misc").value          = character.arc_misc  ;
	
	document.getElementById("dungeoneering-class-skill").checked = character.dun_cs    ;
	document.getElementById("dungeoneering-total").value         = character.dun_total ;
	document.getElementById("dungeoneering-rank").value          = character.dun_rank  ;
	document.getElementById("dungeoneering-class").value         = character.dun_class ;
	document.getElementById("dungeoneering-racial").value        = character.dun_racial;
	document.getElementById("dungeoneering-trait").value         = character.dun_trait ;
	document.getElementById("dungeoneering-misc").value          = character.dun_misc  ;
	
	document.getElementById("local-class-skill").checked = character.loc_cs    ;
	document.getElementById("local-total").value         = character.loc_total ;
	document.getElementById("local-rank").value          = character.loc_rank  ;
	document.getElementById("local-class").value         = character.loc_class ;
	document.getElementById("local-racial").value        = character.loc_racial;
	document.getElementById("local-trait").value         = character.loc_trait ;
	document.getElementById("local-misc").value          = character.loc_misc  ;
	
	document.getElementById("nature-class-skill").checked = character.nat_cs    ;
	document.getElementById("nature-total").value         = character.nat_total ;
	document.getElementById("nature-rank").value          = character.nat_rank  ;
	document.getElementById("nature-class").value         = character.nat_class ;
	document.getElementById("nature-racial").value        = character.nat_racial;
	document.getElementById("nature-trait").value         = character.nat_trait ;
	document.getElementById("nature-misc").value          = character.nat_misc  ;
	
	document.getElementById("planes-class-skill").checked = character.pla_cs    ;
	document.getElementById("planes-total").value         = character.pla_total ;
	document.getElementById("planes-rank").value          = character.pla_rank  ;
	document.getElementById("planes-class").value         = character.pla_class ;
	document.getElementById("planes-racial").value        = character.pla_racial;
	document.getElementById("planes-trait").value         = character.pla_trait ;
	document.getElementById("planes-misc").value          = character.pla_misc  ;
	
	document.getElementById("religion-class-skill").checked = character.rel_cs    ;
	document.getElementById("religion-total").value         = character.rel_total ;
	document.getElementById("religion-rank").value          = character.rel_rank  ;
	document.getElementById("religion-class").value         = character.rel_class ;
	document.getElementById("religion-racial").value        = character.rel_racial;
	document.getElementById("religion-trait").value         = character.rel_trait ;
	document.getElementById("religion-misc").value          = character.rel_misc  ;
	
	document.getElementById("perception-class-skill").checked = character.per_cs    ;
	document.getElementById("perception-total").value         = character.per_total ;
	document.getElementById("perception-rank").value          = character.per_rank  ;
	document.getElementById("perception-class").value         = character.per_class ;
	document.getElementById("perception-racial").value        = character.per_racial;
	document.getElementById("perception-trait").value         = character.per_trait ;
	document.getElementById("perception-misc").value          = character.per_misc  ;
	
	document.getElementById("ride-class-skill").checked = character.ride_cs    ;
	document.getElementById("ride-total").value         = character.ride_total ;
	document.getElementById("ride-rank").value          = character.ride_rank  ;
	document.getElementById("ride-class").value         = character.ride_class ;
	document.getElementById("ride-racial").value        = character.ride_racial;
	document.getElementById("ride-trait").value         = character.ride_trait ;
	document.getElementById("ride-misc").value          = character.ride_misc  ;
	
	document.getElementById("sense-motive-class-skill").checked = character.sm_cs    ;
	document.getElementById("sense-motive-total").value         = character.sm_total ;
	document.getElementById("sense-motive-rank").value          = character.sm_rank  ;
	document.getElementById("sense-motive-class").value         = character.sm_class ;
	document.getElementById("sense-motive-racial").value        = character.sm_racial;
	document.getElementById("sense-motive-trait").value         = character.sm_trait ;
	document.getElementById("sense-motive-misc").value          = character.sm_misc  ;
	
	document.getElementById("spellcraft-class-skill").checked = character.sc_cs    ;
	document.getElementById("spellcraft-total").value         = character.sc_total ;
	document.getElementById("spellcraft-rank").value          = character.sc_rank  ;
	document.getElementById("spellcraft-class").value         = character.sc_class ;
	document.getElementById("spellcraft-racial").value        = character.sc_racial;
	document.getElementById("spellcraft-trait").value         = character.sc_trait ;
	document.getElementById("spellcraft-misc").value          = character.sc_misc  ;
	
	document.getElementById("stealth-class-skill").checked = character.ste_cs    ;
	document.getElementById("stealth-total").value         = character.ste_total ;
	document.getElementById("stealth-rank").value          = character.ste_rank  ;
	document.getElementById("stealth-class").value         = character.ste_class ;
	document.getElementById("stealth-racial").value        = character.ste_racial;
	document.getElementById("stealth-trait").value         = character.ste_trait ;
	document.getElementById("stealth-misc").value          = character.ste_misc  ;
	
	document.getElementById("survival-class-skill").checked = character.surv_cs    ;
	document.getElementById("survival-total").value         = character.surv_total ;
	document.getElementById("survival-rank").value          = character.surv_rank  ;
	document.getElementById("survival-class").value         = character.surv_class ;
	document.getElementById("survival-racial").value        = character.surv_racial;
	document.getElementById("survival-trait").value         = character.surv_trait ;
	document.getElementById("survival-misc").value          = character.surv_misc  ;
	
	document.getElementById("swim-class-skill").checked = character.swim_cs    ;
	document.getElementById("swim-total").value         = character.swim_total ;
	document.getElementById("swim-rank").value          = character.swim_rank  ;
	document.getElementById("swim-class").value         = character.swim_class ;
	document.getElementById("swim-racial").value        = character.swim_racial;
	document.getElementById("swim-trait").value         = character.swim_trait ;
	document.getElementById("swim-misc").value          = character.swim_misc  ;
	
	document.getElementById("use-magic-device-class-skill").checked = character.umd_cs    ;
	document.getElementById("use-magic-device-total").value         = character.umd_total ;
	document.getElementById("use-magic-device-rank").value          = character.umd_rank  ;
	document.getElementById("use-magic-device-class").value         = character.umd_class ;
	document.getElementById("use-magic-device-racial").value        = character.umd_racial;
	document.getElementById("use-magic-device-trait").value         = character.umd_trait ;
	document.getElementById("use-magic-device-misc").value          = character.umd_misc  ;
	
	document.getElementById("appraise-class-skill").checked = character.app_cs    ;
	document.getElementById("appraise-total").value         = character.app_total ;
	document.getElementById("appraise-rank").value          = character.app_rank  ;
	document.getElementById("appraise-class").value         = character.app_class ;
	document.getElementById("appraise-racial").value        = character.app_racial;
	document.getElementById("appraise-trait").value         = character.app_trait ;
	document.getElementById("appraise-misc").value          = character.app_misc  ;
	
	document.getElementById("handle-animal-class-skill").checked = character.ha_cs    ;
	document.getElementById("handle-animal-total").value         = character.ha_total ;
	document.getElementById("handle-animal-rank").value          = character.ha_rank  ;
	document.getElementById("handle-animal-class").value         = character.ha_class ;
	document.getElementById("handle-animal-racial").value        = character.ha_racial;
	document.getElementById("handle-animal-trait").value         = character.ha_trait ;
	document.getElementById("handle-animal-misc").value          = character.ha_misc  ;
	
	document.getElementById("engineering-class-skill").checked = character.eng_cs    ;
	document.getElementById("engineering-total").value         = character.eng_total ;
	document.getElementById("engineering-rank").value          = character.eng_rank  ;
	document.getElementById("engineering-class").value         = character.eng_class ;
	document.getElementById("engineering-racial").value        = character.eng_racial;
	document.getElementById("engineering-trait").value         = character.eng_trait ;
	document.getElementById("engineering-misc").value          = character.eng_misc  ;
	
	document.getElementById("geography-class-skill").checked = character.geo_cs    ;
	document.getElementById("geography-total").value         = character.geo_total ;
	document.getElementById("geography-rank").value          = character.geo_rank  ;
	document.getElementById("geography-class").value         = character.geo_class ;
	document.getElementById("geography-racial").value        = character.geo_racial;
	document.getElementById("geography-trait").value         = character.geo_trait ;
	document.getElementById("geography-misc").value          = character.geo_misc  ;
	
	document.getElementById("history-class-skill").checked = character.his_cs    ;
	document.getElementById("history-total").value         = character.his_total ;
	document.getElementById("history-rank").value          = character.his_rank  ;
	document.getElementById("history-class").value         = character.his_class ;
	document.getElementById("history-racial").value        = character.his_racial;
	document.getElementById("history-trait").value         = character.his_trait ;
	document.getElementById("history-misc").value          = character.his_misc  ;
	
	document.getElementById("nobility-class-skill").checked = character.nob_cs    ;
	document.getElementById("nobility-total").value         = character.nob_total ;
	document.getElementById("nobility-rank").value          = character.nob_rank  ;
	document.getElementById("nobility-class").value         = character.nob_class ;
	document.getElementById("nobility-racial").value        = character.nob_racial;
	document.getElementById("nobility-trait").value         = character.nob_trait ;
	document.getElementById("nobility-misc").value          = character.nob_misc  ;
	
	document.getElementById("linguistics-class-skill").checked = character.lin_cs    ;
	document.getElementById("linguistics-total").value         = character.lin_total ;
	document.getElementById("linguistics-rank").value          = character.lin_rank  ;
	document.getElementById("linguistics-class").value         = character.lin_class ;
	document.getElementById("linguistics-racial").value        = character.lin_racial;
	document.getElementById("linguistics-trait").value         = character.lin_trait ;
	document.getElementById("linguistics-misc").value          = character.lin_misc  ;
	
	document.getElementById("sleight-of-hand-class-skill").checked = character.soh_cs    ;
	document.getElementById("sleight-of-hand-total").value         = character.soh_total ;
	document.getElementById("sleight-of-hand-rank").value          = character.soh_rank  ;
	document.getElementById("sleight-of-hand-class").value         = character.soh_class ;
	document.getElementById("sleight-of-hand-racial").value        = character.soh_racial;
	document.getElementById("sleight-of-hand-trait").value         = character.soh_trait ;
	document.getElementById("sleight-of-hand-misc").value          = character.soh_misc  ;
}

function CheckURL () {
	const params = new Proxy(new URLSearchParams(window.location.search), {
	  get: (searchParams, prop) => searchParams.get(prop),
	});
	// Get the value of "some_key" in eg "https://example.com/?key=value"
	const key = params.key; // "value"
	
	if (key != null) { //Not a stranger
		document.getElementById("PlayerName").disabled = true; //Only enabled if its a stranger
		
		//history.replaceState(null, "", location.href.split("?")[0]);
		
		if (key.includes("/")) LoadFromCloudFlare(key); //Loading a Existing character
		else { //Create a New character
			let character = { };

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