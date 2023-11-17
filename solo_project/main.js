//first run in command line npm run watch_games
//launch using http://localhost:4000/?solo_project


title = "";

description = `
`;

characters = [
`
  gg
gggggg
g gg g 
  gg
 g  g
 g  g
`,

`
y yy y
yyyyyy
  yy   
  yy
 y  y
 y  y
`,

`
 llll
l    l
l    l
l    l
 llll
`,

`
  rr
rrrrrr
r rr r 
  rr
 r  r
 r  r
`,

];

//typedefs

/**
 * @typedef {{
 * pos: Vector
 * }} Player
 */

/**
 * @typedef {{
* pos: Vector,
* parried: boolean,
* speed: number
* }} Ball
*/

/**
 * @typedef {{
* pos: Vector,
* cooldown: number
* }} Enemy
*/


//activate types

/**
 * @type { Player}
 */
let player;

/**
 * @type { Ball[]}
 */
let balls;

/**
 * @type { Enemy}
 */
let enemy;

const G = {
	WIDTH: 80,
	HEIGHT: 50,
	ENEMY_COOLDOWN: 120
};

options = {
	viewSize:{x: G.WIDTH, y: G.HEIGHT}
};

function update() {
	if (!ticks) {
		player = {
			pos: vec(G.WIDTH*.5, G.HEIGHT *.5),
		};

		/*
		ball = {
			pos: vec(G.WIDTH*.5, G.HEIGHT *.5)
		};
		*/
		balls = [];

		enemy = {
			pos: vec(G.WIDTH-3, G.HEIGHT-3),
			cooldown: 5
		};
	}

	//player rendering and input

	player.pos = vec(input.pos.x, input.pos.y);
	player.pos.clamp(3, G.WIDTH *.5, G.HEIGHT-3, G.HEIGHT-3);

	color("black");
	if (input.isPressed == false) {
		char("a", player.pos);
	} else{
		char("b", player.pos);
	
	}

	if (input.isJustPressed == true) {
		play("powerUp");
		
	};

	enemy.cooldown --;

	//make ball
	if(enemy.cooldown <= 0) {
		//create bullet
		balls.push({
			pos: vec(enemy.pos.x-3, enemy.pos.y),
			parried: false,
			speed: rnd(0,1)
		});

		enemy.cooldown = G.ENEMY_COOLDOWN;
	}

	//ball rendering and movement
	//char("c", ball.pos);


	balls.forEach((s) => {
		if (s.parried == true) {
			s.pos.y -=1;
		}

		if (s.parried == false) {
			s.pos.x -= s.speed;
			//fall down at a random point halfway
			if (s.pos.x <= rnd(G.WIDTH*.4, G.WIDTH*.8)) {
				s.pos.y +=s.speed;
			}else {
			//launch up
			s.pos.y -= s.speed;
		}}


		//collision detection and rendering
		//char("c", s.pos);
		const parry =char("c", s.pos).isColliding.char.b;

		if (parry) {
			s.pos.y -=1;
			s.parried = true;

			addScore(10 * s.speed);
		}
		
		//game over
		if(s.pos.y > G.HEIGHT) {
			play("explosion");
			end();
		}
	})

	//enemy rendering
	char("d", enemy.pos);
}
