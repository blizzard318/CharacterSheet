async function ShowPart2(name) {
	document.getElementById("Part2").style.display = "block";
	document.getElementById("Name").innerHTML = name;
	
	const buttons = document.getElementsByTagName("button");
	for (const button of buttons) {
	  button.disabled = false;
	} //Re-enable all buttons, disable clicked button
	document.getElementById(name).disabled = true;
  
	const list = document.getElementById("CharacterList");
	list.innerHTML = ""; //Clear previous elements
	
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