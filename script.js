//Funktionen auslagern
function createTask(){
    const neuesLi = document.createElement("li");
    //damit direkt beschreibbar
    neuesLi.setAttribute("contentEditable", "true");
    // X-Button hinzufügen
    neuesLi.innerHTML = `Aufgabe <button class="btn-delete">X</button>`;
    return neuesLi;
}

function validateTask(task){

    //vor Inhaltsprüfung Btn entfernen
    const btn = task.querySelector("button");
    if(btn){
        btn.remove();
    }

    //mögl. Leerzeichen entfernen
    const taskContent = task.innerText.trim();
    //prüfen, ob Task leer
    if(taskContent == "" || taskContent == "Aufgabe"){
        alert("Bitte Text eingeben!");
        return;
    } 
}

function addTask(event){
    const btn = event.target;  
    // Liste zum Btn finden
    const listeId = btn.id.replace("btn-", "ul-");
    const liste = document.getElementById(listeId);
    
    //prüfen, ob Liste existiert
    if (liste) { 
        const neuesLi = createTask();
        liste.appendChild(neuesLi);
        //damit Cursor sofort da ist
        neuesLi.focus();

        //wenn verlassen, prüfen ob Inhalt
        neuesLi.addEventListener("blur", () => {
            validateTask(neuesLi);
        });

    }
}

function removeTask(event){
    //li vom x-btn finden
    const li = event.target.closest("li");
    if (li) li.remove();
}

function ausklappen(event){
    //bereits vorhandene li editierbar
    if (event.target.tagName === "LI") {
       //auf Klick Klasse hinzufügen
       event.target.classList.toggle("ausgeklappt");
       event.target.setAttribute("contentEditable", "true");
       event.target.focus();
      
       event.target.addEventListener("blur", () => {
           // Wenn Feld verlassen wird, setze das li zurück
           event.target.classList.remove("ausgeklappt");
       });
   }
}

//add btn bei Click 
document.querySelectorAll(".btn-add").forEach(btn => {
    btn.addEventListener("click", addTask);
});

//entfernen + ausklappen 
document.querySelectorAll("ul").forEach(ul => {
    ul.addEventListener("click", (event) => {
        //li löschen
        if (event.target.classList.contains("btn-delete")) removeTask(event);
        ausklappen(event);
    });
});


