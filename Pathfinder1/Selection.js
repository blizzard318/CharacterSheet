async function ShowPart2(name) {
	const Part2 = document.getElementById("Part2");
	Part2.style.display = "block";
	document.getElementById("Name").innerHTML = name;
  
	if (name != "Stranger") {
		const response = await fetch("../api/Pathfinder1/" + name);
		const characters = await response.json();
		
		const list = document.getElementById("CharacterList");
		for (let character of characters) {
			let button = document.createElement("button");
			button.innerText = "Name: " + character.name + " Class: " + character.class;
			
			let a = document.createElement("a");
			a.setAttribute("href","./?key=" + character.key);
			a.appendChild(button);
			
			Part2.appendChild(document.createElement("br"));
			Part2.appendChild(a);
		}
	}
}