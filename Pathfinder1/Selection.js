async function ShowPart2(name) {
	//Shows the Part2 and customize the name.
	document.getElementById("Part2").style.display = "block";
	document.getElementById("Name").innerHTML = name;
	
	//Modify the new character button.
	const NewCharBtn = document.getElementById("NewCharacter");
	NewCharBtn.setAttribute("href","./?key=" + name);
	
	//Re-enable all the buttons.
	const buttons = document.getElementsByTagName("button");
	for (const button of buttons) {
	  button.disabled = false;
	}
	//Disable clicked button
	document.getElementById(name).disabled = true;
  
	const list = document.getElementById("CharacterList");
	list.innerHTML = ""; //Clear previous elements
	
	//This grabs all the characters of selected user.
	const response = await fetch("../api/Pathfinder1/" + name);
	const characters = await response.json();
	
	for (let character of characters) {
		let button = document.createElement("button");
		button.innerText = "Name: " + character.name + "\r\nClass: " + character.class;
		
		let delete_button = document.createElement("button");
		delete_button.innerText = "Delete";
		button.appendChild(delete_button);
		
		let a = document.createElement("a");
		a.setAttribute("href","./?key=" + character.key);
		
		const url = "../api/Pathfinder1/" + character.player;
		fetch(url,{
			method: "POST", //THIS IS POST, NEW CHARA. DON'T USE PUT.
			headers: { 
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(character)
		});
		
		a.appendChild(delete_button);
		
		a = document.createElement("a");
		a.setAttribute("href","./?key=" + character.key);
		a.appendChild(button);
		
		list.appendChild(document.createElement("br"));
		list.appendChild(a);
	}
}