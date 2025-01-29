/**
 * @description This function should return an array of n colors in hsl format
 * @param {number} n
 * @returns {string[]}
 * @throws {Error} If n is not a number
 */
const getColors = n => {
    if (typeof n !== "number") throw new Error("n should be a number")
    if (n < 1) throw new Error("n should be greater than 0")

    n = Math.floor(n)

    const colors = []

    // n number of colors on the color wheel each with same saturation and lightness
    for (let i = 0; i < n; i++) {
        const hue = i * (360 / n)
        colors.push(`hsl(${hue}, 100%, 50%)`)
    }

    return colors
}

// Workaround for file:/// protocol
window.getColors = getColors

// when type="module" is used in the script tag
// export default getColors
