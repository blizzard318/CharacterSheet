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
		div.innerHTML  = "<b>Name:</b> <i>" + character.name + "</i>";
		div.innerHTML += "<br/>";
		div.innerHTML += "<b>Class:</b> <i>" + character.class + "</i>";
		div.style.textAlign = "left";
		div.fontSize = "130%"
		div.style.margin = "auto";
		//div.style.lineHeight  = "1";
		div.style.padding  = "15 5";
		div.style.width = "400px";
		//div.style.height = "70px";
		div.style.backgroundColor = "#555";
		div.style.border = "3px solid #666;"
		list.appendChild(div);
		
		let delete_button = document.createElement("button");
		delete_button.innerText = "Delete";
		delete_button.style.float = "right";
		delete_button.style.transform = "translateY(-50%)";
		delete_button.onclick = function (){
			
			document.getElementById("overlay").style.display = "block";
			document.getElementById("CharacterName").innerHTML = "<i>" + character.name + "</i>";
			
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
		div.appendChild(delete_button);
		
		
		let view_button = document.createElement("button");
		view_button.innerText = "View";
		view_button.style.float = "right";
		view_button.style.transform = "translateY(-50%)";
		let a = document.createElement("a");
		a.setAttribute("href","./?key=" + character.key);
		a.appendChild(view_button);
		div.appendChild(a);
	}
}

function CloseOverlay() {
	document.getElementById("ConfirmDelete").onclick = null;
	document.getElementById("overlay").style.display = "none";
}
