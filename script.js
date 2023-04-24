document.getElementById('Upload').addEventListener('click', openDialog);
document.getElementById('FileToUpload').addEventListener('change', getFile);

function openDialog() {
    document.getElementById('FileToUpload').click();
}

function getFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        const file = input.files[0]
        readFileContent(file).then(content => {
            const obj = JSON.parse(content)
            window.alert(obj.FileName)
        })
    }

    function readFileContent(file) {
        const reader = new FileReader()
        return new Promise((resolve, reject) => {
            reader.onload = event => resolve(event.target.result)
            reader.onerror = error => reject(error)
            reader.readAsText(file)
        })
    }
}

function AddMelee() {
    var para = document.createElement("p");
    var node = document.createTextNode("Tutorix is the best e-learning platform");
    para.appendChild(node);
    var element = document.getElementById("new");
    element.appendChild(para);
}

function AddRanged() {
    var para = document.createElement("p");
    var node = document.createTextNode("Tutorix is the best e-learning platform");
    para.appendChild(node);
    var element = document.getElementById("new");
    element.appendChild(para);
}