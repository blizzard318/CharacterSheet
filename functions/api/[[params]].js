function GetKV (ctx) {
	switch (ctx.params.params[0]) {
		case "Pathfinder1": return ctx.env.Pathfinder1;
		case "Pathfinder2": return {};
		case "Nobilis": 	return {};
	}
}

export async function onRequestGet (context) { //Get list or single character
	const KVList = GetKV(context);
	const PlayerName = context.params.params[1];
	const CharacterIndex = context.params.params[2];
	
	if (CharacterIndex === undefined || CharacterIndex === null) {
		const characters = await KVList.list({ prefix: PlayerName });
		return new Response(characters.keys.length);
	} else {
		const key = PlayerName + "/" + CharacterIndex;
		const character = await KVList.get(key);
		if (character === undefined || character === null) {
			return new Response("No such character exists");
		} 
		return new Response(character);
	}
	return new Response("Invalid Input");
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

/*export async function onRequest (context) {
	switch (context.functionPath.split("/")[1]) {
		case "Pathfinder1":
          var kv = context.env.Pathfinder1;
          break;
        case "Pathfinder2":
          break;
        case "Nobilis":
          break;
	}
	
	const params = context.params.params;
	
	const PlayerName = params.split("/")[2];
	const CharacterIndex = params.split("/")[3];
	
	if (CharacterIndex === undefined) {
		const characters = await KVList.list({ prefix: PlayerName });

		if (request.method === "GET") { //Get characters
			return new Response(characters.keys.length);
		} else if (request.method === "POST") { //Create a character
			const value = await request.text();
			let key = PlayerName + "/";

			if (characters.keys.length == 0) {
				key += 1;
			} else {
				const lastIndex = characters.keys.length - 1;
				const lastKey = characters.keys[lastIndex].name;
				key += Number(lastKey.split("/")[1]) + 1;
			}
			await KVList.put(key, value);
			return new Response("Created");
		}
	} else {
		const key = PlayerName + "/" + CharacterIndex;
		const character = await KVList.get(key);

		if (request.method === "GET") { //Get a character
			const character = await KVList.get(key);
			if (character === null) {
				return new Response("No such character exists");
			} 
			return new Response(character);
		} 
		else if (request.method === "PUT") { //Update a character
			const value = await request.text();
			await KVList.put(key, value);
			return new Response("Updated");
		} 
		else if (request.method === "DELETE") { //Delete a character
			await KVList.delete(key);
			return new Response("Deleted")
		}
	}
	return new Response(value);
}*/