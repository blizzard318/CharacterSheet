async function LoadFromCloudFlare () {
	var xhr = new XMLHttpRequest();
    xhr.open('GET', "/LoadFromCloudFlare", true);
    xhr.responseType = 'json';
    xhr.onload = function() {
		alert(xhr.response);
    };
    xhr.send();
	
	/*const files = document.getElementById("charsheet").files;
	const text = await files[0].text();
	const json = JSON.parse(text);
	
	let character = { };
	
	character.name = document.getElementsByName("CharacterName")[0].value;
	character.player = document.getElementsByName("PlayerName")[0].value;
	
	character.class = document.getElementsByName("Class")[0].value;
	
	character.race = document.getElementsByName("Race")[0].value;
	character.alignment = document.getElementsByName("Alignment")[0].value;
	character.gender = document.getElementsByName("Gender")[0].value;
	character.size = document.getElementsByName("Size")[0].value;
	character.deity = document.getElementsByName("Deity")[0].value;*/
}