class CaseTours {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.size = 64;
    this.color = "rgba(255, 255, 255, 0.3)";
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update(mouse) {
    this.draw();

    if (
      mouse.x > this.position.x &&
      mouse.x < this.position.x + this.size &&
      mouse.y > this.position.y &&
      mouse.y < this.position.y + this.size
    ) {
      console.log("colliding");
      this.color = "white";
    } else this.color = "rgba(255, 255, 255, 0.3)";
  }
}

class Tour {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
  }
  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

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

    c.fillStyle = "blue";
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
