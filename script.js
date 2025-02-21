//Funktionen auslagern
function createTask(){
    const neuesLi = document.createElement("li");
    //damit direkt beschreibbar
    neuesLi.setAttribute("contentEditable", "true");
    // X-Button hinzufügen
    neuesLi.innerHTML = `Aufgabe <button class="btn-delete">X</button>`;
    return neuesLi;
}

function fehlermeldung(event){
    //parent finden
    let container = event.closest("div");
    let fehler = container.querySelector(".fehlermeldung");

    //prüfen, ob das richtige Element angekommen ist
    if (fehler && fehler.classList.contains("fehlermeldung")) { 
        fehler.style.display = "block";
        event.style.border = "3px solid rgb(226, 58, 58)";

        //nach 3 Sekunden Fehlermeldung entfernen
        setTimeout(() => {
            fehler.style.display = "none";
            event.style.border = "2px solid green";
        }, 3000);
    }

}

function validateTask(task){

    //vor Inhaltsprüfung Btn entfernen, jedes Feld wird geprüft, also wird bei jedem Feld der Btn entfernt
    const btn = task.querySelector("button");
    if(btn){
        btn.remove();
    }

    const taskContent = task.innerText.trim();
    //prüfen, ob Task leer
    if(taskContent == "" || taskContent == "Aufgabe") fehlermeldung(task);
        //btn nach Prüfung wieder hinzufügen, muss außerhalb der if, weil er immer hinzugefügt werden muss
        task.appendChild(btn);  
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
//ul blur event, blur blubbert nicht, focusout schon
document.querySelectorAll("ul").forEach(ul => {
    ul.addEventListener("focusout", (event) => {
        console.log(event.target);
        if(event.target.tagName == "LI")
        //event target übergeben
        validateTask(event.target);
    })
});

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


