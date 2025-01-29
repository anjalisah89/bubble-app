class Bubble {
    /**
     *
     * @param {@import("../types.js").CanvasProps} CanvasProps
     * @param {string} color
     * @param {number} x
     * @param {number} y
     * @param {number} r
     */
    constructor(CanvasProps, color, x, y, r) {
        this.color = color
        this.CanvasProps = CanvasProps
        this.ctx = CanvasProps.ctx
        this.radius = r
        this.x = x
        this.y = y
        this.clicked = false
        // if on click event is not set, do nothing
        this.callback = () => {}

        // Bind event listener method
        this.handleClick = this.handleClick.bind(this)

        // Add event listener
        this.CanvasProps.canvas.addEventListener("click", this.handleClick)

        this.draw()
    }

    /**
     * @description Handle canvas click and check if it's within the bubble
     * @param {MouseEvent} e
     */
    handleClick(e) {
        const rect = this.CanvasProps.canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        if (this.isInside(x, y) && !this.clicked) {
            this.callback()
            this.clicked = true
        }
    }

    // check if the click is inside the bubble
    isInside(x, y) {
        return Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2) < this.radius
    }

    // when the canvas is clicked in the area of the bubble, the callback shoud be called
    onClick(callback) {
        this.callback = callback
    }

    changeColor(color) {
        this.color = color
        this.draw()
    }

    // draw the bubble on the canvas
    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
        this.ctx.closePath()
    }

    // Remove the event listener
    detach() {
        this.CanvasProps.canvas.removeEventListener("click", this.handleClick)
    }
}

// Workaround for file:/// protocol
window.Bubble = Bubble

// when type="module" is used in the script tag
// export default Bubble
