
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload () /* Cette fonction permettra de charger des ressources dont nous aurons besoin pour le fonctionnement du jeu */
{
    this.load.image('logo', 'assets/logo.png');
}

function create ()
{
    var logo = this.add.image(800/2, 600/2, 'logo');


}
