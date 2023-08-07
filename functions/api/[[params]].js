function GetKV (ctx) {
	switch (ctx.params.params[0]) {
		case "Pathfinder1": return ctx.env.Pathfinder1;
		case "Pathfinder2": return {};
	}
}

export async function onRequestPost (context) { //Create new character
	const KVList = GetKV(context);
	const PlayerName = context.params.params[1];
	
	const characters = await KVList.list({ prefix: PlayerName });

	let key = PlayerName + "/";

	if (characters.keys.length == 0) {
		key += 1;
	} else {
		const lastIndex = characters.keys.length - 1;
		const lastKey = characters.keys[lastIndex].name;
		key += Number(lastKey.split("/")[1]) + 1;
	}
	const value = await context.request.text();
	
	await KVList.put(key, value);
	return new Response("Created");
}

export async function onRequestPut (context) { //Updates existing character
	const KVList = GetKV(context);
	const PlayerName = context.params.params[1];
	const CharacterIndex = context.params.params[2];
	
	const key = PlayerName + "/" + CharacterIndex;
	const value = await context.request.text();
	
	await KVList.put(key, value);
	return new Response("Updated");
}

export async function onRequestGet (context) { //Get list or single character
	const KVList = GetKV(context);
	const PlayerName = context.params.params[1];
	const CharacterIndex = context.params.params[2];
	
	if (CharacterIndex === undefined || CharacterIndex === null) { //List of characters
		const characters = await KVList.list({ prefix: PlayerName });
		let retval = [];
		for (let key of characters.keys) {
			const json = await KVList.get(key.name);
			const character = JSON.parse(json);
			let input = {};
			input.key = key.name;
			input.name = character.name;
			input.class = character.class;
			retval.push(input);
		}
		return new Response(JSON.stringify(retval));
	} else { //Single character
		const key = PlayerName + "/" + CharacterIndex;
		const character = await KVList.get(key);
		if (character === undefined || character === null) {
			return new Response("No such character exists");
		} 
		return new Response(character);
	}
	return new Response("Invalid Input");
}

export async function onRequestDelete (context) { //Deletes a character
	const KVList = GetKV(context);
	const PlayerName = context.params.params[1];
	const CharacterIndex = context.params.params[2];
	
	const key = PlayerName + "/" + CharacterIndex;
	
	await KVList.delete(key);
	return new Response("Deleted");
}