const lista = ["ko", "papir", "ollo"];
const ujJatekGomb = document.querySelector("#ujjatek");
const jatekterElem = document.getElementsByClassName("jatekter");

ujJatekGomb.addEventListener("click", megjelenit);

function megjelenit() {
  const htmlKod = `
      <div id="gep">
        <h2>A gép tippje</h2>
        <div class="kep">
          <img src="kepek/placeholder.jpg" alt="gép placeholder" id="gep-img" />
        </div>
      </div>
      <div id="jatekos">
        <h2>A Játékos tippje</h2>
        <div class="gombok">
          <button id="ko">K</button>
          <button id="papir">P</button>
          <button id="ollo">O</button>
        </div>
        <div class="kep">
          <img src="kepek/placeholder.jpg" alt="játékos placeholder" id="jatekos-img" />
        </div>
      </div>
    `;
  jatekterElem[0].innerHTML = "";
  jatekterElem[0].insertAdjacentHTML("beforeend", htmlKod);
  
  // Eseménykezelők rákötése a gombokra
  const jatekGombok = document.querySelectorAll(".gombok button");
  jatekGombok.forEach(gomb => {
    gomb.addEventListener("click", jatekInditasa);
  });
  
  document.getElementById("gyoztes").innerText = "";
}

function jatekInditasa(event) {
  let jatekosValasztas = event.target.id;
  
  let jatekosKepElem = document.querySelector("#jatekos-img");
  let gepKepElem = document.querySelector("#gep-img");

  // Letiltjuk a gombok ismételt kattintását amíg "pörög" a játék
  const jatekGombok = document.querySelectorAll(".gombok button");
  jatekGombok.forEach(gomb => gomb.disabled = true);

  // --- KÉPEK VÁLTOGATÁSA (PÖRGÉS) ---
  // Meghatározzuk, milyen gyakran (pl. minden 100 ezredmásodpercben) váltson képet
  let porgetoTimer = setInterval(() => {
    // Véletlenszerű kép generálása a gépnek és a játékosnak is a pörgetés alatt
    let randomGep = lista[Math.floor(Math.random() * 3)];
    let randomJatekos = lista[Math.floor(Math.random() * 3)];

    gepKepElem.src = `kepek/${randomGep}.PNG`;
    jatekosKepElem.src = `kepek/${randomJatekos}.PNG`;
  }, 100);

  // --- A VÉGLEGES EREDMÉNY MEGJELENÍTÉSE KIS KÉSLELTETÉS UTÁN ---
  // Pl. 1000 ms (1 másodperc) pörgetés után megállítjuk
  setTimeout(() => {
    // Megállítjuk a folyamatos váltogatást
    clearInterval(porgetoTimer);

    // Beállítjuk a JÁTÉKOS tényleges választását
    if (jatekosValasztas == "ko") {
      jatekosKepElem.src = "kepek/ko.PNG";
    } else if (jatekosValasztas == "papir") {
      jatekosKepElem.src = "kepek/papir.PNG";
    } else {
      jatekosKepElem.src = "kepek/ollo.PNG";
    }

    // Generáljuk és beállítjuk a GÉP tényleges választását
    let gTippIndex = Math.floor(Math.random() * 3);
    let gTippStr = lista[gTippIndex];

    if (gTippStr == "ko") {
      gepKepElem.src = "kepek/ko.png";
    } else if (gTippStr == "papir") {
      gepKepElem.src = "kepek/papir.png";
    } else {
      gepKepElem.src = "kepek/ollo.png";
    }

    // Újra engedélyezzük a gombokat
    jatekGombok.forEach(gomb => gomb.disabled = false);

    // Ellenőrzés és győztes kiírása
    ellenorzes(gTippStr, jatekosValasztas);

  }, 1000); // 1000 ms = 1 másodperc pörgetés
}

function ellenorzes(gTipp, jTipp) {
  const gyozelem = document.getElementById("gyoztes");

  let f1 = gTipp == "ko" && jTipp == "papir";
  let f2 = gTipp == "papir" && jTipp == "ollo";
  let f3 = gTipp == "ollo" && jTipp == "ko";

  if (gTipp == jTipp) {
    gyozelem.innerText = "Döntetlen! 🤝";
  } else if (f1 || f2 || f3) {
    gyozelem.innerText = "Gratulálok, a Játékos nyert! 🎉";
  } else {
    gyozelem.innerText = "Sajnos a gép nyert! 🤖";
  }
}