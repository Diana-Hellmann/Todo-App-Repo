const buttons = document.querySelectorAll(".btn-add");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        
        // Id des geklickten Btn
        const buttonId = btn.id; 
        
        // Liste zum Btn finden
        const listeId = buttonId.replace("btn-", "ul-");
        const liste = document.getElementById(listeId);
        
        //prüfen, ob Liste existiert
        if (liste) { 
            const neuesLi = document.createElement("li");
            //damit direkt beschreibbar
            neuesLi.setAttribute("contentEditable", "true");
            // X-Button hinzufügen
            neuesLi.innerHTML = `Aufgabe <button class="btn-delete">X</button>`;
            liste.appendChild(neuesLi);

            //damit Cursor sofort da ist
            neuesLi.focus();
        }

    });
});

 
document.querySelectorAll("ul").forEach(ul => {
    ul.addEventListener("click", (event) => {
        //li löschen
        if (event.target.classList.contains("btn-delete")) {
            //li vom x-btn finden
            const li = event.target.closest("li");
            if (li) li.remove();
        }

        //bereits vorhandene li editierbar
        if (event.target.tagName === "LI") {
            event.target.setAttribute("contentEditable", "true");
            event.target.focus();

            //Test, auf Klick soll Li Klasse hinzugefügt werden
            event.target.classList.toggle("ausgeklappt");
            event.target.addEventListener("blur", () => {
                // Wenn der Fokus verloren geht, setze das li zurück
                event.target.classList.remove("ausgeklappt");
            });
        }

    });
});












