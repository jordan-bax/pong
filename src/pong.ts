
// Create a div element
const colorBlock = document.createElement('div');
const backgroundColor = document.createElement('div');

backgroundColor.style.width = '100%';
backgroundColor.style.height = '100%';
backgroundColor.style.backgroundColor = 'black'; // Set the background color to black
backgroundColor.style.position = 'absolute'; // Use absolute positioning
backgroundColor.style.top = '0px'; // Distance from the top of the page
backgroundColor.style.left = '0px'; // Distance from the left of the page

// Style the div to display a block of color
colorBlock.style.width = '20px';
colorBlock.style.height = '200px';
colorBlock.style.backgroundColor = 'blue'; // Set the color to blue

// Set the position and placement of the div
colorBlock.style.position = 'absolute'; // Use absolute positioning
colorBlock.style.top = '0px'; // Distance from the top of the page
colorBlock.style.left = '0px'; // Distance from the left of the page

// Append the div to the body of the document
backgroundColor?.appendChild(test_complexShape(500, 0)); // Call the function to create the complex shape
backgroundColor?.appendChild(colorBlock);
// Append the background color to the body of the document
document.body.appendChild(backgroundColor);

// Add an event listener to capture key input
document.addEventListener('keydown', (event) => {
    const step = 10; // Number of pixels to move
    const top = parseInt(colorBlock.style.top, 10);
    const left = parseInt(colorBlock.style.left, 10);

    switch (event.key) {
        case 'ArrowUp':
            colorBlock.style.top = `${top - step}px`;
            break;
        case 'ArrowDown':
            colorBlock.style.top = `${top + step}px`;
            break;
        case 'ArrowLeft':
            colorBlock.style.left = `${left - step}px`;
            break;
        case 'ArrowRight':
            colorBlock.style.left = `${left + step}px`;
            break;
    }
});

function test_complexShape(position_top:number,position_left:number): HTMLDivElement {
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

