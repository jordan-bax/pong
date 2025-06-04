interface gameWallsInterface {
    width: number;
    height: number;
    wallThickness: number;
    wallTickness2x: number;
    egdeThickness: number;
}
const gameWall: gameWallsInterface = {
    width: 200,
    height: 200,
    wallThickness: 10,
    wallTickness2x: 20,
    egdeThickness: 15
};
interface pcInterface {
    x: number;
    y: number;
    speed: number;
    height: number;
    width: number;
    score: number;
}
var player1: pcInterface = {
    x: 2,
    y: 1,
    speed: 10,
    height: 25,
    width: 4,
    score: 0
};
var player2: pcInterface = {
    x: 198,
    y: 50,
    speed: 10,
    height: 25,
    width: 4,
    score: 0
};
interface ballInterface {
    x: number;
    y: number;
    dx: number;
    dy: number;
    speed: number;
    height: number;
    width: number;
}
var ballvar: ballInterface = {
    x: 98,
    y: 98,
    dx: 2,
    dy: 5,
    speed: 2,
    height: 4,
    width: 4
};
var pauze: boolean = true; // Variable to control the pause state


var sizeAduster: number = 1;
player2.x -= player2.width; // Adjust player2's x position to account for its width
startGame();
async function startGame() {
    let lastFrame: HTMLDivElement | null = null;
    var background = makeBackground();
    while (true) {
        const HoleScreen = background.cloneNode(true) as HTMLDivElement;
        HoleScreen.appendChild(buildframe());
        if (lastFrame) {
            document.body.removeChild(lastFrame);
        }
        document.body.appendChild(HoleScreen);
        lastFrame = HoleScreen;
        // Wait for a second
        await new Promise(resolve => setTimeout(resolve, 500));
        ballmove();
    }
}
function WaitForASecond() {
    // Wait for a second
    return new Promise(resolve => setTimeout(resolve, 1000));
}
function ballmove(): void {
    // Move the ball
    var oldBall : ballInterface = ballvar;
    ballvar.x += ballvar.dx * ballvar.speed;
    ballvar.y += ballvar.dy * ballvar.speed;
    const WallHeight = gameWall.height - ballvar.height;
    // Check for collision with the walls
    if (ballvar.y <= 0 || ballvar.y >= gameWall.height - ballvar.height) {
        ballvar.dy *= -1; // Reverse the y direction
        if (ballvar.y <= 0) {
            ballvar.y *= -1; // Prevent the ball from going above the top wall
        } else {
            ballvar.y -= (ballvar.y - WallHeight)*2; // Prevent the ball from going below the bottom wall
        }
    }
    simplePadleCollisionPlayer1(oldBall, player1);
    simplePadleCollisionPlayer2(oldBall, player2);
    if (ballvar.x <= 0 || ballvar.x >= gameWall.width - ballvar.width) {
        ballvar.dx *= -1; // Reverse the x direction
        // Check which player scored
        if (ballvar.x <= 0) {
            player2.score++; // Player 2 scores
        } else {
            player1.score++; // Player 1 scores
        }
        // Reset the ball position
        ballvar.x = gameWall.width / 2 - ballvar.width / 2; // Center the ball horizontally
        ballvar.y = gameWall.height / 2 - ballvar.height / 2; // Center the ball vertically
    }
    // Check for collision with the paddles

    // if (ballvar.x <= player1.x + player1.width && ballvar.y >= player1.y && ballvar.y <= player1.y + player1.height) {
    //     ballvar.dx *= -1; // Reverse the x direction
    //     ballvar.x = player1.x + player1.width; // Position the ball to the right of the paddle
    // } else if (ballvar.x >= player2.x - ballvar.width && ballvar.y >= player2.y && ballvar.y <= player2.y + player2.height) {
    //     ballvar.dx *= -1; // Reverse the x direction
    //     ballvar.x = player2.x - ballvar.width; // Position the ball to the left of the paddle
    // }
}
function simplePadleCollisionPlayer1(ball: ballInterface, player: pcInterface) {
    // Check if the ball is colliding with the paddle
    if (ballvar.x > player.x + player.width)
        return false; // Ball is to the right of the paddle
    if (ball.y + ball.height < player.y && ballvar.y + ballvar.height < player.y)
        return false; // Ball is above the paddle
    if (ball.y > player.y + player.height && ballvar.y > player.y + player.height)
        return false; // Ball is below the paddle
    // If none of the conditions are met, the ball is colliding with the paddle
    // Reverse the x direction of the ball
    ball.dx *= -1; // Reverse the x direction
    ballvar.x += ((player.x + player.width) - ballvar.x )*2;
    // Position the ball to the right of the paddle
    return true; // Ball is colliding with the paddle
}
function simplePadleCollisionPlayer2(ball: ballInterface, player: pcInterface) {
    // Check if the ball is colliding with the paddle
    if (ballvar.x + ballvar.width < player.x)
        return false; // Ball is to the right of the paddle
    if (ball.y + ball.height < player.y && ballvar.y + ballvar.height < player.y)
        return false; // Ball is above the paddle
    if (ball.y > player.y + player.height && ballvar.y > player.y + player.height)
        return false; // Ball is below the paddle
    // If none of the conditions are met, the ball is colliding with the paddle
    // Reverse the x direction of the ball
    ball.dx *= -1; // Reverse the x direction
    ballvar.x -= ((ballvar.x + ballvar.width) - player.x)*2;
    // Position the ball to the right of the paddle
    return true; // Ball is colliding with the paddle
}
function buildframe():HTMLDivElement{
    sizeAduster = getSize();
    var frame = document.createElement('div');
    frame = GetGameWalls(sizeAduster);
    addMiddleStripes(frame);
    addScoreBocks1(frame);
    addScoreBocks2(frame);
    addpc1(frame);
    addpc2(frame);
    addBall(frame);
    
    return frame;
}
function addpc1(frame: HTMLDivElement): HTMLDivElement {
    playerMoveCheck(player1);
    const pc1 = document.createElement('div');
    pc1.style.position = 'absolute';
    pc1.style.width = `${player1.width * sizeAduster}px`;
    pc1.style.height = `${player1.height * sizeAduster}px`;
    pc1.style.top = `${player1.y * sizeAduster}px`; // Distance from the top of the page
    pc1.style.left = `${player1.x * sizeAduster}px`; // Distance from the left of the page
    pc1.style.backgroundColor = 'white'; // Set the background color to white
    // pc1.style.transform = 'translateY(-50%)'; // Center vertically
    frame.appendChild(pc1);
    return frame;
}
function addpc2(frame: HTMLDivElement): HTMLDivElement {
    playerMoveCheck(player2);
    const pc2 = document.createElement('div');
    pc2.style.position = 'absolute';
    pc2.style.width = `${player2.width * sizeAduster}px`;
    pc2.style.height = `${player2.height * sizeAduster}px`;
    pc2.style.top = `${player2.y * sizeAduster}px`; // Distance from the top of the page
    pc2.style.left = `${(player2.x) * sizeAduster}px`; // Distance from the right of the page
    pc2.style.backgroundColor = 'white'; // Set the background color to white
    // pc2.style.transform = 'translateY(-50%)'; // Center vertically
    frame.appendChild(pc2);
    return frame;
}
function addBall(frame: HTMLDivElement): HTMLDivElement {
    const ball = document.createElement('div');
    ball.style.position = 'absolute';
    ball.style.width = `${ballvar.width * sizeAduster}px`;
    ball.style.height = `${ballvar.height * sizeAduster}px`;
    ball.style.backgroundColor = 'white'; // Set the background color to white
    ball.style.borderRadius = '50%'; // Make it a circle
    ball.style.left = `${ballvar.x * sizeAduster}px`; // Distance from the left of the page
    ball.style.top = `${ballvar.y * sizeAduster}px`; // Distance from the top of the page
    // ball.style.transform = 'translate(-50%, -50%)'; // Center the ball
    frame.appendChild(ball);
    return frame;
}
function addScoreBocks1(frame: HTMLDivElement): HTMLDivElement {
    const scoreBocks1 = document.createElement('div');
    scoreBocks1.style.position = 'absolute';
    scoreBocks1.style.width = `15%`;
    scoreBocks1.style.height = `15%`;
    scoreBocks1.style.backgroundColor = 'transpirant'; // Set the background color to white
    scoreBocks1.style.left = '17.5%'; // Distance from the left of the page
    scoreBocks1.style.top = '1%'; // Distance from the top of the page
    // scoreBocks1.style.transform = 'translate(-50%, -50%)'; // Center the ball
    scoreBocks1.style.fontSize = `${20 * sizeAduster}px`; // Set the font size
    scoreBocks1.style.color = 'blue'; // Set the font color
    scoreBocks1.style.textAlign = 'center'; // Center the text
    scoreBocks1.style.lineHeight = `100%`; // Center the text vertically
    scoreBocks1.style.alignItems = 'center'; // Center vertically
    scoreBocks1.style.display = 'flex'; // Use flexbox for centering
    scoreBocks1.style.justifyContent = 'center'; // Center horizontally

    scoreBocks1.innerHTML = `${player1.score}`; // Set the initial score
    frame.appendChild(scoreBocks1);
    return frame;
}
function addScoreBocks2(frame: HTMLDivElement): HTMLDivElement {
    const scoreBocks2 = document.createElement('div');
    scoreBocks2.style.position = 'absolute';
    scoreBocks2.style.width = `15%`;
    scoreBocks2.style.height = `15%`;
    scoreBocks2.style.backgroundColor = 'transpirant'; // Set the background color to white
    scoreBocks2.style.left = '67.5%'; // Distance from the right of the page
    scoreBocks2.style.top = '1%'; // Distance from the top of the page
    scoreBocks2.style.fontSize = `${20 * sizeAduster}px`; // Set the font size
    scoreBocks2.style.color = 'blue'; // Set the font color
    scoreBocks2.style.textAlign = 'center'; // Center the text horizontally
    scoreBocks2.style.lineHeight = `100%`; // Match the height of the block
    scoreBocks2.style.display = 'flex'; // Use flexbox for centering
    scoreBocks2.style.alignItems = 'center'; // Center vertically
    scoreBocks2.style.justifyContent = 'center'; // Center horizontally
    scoreBocks2.innerHTML = `${player2.score}`; // Set the initial score
    frame.appendChild(scoreBocks2);
    return frame;
}
function GetGameWalls(sizeAduster :number): HTMLDivElement {
    const gameWalls = document.createElement('div');
    gameWalls.style.position = 'relative'; // Use relative positioning
    gameWalls.style.width = `${gameWall.width * sizeAduster}px`;
    gameWalls.style.height = `${gameWall.height * sizeAduster}px`;
    gameWalls.style.backgroundColor = 'transparent'; // Set the background color to transparent
    gameWalls.style.border = `${gameWall.wallThickness}px solid white`; // Set the border color
    gameWalls.style.left = `${(window.innerWidth - (gameWall.width * sizeAduster + gameWall.wallTickness2x))/2}px`; // Distance from the left of the page
    gameWalls.style.top = '15px'; // Distance from the top of the page
    
    return gameWalls;
}
function addMiddleStripes(gameWalls: HTMLDivElement): HTMLElement {
    const stripeWidth = 1.5; // Width of each stripe
    const stripeHeight = 4; // Height of each stripe
    const stripeSpacing = 1; // Spacing between stripes

    for (let i = 0; i < 100; i += stripeHeight + stripeSpacing) {
        const stripe = document.createElement('div');
        stripe.style.width = `${stripeWidth}%`;
        stripe.style.height = `${stripeHeight}%`;
        stripe.style.backgroundColor = 'white';
        stripe.style.opacity = '0.5'; // Set opacity to 50%
        stripe.style.position = 'absolute';
        stripe.style.left = '50%';
        stripe.style.transform = 'translateX(-50%)'; // Center the stripe horizontally
        stripe.style.top = `${i + stripeSpacing}%`; // Position each stripe

        gameWalls.appendChild(stripe);
    }
    return gameWalls;
}

// Attention: This function is not scaled to other shapes than a square
    function getSize(): number {
        const width = window.innerWidth;
        const height = window.innerHeight;
        var smaller = Math.min(width, height);
        smaller -= gameWall.wallTickness2x; // Adjust for wall thickness
        smaller -= gameWall.egdeThickness * 2; // Adjust for edge thickness
        var sizeAduster = smaller / gameWall.width; // Calculate the size aduster based on the smaller dimension
        if (sizeAduster < 1) {
            sizeAduster = 1;
        }
        return sizeAduster;
    }
    function makeBackground(): HTMLDivElement{
    // Create a div element to cover the entire screen
        const backgroundColor = document.createElement('div');
        backgroundColor.style.width = '100%';
        backgroundColor.style.height = '100%';
        backgroundColor.style.backgroundColor = 'black'; // Set the background color to black
        backgroundColor.style.position = 'absolute'; // Use absolute positioning
        backgroundColor.style.top = '0px'; // Distance from the top of the page
        backgroundColor.style.left = '0px'; // Distance from the left of the page
        return backgroundColor;
    }


    // document.getElementById("demo1").innerHTML = backgroundColor.style.height; // Set the background color to black

    // Add an event listener to capture key input
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'p':
                pauze = !pauze; // Toggle the pause state
                break;
            case 'w':
                player1.y = player1.y - player1.speed;
                break;
            case 's':
                player1.y = player1.y + player1.speed;
                break;
            case 'ArrowUp':
                player2.y = player2.y - player2.speed;
                break;
            case 'ArrowDown':
                player2.y = player2.y + player2.speed;
                break;
        }
    });

    function playerMoveCheck(player: pcInterface): void {
        // Get the current position of the player
        if (player.y < 0) {
            player.y = 0; // Prevent moving above the top wall
        } else if (player.y + player.height > gameWall.height) {
            player.y = gameWall.height - player.height; // Prevent moving below the bottom wall
        }
    }

    function test_complexShape(position_top: number, position_left: number): HTMLDivElement {
        // Create a container for the complex shape
        const complexShape = document.createElement('div');
        complexShape.style.position = 'absolute';
        complexShape.style.top = `${position_top}px`;
        complexShape.style.left = `${position_left}px`;
        complexShape.style.width = '0';
        complexShape.style.height = '0';

        // Create the first part of the shape (e.g., a square)
        const square = document.createElement('div');
        square.style.width = '50px';
        square.style.height = '50px';
        square.style.backgroundColor = 'red';
        square.style.position = 'absolute';
        square.style.top = '0';
        square.style.left = '0';

        // Create the second part of the shape (e.g., a circle)
        const circle = document.createElement('div');
        circle.style.width = '50px';
        circle.style.height = '50px';
        circle.style.backgroundColor = 'blue';
        circle.style.borderRadius = '50%';
        circle.style.position = 'absolute';
        circle.style.top = '50px';
        circle.style.left = '25px';
        const half_circle = document.createElement('div');
        half_circle.style.width = '50px';
        half_circle.style.height = '25px';
        half_circle.style.backgroundColor = 'magenta';
        half_circle.style.borderRadius = '50px 50px 0 0'; // Create a half circle
        half_circle.style.position = 'absolute';
        half_circle.style.top = '50px';
        half_circle.style.left = '150px';
        const hollow_circle = document.createElement('div');
        hollow_circle.style.width = '40px';
        hollow_circle.style.height = '40px';
        hollow_circle.style.backgroundColor = 'transparent';
        hollow_circle.style.border = '10px solid blue'; // Set the border color
        hollow_circle.style.borderRadius = '50%';
        hollow_circle.style.position = 'absolute';
        hollow_circle.style.top = '50px';
        hollow_circle.style.left = '75px';

        // Create the third part of the shape (e.g., a triangle)
        const triangle = document.createElement('div');
        triangle.style.width = '0';
        triangle.style.height = '0';
        triangle.style.borderLeft = '25px solid transparent';
        triangle.style.borderRight = '25px solid transparent';
        triangle.style.borderBottom = '50px solid green';
        triangle.style.position = 'absolute';
        triangle.style.top = '100px';
        triangle.style.left = '12.5px';

        // Append all parts to the container
        complexShape.appendChild(square);
        complexShape.appendChild(circle);
        complexShape.appendChild(hollow_circle);
        complexShape.appendChild(half_circle);
        complexShape.appendChild(triangle);


        return complexShape;
        document.body.appendChild(half_circle);
        // Append the complex shape to the body
        document.body.appendChild(complexShape);
    }

