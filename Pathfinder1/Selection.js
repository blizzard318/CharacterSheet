async function ShowPart2(name) {
	document.getElementById("Part2").style.display = "block";
	document.getElementById("Name").innerHTML = name;
  
	if (name != "Stranger") {
		const response = await fetch("../api/Pathfinder1/" + name);
		const characters = await response.json();
		
		const list = document.getElementById("CharacterList");
		for (let character of characters) {
			let li = document.createElement("li");
			
			let button = document.createElement("button");
			button.innerText = "Name: " + character.name + " Class: " + character.class;
			
			li.appendChild(button);
			list.appendChild(li);
		}
	}
}