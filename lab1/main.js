"use strict";
console.log('Instruction:');
console.log('Possible types: leg, hypotenuse, adjacent angle, opposite angle, angle.');
console.log('Writing example:');
console.log('triangle(7, "leg", 18, "hypotenuse")');
function triangle(firstValue, firstSide, secondValue, secondSide) {
    let a, b, c, alpha, beta;
    const isValid = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!isValid.includes(firstSide) || !isValid.includes(secondSide)) {
        console.log("Invalid values.");
        return "failed";
    }
    if (firstSide === "leg" && secondSide === "leg") {
        a = firstValue;
        b = secondValue;
        c = Math.sqrt(a * a + b * b);
        alpha = (180 / Math.PI) * Math.atan(a / b);
        beta = 90 - alpha;
    }
    else if (firstSide === "leg" && secondSide === "hypotenuse") {
        a = firstValue;
        c = secondValue;
        if (c <= a) {
            console.log("Hypotenuse must be greater than the leg.");
            return "failed";
        }
        b = Math.sqrt(c * c - a * a);
        alpha = (180 / Math.PI) * Math.asin(a / c);
        beta = 90 - alpha;
    }
    else if (firstSide === "hypotenuse" && secondSide === "leg") {
        c = firstValue;
        a = secondValue;
        if (c <= a) {
            console.log("Hypotenuse must be greater than the leg.");
            return "failed";
        }
        b = Math.sqrt(c * c - a * a);
        alpha = (180 / Math.PI) * Math.asin(a / c);
        beta = 90 - alpha;
    }
    else if ((firstSide === "leg" && secondSide === "opposite angle") || (firstSide === "opposite angle" && secondSide === "leg")) {
        a = firstSide === "leg" ? firstValue : secondValue;
        alpha = firstSide === "opposite angle" ? firstValue : secondValue;
        if (alpha >= 90)
            return "The angle must be less than 90 degrees.";
        beta = 90 - alpha;
        c = a / Math.sin(alpha * Math.PI / 180);
        b = Math.sqrt(c ** 2 - a ** 2);
    }
    else if ((firstSide === "leg" && secondSide === "adjacent angle") || (firstSide === "adjacent angle" && secondSide === "leg")) {
        a = firstSide === "leg" ? firstValue : secondValue;
        alpha = firstSide === "adjacent angle" ? firstValue : secondValue;
        if (alpha >= 90)
            return "The angle must be less than 90 degrees.";
        beta = 90 - alpha;
        c = a / Math.cos(alpha * Math.PI / 180);
        b = Math.sqrt(c ** 2 - a ** 2);
    }
    else if ((firstSide === "hypotenuse" && secondSide === "angle") || (firstSide === "angle" && secondSide === "hypotenuse")) {
        c = firstSide === "hypotenuse" ? firstValue : secondValue;
        alpha = firstSide === "angle" ? firstValue : secondValue;
        if (alpha >= 90)
            return "The angle must be less than 90 degrees.";
        beta = 90 - alpha;
        a = c * Math.sin(alpha * Math.PI / 180);
        b = c * Math.cos(alpha * Math.PI / 180);
    }
    else {
        return "failed";
    }
    if (a <= 0 || b <= 0 || c <= 0 || alpha <= 0 || beta <= 0) {
        console.log("Zero or negative input.");
        return "failed";
    }
    if (!(a + b > c && a + c > b && b + c > a)) {
        console.log("The values of the sides do not satisfy the triangle inequalities.");
        return "failed";
    }
    if (c <= a || c <= b) {
        console.log("Hypotenuse cannot be equal to one of the legs.");
        return "failed";
    }
    console.log("a =", a);
    console.log("b =", b);
    console.log("c =", c);
    console.log("alpha =", alpha);
    console.log("beta =", beta);
    return "success";
}
window.triangle = triangle;
//# sourceMappingURL=main.js.map