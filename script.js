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
            const neuesElement = document.createElement("li");
            //damit direkt beschreibbar
            neuesElement.setAttribute("contentEditable", "true");
            liste.appendChild(neuesElement);

            //damit Cursor sofort da ist
            neuesElement.focus();
        }

    });
});




