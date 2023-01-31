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

class CaseTours {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.size = 64; // à changer avc notre taille de tiles
    this.color = "green";
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}

const casesTours = [];

quadrillageToursData2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 14) {
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

class Enemy {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.width = 100;
    this.height = 100;
    this.waypointIndex = 0;
    this.center = {
      // Permet de créer un point central dans les ennemis pour les déplacer à partir de leur centre.
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.health = 100;
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //gros bordel beginpath et tt

    //Barre de vie
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y - 15, this.width, 10);

    c.fillStyle = "green";
    c.fillRect(this.position.x, this.position.y - 15, this.width, 10);
  }

  update() {
    this.draw();

    const waypoint = waypoints[this.waypointIndex]; // On récupère le waypoint actuel de chemin.js
    const yDistance = waypoint.y - this.center.y;
    const xDistance = waypoint.x - this.center.x;
    const angle = Math.atan2(yDistance, xDistance);

    const speed = 10; // vitesse
    this.velocity.x = Math.cos(angle) * speed;
    this.velocity.y = Math.sin(angle) * speed;

    this.position.x += this.velocity.x; // Renvoie à la rapidité et le Math.cos(angle) permet de déplacer l'ennemi sur l'axe des x ICI : on peut ajouter un multiplicateur pour augmenter la vitesse des ennemis
    this.position.y += this.velocity.y; // Renvoie à la rapidité et le  Math.sin(angle) permet de déplacer l'ennemi sur l'axe des y ICI : on peut ajouter un multiplicateur pour augmenter la vitesse des ennemis
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };

    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) <
        Math.abs(this.velocity.x) &&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) <
        Math.abs(this.velocity.y) && // Ici : je ne peux pas mettre this.center.x et this.center.y à la place de this.position.x et this.position.y <- j'ai fix c bon
      this.waypointIndex < waypoints.length - 1
    ) {
      //Boucle if permettant de vérifier si l'ennemi est arrivé à la position du waypoint, et de passer au waypoint suivant
      this.waypointIndex++;
    }
  }
}

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
function animate() {
  requestAnimationFrame(animate);

  c.drawImage(image, 0, 0);
  enemies.forEach((enemy) => {
    enemy.update();

    if (enemy.position.x > canvas.height) {
      console.log("ouch");
    }
  });

  casesTours.forEach((caseTours) => {
    caseTours.draw();
  });
}
