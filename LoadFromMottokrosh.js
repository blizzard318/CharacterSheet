//Process json from CharacterSheet.co.uk to CloudFlare KV
async function LoadFromMottokrosh () {
	const files = document.getElementById("charsheet").files;
	const text = await files[0].text();
	const json = JSON.parse(text);
	
	let character = { };
	
	character.player = json.user.displayName;
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
		var newgear = {};
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
		var newspellike = {};
		newspellike.name = spellLike.name;
		newspellike.prepared = spellLike.prepared;
		newspellike.cast = spellLike.cast;
		newspellike.notes = spellLike.notes;
		
		character.spellLikes += newspellike;
	}
	
	character.spells = [];
	for (let spell in json.spells) {
		var newspell = {};
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