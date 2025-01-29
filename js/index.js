/*
Author: Anjali Sah
anjalisah89@gmail.com
https://github.com/anjalisah89
*/
// Works when type="module" is added to the script tag in the html file
// import Arrow from "./sprites/Arrow.js"
// import Bubble from "./sprites/bubble.js"
// import getColors from "./utils/getColors.js"

let NumberOfBubbles = 4
const Radius = 30

// reset button
const reset = document.querySelector("#reset")
// increment button
const increment = document.querySelector("#increment")
// decrement button
const decrement = document.querySelector("#decrement")
// 800 x 600 canvas
const canvas = document.querySelector("#canvas")
// set the canvas width and height according to what is available in the browser
canvas.width = 800
const height = window.innerHeight - 100
canvas.height = height > 600 ? 600 : height
// 800 x 600 canvas context
const ctx = canvas.getContext("2d")

/**
 * @type {import("./types.js").CanvasProps}
 */
const CanvasProps = {
    innerWidth: canvas.width,
    innerHeight: canvas.height,
    ctx: ctx,
    canvas: canvas,
}

let bubbles = []

/**
 * @description This function initializes the game with n number of bubbles
 * @param {number} n
 */
const initGame = n => {
    // check for classes and functions loaded
    if (!Arrow || !Bubble || !getColors) {
        alert("Classes and functions not loaded")
        return
    }
    // Detach existing bubbles
    bubbles.forEach(bubble => bubble.detach())
    bubbles = []
    // clear the canvas
    ctx.clearRect(0, 0, CanvasProps.innerWidth, CanvasProps.innerHeight)

    // get n number of colors
    const colors = getColors(n)
    // radius of the bubble
    const r = Radius

    colors.forEach((color, i) => {
        const x = r + 20
        const arrowX = CanvasProps.innerWidth - 75
        // equally spaced bubbles across the y-axis
        const spaceForPadding = CanvasProps.innerHeight - r * 2 * n
        const padding = spaceForPadding / (n + 1)
        const y = r + i * (2 * r + padding) + padding

        const bubble = new Bubble(CanvasProps, color, x, y, r)
        bubbles.push(bubble)
        // arrow will go to the right of the canvas, use the x value with some offset
        const arrow = new Arrow(CanvasProps, color, arrowX, y)
        bubble.onClick(() => {
            arrow.animateTo(x + r, y, 1000, () => {
                bubble.changeColor("grey")
            })
        })
    })
}

// button to reinit the game
reset.addEventListener("click", () => initGame(NumberOfBubbles))
// button to increment the number of bubbles
increment.addEventListener("click", () => {
    // check if the number of bubbles is less than the max accomodable bubbles
    if (NumberOfBubbles * Radius * 2 < CanvasProps.innerHeight) {
        NumberOfBubbles++
        initGame(NumberOfBubbles)
    } else 
        alert('How many bubbles do you need in this small space?')
})
// button to decrement the number of bubbles
decrement.addEventListener("click", () => {
    if (NumberOfBubbles > 1) {
        NumberOfBubbles--
        initGame(NumberOfBubbles)
    }
})

// initialize the game
initGame(NumberOfBubbles)
