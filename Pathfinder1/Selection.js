async function ShowPart2(name) {
	document.getElementById("Part2").style.display = "block";
	document.getElementById("Name").innerHTML = name;
  
	if (name != "Stranger") {
		const response = await fetch("../api/Pathfinder1/" + name);
		const characters = await response.json();
		
		const list = document.getElementById("CharacterList");
		for (let character of characters) {
			
		}
	}
}