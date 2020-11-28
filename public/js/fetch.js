function display(json){
    let list = "";
    for(i = 0; i < json.length; i++){
        list += "<li>" + json[i].name + "</li>";
    }
    document.getElementById("json").innerHTML = list;
}

window.addEventListener("load", () => { 
    fetch('/feed/fetch')
    .then(res => res.json())
    .then(data => {
        display(data.avengers);
    })
    .catch(console.error);
}) 

function submission(){
fetch('/feed/insert', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: document.getElementById("name").value}) 
})
    .then(res => res.json())
    .then(data => {
        display(data.avengers);
    })
    .catch(console.error);
}