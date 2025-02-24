let deleteClicked = false;
//Funktionen auslagern
function createTask(){
    const neuesLi = document.createElement("li");
    //damit direkt beschreibbar
    neuesLi.setAttribute("contentEditable", "true");
    // X-Button hinzufügen
    neuesLi.innerHTML = `Aufgabe <button class="btn-delete"><i class="fa-solid fa-trash-can"></button>`;
    return neuesLi;
}

function fehlermeldung(event){
    if(deleteClicked){
        deleteClicked = false;
        return;
    }

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
    if(cleanedText == "" || cleanedText == "Aufgabe"){
        fehlermeldung(task);
        return true;
    };
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
            const neuesLi = createTask();
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
    deleteClicked = true;
    const li = event.target.closest("li");
    if (li) li.remove(); 
    // if (li) {
    //     setTimeout(() => li.remove(), 0);  // Verzögerung, damit andere Events nicht stören
    // }

    // setTimeout(() => {
    //     const li = event.target.closest("li");
    //     if (li) li.remove();
    // }, 0);

      
    // if (li) {
    //     li.remove(); // Task sofort entfernen
    //     event.stopImmediatePropagation(); // Verhindert, dass das Event weiter "blubbert" und Konflikte erzeugt
    // }
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
        if(event.target.tagName == "LI")
        //event target übergeben
        // console.log(event.target);
        hasError(event.target);
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


