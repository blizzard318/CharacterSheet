function CloseOverlay() {
	document.getElementById("ConfirmDelete").onclick = null;
	document.getElementById("overlay").style.display = "none";
}

async function ShowPart2(name) {
	localStorage.setItem("name",name);
	//Shows the Part2 and customize the name.
	document.getElementById("Part2").style.display = "block";
	document.getElementById("Name").innerText = name;
	
	//Modify the new character button.
	const NewCharBtn = document.getElementById("NewCharacter");
	NewCharBtn.setAttribute("href","Character/?key=" + name);
	
	//Re-enable all the buttons.
	const buttons = document.getElementsByTagName("button");
	for (const button of buttons) {
	  button.disabled = false;
	}
	//Disable clicked button
	document.getElementById(name).disabled = true;
	
	document.getElementById('charsheet').onclick = async () => {
		const files = document.getElementById("charsheet").files;
		if (files == null || files.length == 0) return;
		
		const text = await files[0].text();
		let json = JSON.parse(text);
		
		document.getElementById("charsheet").value = ""; //Clear from input
		
		if (json._id != null) {
			json = ConvertFromMottokrosh(json);
			json.player = name;
		}
		
		const url = "../api/FateMachia/" + name;
		fetch(url,{
			method: "POST", //THIS IS POST, NEW CHARA. DON'T USE PUT.
			headers: { 
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(json)
		});
		location.reload();
	};
  
	const list = document.getElementById("CharacterList");
	list.innerHTML = ""; //Clear previous elements
	
	//This grabs all the characters of selected user.
	const response = await fetch("../api/FateMachia/" + name);
	const characters = await response.json();
	
	for (let character of characters) {
		list.appendChild(document.createElement("br"));
		
		let div = document.createElement("div");
		div.innerHTML  = "<b>Name:</b> <i>" + character.name + "</i>";
		div.innerHTML += "<br/>";
		div.innerHTML += "<b>Class:</b> <i>" + character.class + "</i>";
		div.style.textAlign = "left";
		div.style.fontSize = "130%"
		div.style.margin = "auto";
		//div.style.lineHeight  = "1";
		div.style.padding  = "5px 10px";
		div.style.width = "450px";
		//div.style.height = "70px";
		div.style.backgroundColor = "#555";
		div.style.border = "3px solid #666";
		list.appendChild(div);
		
		let delete_button = document.createElement("button");
		delete_button.innerText = "Delete";
		delete_button.style.float = "right";
		delete_button.style.transform = "translateY(-50%)";
		delete_button.onclick = function (){
			
			document.getElementById("overlay").style.display = "block";
			document.getElementById("CharacterName").innerHTML = character.name;
			
			document.getElementById("ConfirmDelete").onclick = function () {
				const url = "../api/FateMachia/" + character.key;
				fetch(url,{
					method: "DELETE",
					headers: { 
					  'Accept': 'application/json',
					  'Content-Type': 'application/json'
					}
				});
				div.remove();
				CloseOverlay();
			}
		}
		div.appendChild(delete_button);
		
		let view_button = document.createElement("button");
		view_button.innerText = "View";
		view_button.style.float = "right";
		view_button.style.transform = "translateY(-50%)";
		let a = document.createElement("a");
		a.setAttribute("href","Character/?key=" + character.key);
		a.appendChild(view_button);
		div.appendChild(a);
	}
}

const init = localStorage.getItem("name");
if (init != null) ShowPart2(init);

document.getElementById('charsheetbtn').onclick = () => {
	document.getElementById('charsheet').click();
};