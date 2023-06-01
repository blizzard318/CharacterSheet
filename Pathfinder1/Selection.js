async function ShowPart2(name) {
	document.getElementById("Part2").style.display = "block";
	document.getElementById("Name").innerHTML = name;
  
	const list = document.getElementById("CharacterList");
	list.innerHTML = "";
	
	if (name != "Stranger") {
		const response = await fetch("../api/Pathfinder1/" + name);
		const characters = await response.json();
		
		for (let character of characters) {
			let button = document.createElement("button");
			button.innerText = "Name: " + character.name + " Class: " + character.class;
			
			let a = document.createElement("a");
			a.setAttribute("href","./?key=" + character.key);
			a.appendChild(button);
			
			list.appendChild(document.createElement("br"));
			list.appendChild(a);
		}
	}
}