class Arrow {
    /**
     *
     * @param {@import("../types.js").CanvasProps} CanvasProps
     * @param {string} color
     * @param {number} x
     * @param {number} y
     */
    constructor(CanvasProps, color, x, y) {
        this.color = color
        this.CanvasProps = CanvasProps
        this.ctx = CanvasProps.ctx
        this.x = x
        this.y = y

        // Track the previous position for clearing
        this.prevX = x
        this.prevY = y

        // Default callback
        this.callback = () => {}

        this.draw()
    }

    draw() {
        const ctx = this.ctx
        const tailLength = 40 // Length of the arrow's tail
        const arrowWidth = 15 // Width of the arrowhead
        const tailWidth = 5 // Width of the tail
        const padding = 1 // Additional padding for clearing

        // Clear the previous bounding box
        const prevClearX = this.prevX - padding
        const prevClearY = this.prevY - Math.max(arrowWidth, tailWidth) / 2 - padding
        const prevClearWidth = arrowWidth + tailLength + padding * 2
        const prevClearHeight = Math.max(arrowWidth, tailWidth) + padding * 2
        ctx.clearRect(prevClearX, prevClearY, prevClearWidth, prevClearHeight)

        // Save the current position as the new previous position
        this.prevX = this.x
        this.prevY = this.y

        // Draw the arrow
        ctx.beginPath()
        ctx.moveTo(this.x, this.y) // Tip of the arrow
        ctx.lineTo(this.x + arrowWidth, this.y - arrowWidth / 2) // Top edge of arrowhead
        ctx.lineTo(this.x + arrowWidth, this.y - tailWidth / 2) // Top of tail
        ctx.lineTo(this.x + arrowWidth + tailLength, this.y - tailWidth / 2) // Tail top
        ctx.lineTo(this.x + arrowWidth + tailLength, this.y + tailWidth / 2) // Tail bottom
        ctx.lineTo(this.x + arrowWidth, this.y + tailWidth / 2) // Bottom of tail
        ctx.lineTo(this.x + arrowWidth, this.y + arrowWidth / 2) // Bottom edge of arrowhead
        ctx.closePath()

        // Fill and stroke
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.strokeStyle = this.color
        ctx.stroke()
    }

    /**
     * Animates the arrow to move towards a target position and fires a callback upon completion.
     * @param {number} targetX - The target x-coordinate.
     * @param {number} targetY - The target y-coordinate.
     * @param {number} time - The duration of the animation in milliseconds.
     * @param {function} callback - The function to call once the animation completes.
     */
    animateTo(targetX, targetY, time, callback) {
        if (typeof time !== "number" || time < 0) throw new Error("Invalid time value")
        const frames = Math.ceil((time / 1000) * 60) // 60 frames per second
        const deltaX = (targetX - this.x) / frames
        const deltaY = (targetY - this.y) / frames

        let frame = 0

        const animate = () => {
            if (frame < frames) {
                this.x += deltaX
                this.y += deltaY
                this.draw()
                frame++
                requestAnimationFrame(animate)
            } else {
                // Ensure the arrow ends at the exact target position
                this.x = targetX
                this.y = targetY
                this.draw()

                // Trigger the callback
                if (typeof callback === "function") callback()
            }
        }

        animate()
    }
}

// Workaround for file:/// protocol
window.Arrow = Arrow

// when type="module" is used in the script tag
// export default Arrow
