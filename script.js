 //Id des letzten li aus Liste holen, muss global für create
//  let containerTag = document.getElementById("ul-tag");
//  lastChildTag = containerTag.lastElementChild;

//  let containerWoche = document.getElementById("ul-woche");
//  lastChildTag = containerWoche.lastElementChild;

//  let containerMonat = document.getElementById("ul-monat");
//  lastChildTag = containerMonat.lastElementChild;

//Funktionen auslagern
function createTask(){
    const neuesLi = document.createElement("li");
    //damit direkt beschreibbar
    neuesLi.contentEditable = true;
    neuesLi.draggable = true;

    // X-Button hinzufügen
    neuesLi.innerHTML = `Aufgabe <button class="btn-delete"><i class="fa-solid fa-trash-can"></button>`;
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

function hasError(task){
    const cleanedText = task.textContent.trim();
    //prüfen, ob Task leer
    if(cleanedText == "" || cleanedText == "Aufgabe") return true;
    return false;
}

function idGenerieren(liste, neuesLi){
    let lastChild = liste.lastElementChild;              
    let alteId = lastChild.id;
    //split teilt am Strich und entfernt ihn, slice für Teilarray - letztes Zeichen,
    // join fügt Arrayplätze zusammen mit -
    let idOhneZahl = alteId.split("-").slice(0, -1).join("-");
    //pop nimmt das letzte Zeichen und gibt es zurück
    //nur Variablen, direkte Zahlen sind inkre., Rückgabewerte nicht
    let zahlInk = parseInt(alteId.split("-").pop(), 10) + 1;
    
    let neueId = `${idOhneZahl}-${zahlInk}`;
    neuesLi.id = neueId;
}

function addTask(event){
    const btn = event.target;  
    // Liste zum Btn finden
    const listeId = btn.id.replace("btn-", "ul-");
    const liste = document.getElementById(listeId);
    
    //prüfen, ob Liste existiert
    if (liste) {   
        //some damit bool angenommen wird
        const leeresLi = Array.from(liste.children).some(li => hasError(li));
       
        if(leeresLi){
            return;
        } else{
            let neuesLi = createTask();

            //test
            idGenerieren(liste, neuesLi);


            //Zugriff auf Liste, hier sollte Id vergeben werden
            // let lastChild = liste.lastElementChild;         
            
            // let alteId = lastChild.id;
            // //split teilt am Strich und entfernt ihn, slice für Teilarray - letztes Zeichen,
            // // join fügt Arrayplätze zusammen mit -
            // let idOhneZahl = alteId.split("-").slice(0, -1).join("-");
            // //pop nimmt das letzte Zeichen und gibt es zurück
            // let zahlInk = parseInt(alteId.split("-").pop(), 10) ++;
            
            // let neueId = `${idOhneZahl}-${zahlInk}`;
            // neuesLi.id = neueId;


            liste.appendChild(neuesLi);
            //damit Cursor sofort da ist
            neuesLi.focus();

            //wenn verlassen, prüfen ob Inhalt
            neuesLi.addEventListener("blur", () => {
                hasError(neuesLi);
            });
        }; 
    }
}

function removeTask(event){

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
        if(event.target.tagName == "LI" && !event.relatedTarget?.classList.contains("btn-delete")){
            if(hasError(event.target)) fehlermeldung(event.target);

        } 
        return;
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

document.querySelectorAll("ul").forEach(liste => {
    liste.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text", event.target.id);
    });

    liste.addEventListener("dragover", (event) => {
        event.preventDefault(); // Erlaubt das Droppen

        const draggedElement = document.getElementById(event.dataTransfer.getData("text"));
        const children = [...liste.children].filter(li => li !== draggedElement);

        let closestLi = null;
        let closestOffset = Number.NEGATIVE_INFINITY;

        children.forEach(li => {
            const box = li.getBoundingClientRect();
            const offset = event.clientY - box.top - box.height / 2;
            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                closestLi = li;
            }
        });

        if (closestLi) {
            liste.insertBefore(draggedElement, closestLi);
        } else {
            liste.appendChild(draggedElement);
        }
    });

    liste.addEventListener("drop", (event) => {
        event.preventDefault();
    });
});

