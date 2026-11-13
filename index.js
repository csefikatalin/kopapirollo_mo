const lista = ["ko", "papir", "ollo"];
const ujJatekGomb = document.querySelector("#ujjatek");
const jatekterElem = document.getElementsByClassName("jatekter");

ujJatekGomb.addEventListener("click", megjelenit);
let gepGyozelemSzam = 0;
let jatekosGyozelemSzam = 0;

function megjelenit() {
  gepGyozelemSzam = 0;
  jatekosGyozelemSzam = 0;
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
   
          <button id="ko">✊</button>
          <button id="papir">✋</button>
          <button id="ollo">✌️</button>
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

  jatekGombok[0].addEventListener("click", jatekInditasa);
  jatekGombok[1].addEventListener("click", jatekInditasa);
  jatekGombok[2].addEventListener("click", jatekInditasa);

  document.getElementById("gyoztes").innerText = "";
}

function jatekInditasa(event) {
  let jatekosValasztasa = event.target.id;

  let jatekosKepElem = document.querySelector("#jatekos-img");
  let gepKepElem = document.querySelector("#gep-img");

  // --- KÉPEK VÁLTOGATÁSA (PÖRGÉS) ---
  // Meghatározzuk, milyen gyakran (pl. minden 100 ezredmásodpercben) váltson képet
  let i = 0;
  let porgetoTimer = setInterval(function () {
    // Véletlenszerű kép generálása a gépnek és a játékosnak is a pörgetés alatt
    let randomGep = lista[Math.floor(Math.random() * 3)];
    let randomJatekos = lista[Math.floor(Math.random() * 3)];
    gepKepElem.src = `kepek/${randomGep}.png`;
    jatekosKepElem.src = `kepek/${randomJatekos}.png`;
  }, 100);

  // --- A VÉGLEGES EREDMÉNY MEGJELENÍTÉSE KIS KÉSLELTETÉS UTÁN ---
  // Pl. 1000 ms (1 másodperc) pörgetés után megállítjuk
  setTimeout(function () {
    // Megállítjuk a folyamatos váltogatást
    clearInterval(porgetoTimer);
    jValasztas(jatekosValasztasa);
    let gTippStr = gValasztas();
    // Ellenőrzés és győztes kiírása
    ellenorzes(gTippStr, jatekosValasztasa);
  }, 1000); // 1000 ms = 1 másodperc pörgetés
}

function jValasztas(jatekosValasztas) {
  let jatekosKepElem = document.querySelector("#jatekos-img");

  // Beállítjuk a JÁTÉKOS tényleges választását
  if (jatekosValasztas == "ko") {
    jatekosKepElem.src = "kepek/ko.png";
  } else if (jatekosValasztas == "papir") {
    jatekosKepElem.src = "kepek/papir.png";
  } else {
    jatekosKepElem.src = "kepek/ollo.png";
  }
}
function gValasztas() {
  let gepKepElem = document.querySelector("#gep-img");
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
  return gTippStr;
}

function ellenorzes(gTipp, jTipp) {
  const gyozelem = document.getElementById("gyoztes");

  let f1 = gTipp == "ko" && jTipp == "papir";
  let f2 = gTipp == "papir" && jTipp == "ollo";
  let f3 = gTipp == "ollo" && jTipp == "ko";

  if (gTipp == jTipp) {
    gyozelem.innerText = "Döntetlen! 🤝";
  } else if (f1 || f2 || f3) {
     jatekosGyozelemSzam++;
    gyozelem.innerText = "Gratulálok, a Játékos nyert! 🎉 ";

   
  } else {
    gepGyozelemSzam++;
    gyozelem.innerText = "Sajnos a gép nyert! 🤖";
  }
  gyozelem.innerHTML+=`<p>Gép:${gepGyozelemSzam}  | Játékos: ${jatekosGyozelemSzam} </p>`
}
