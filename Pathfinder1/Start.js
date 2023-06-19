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
	
	document.getElementById("Current-HP").value 	= character.hp_current;
	document.getElementById("Temp-HP").value 		= character.hp_temp;
	document.getElementById("Non-Lethal-Dmg").value = character.hp_nonlethal;
	document.getElementById("Max-HP").value 		= character.hp_max;
	
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
	
	document.getElementById("BAB").value = character.bab;
	
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
}

function CheckURL () {
	const params = new Proxy(new URLSearchParams(window.location.search), {
	  get: (searchParams, prop) => searchParams.get(prop),
	});
	// Get the value of "some_key" in eg "https://example.com/?key=value"
	const key = params.key; // "value"
	
	if (key === undefined || key === null) return; //Stranger
	document.getElementById("PlayerName").disabled = true; //Only disable if its a stranger
	
	history.pushState(null, "", location.href.split("?")[0]);
	
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