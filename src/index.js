const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 768;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const quadrillageToursData2D = []; // ici : ajouter les datas of course mdr et adapter avec DB

for (let i = 0; i < quadrillageToursData.length; i += 20) {
  quadrillageToursData2D.push(quadrillageToursData.slice(i, i + 20));
}

console.log(quadrillageToursData2D);

const casesTours = [];

quadrillageToursData2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 7) {
      //potentiellement le changer ?
      //ici : ajouter les cases de placement de tours
      casesTours.push(
        new CaseTours({
          position: {
            x: x * 64, // changer avc notre taille de tiles
            y: y * 64, // changer avc notre taille de tiles
          },
        })
      );
    }
  });
});
const image = new Image();
image.onload = () => {
  animate();
};
image.src = "assets/map.png";

// erreur incompréhensible const enemy = new Enemy({ position: { x: waypoints[0].x, y: waypoints[0].y } });
const enemies = []; //ici : inclure les ennemis de la db

function spawnEnemies() {
  for (let i = 0; i < 10; i++) {
    const xDecalage = i * 150;
    enemies.push(
      new Enemy({
        position: { x: waypoints[0].x - xDecalage, y: waypoints[0].y }, // le problème de tout à l'heure semble venir de x: waypoints[0].x, y: waypoints[0].y, je sais pas ce qui n'est pas correct dans cette formulation <- corrigé aussi je suis le roi du monde
      })
    );
  }
}
spawnEnemies();
const enemy = new Enemy({ position: { x: waypoints[0].x, y: waypoints[0].y } });
let x = 200;

const tours = [];
let caseActive = undefined;

function animate() {
  requestAnimationFrame(animate);

  c.drawImage(image, 0, 0);
  enemies.forEach((enemy) => {
    enemy.update();

    //    if (enemy.position.x > canvas.height) {
    //      console.log("ouch"); // bizarre ils ouchent avant de sortir de l'écran
    //    }
  });

  casesTours.forEach((caseTours) => {
    caseTours.update(mouse);
  });

  tours.forEach((tour) => {
    tour.draw(); // ne fonctionne pas, ne permet pas de faire apparaitre la tour
  });
}

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", (event) => {
  if (caseActive) {
    tours.push(
      new Tour({
        position: {
          x: caseActive.position.x,
          y: caseActive.position.y,
        }, // ne fonctionne pas, ne permet pas de faire apparaitre la tour
      })
    );
  }
});

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  caseActive = null;
  for (let i = 0; i < casesTours.length; i++) {
    const cases = casesTours[i]; // j utilise le nom cases au pluriel car case  ne peut pas être utilisé
    if (
      // boucle if pour vérifier si la souris est sur une case
      mouse.x > cases.position.x &&
      mouse.x < cases.position.x + cases.size &&
      mouse.y > cases.position.y &&
      mouse.y < cases.position.y + cases.size
    ) {
      caseActive = cases;
      break;
    }
  }
  console.log(caseActive);
});
