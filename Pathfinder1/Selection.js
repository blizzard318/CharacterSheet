async function ShowPart2(name) {
	//Shows the Part2 and customize the name.
	document.getElementById("Part2").style.display = "block";
	document.getElementById("Name").innerText = name;
	
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
		list.appendChild(document.createElement("br"));
		
		let div = document.createElement("div");
		div.innerText = "Name: " + character.name + "\r\nClass: " + character.class;
		div.style.textAlign = "left";
		//div.style.lineHeight  = "1";
		div.style.padding  = "15 0";
		div.style.width = "400px";
		//div.style.height = "70px";
		div.style.backgroundColor = "#555";
		
		let view_button = document.createElement("button");
		view_button.innerText = "View";
		view_button.style.float = "right";
		view_button.style.verticalAlign = "middle";
		let a = document.createElement("a");
		a.setAttribute("href","./?key=" + character.key);
		a.appendChild(view_button);
		list.appendChild(a);
		
		let delete_button = document.createElement("button");
		delete_button.innerText = "Delete";
		delete_button.style.float = "right";
		delete_button.style.verticalAlign = "middle";
		delete_button.onclick = function (){
			
			document.getElementById("overlay").style.display = "block";
			document.getElementById("CharacterName").innerText = character.name;
			
			document.getElementById("ConfirmDelete").onclick = function () {
				const url = "../api/Pathfinder1/" + character.key;
				fetch(url,{
					method: "DELETE",
					headers: { 
					  'Accept': 'application/json',
					  'Content-Type': 'application/json'
					}
				});
				CloseOverlay();
			}
		}
		list.appendChild(delete_button);
	}
}

function CloseOverlay() {
	document.getElementById("ConfirmDelete").onclick = null;
	document.getElementById("overlay").style.display = "none";
}
