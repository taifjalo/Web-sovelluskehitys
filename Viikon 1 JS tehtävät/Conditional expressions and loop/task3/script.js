/* if/else version

function lengthsOfTringles() {
  const firstSide = parseFloat(document.getElementById("firstSide").value); 
  const secondSide = parseFloat(document.getElementById("secondSide").value);
  const thirdSide = parseFloat(document.getElementById("therdSide").value); 

  // 1. Check that all inputs are valid numbers
  if (isNaN(firstSide) || isNaN(secondSide) || isNaN(thirdSide)) {
    alert("Please enter valid numbers for all three sides of the triangle.");
    return;
  }

  // 2. Check that all sides are positive
  else if (firstSide > 0 && secondSide > 0 && thirdSide > 0) {

    // variable to hold the result
    let result = "";

    // 3. Determine the type of triangle
    if (firstSide === secondSide && secondSide === thirdSide) {
      result = "The triangle is equilateral.";
    } 
    else if (firstSide === secondSide || firstSide === thirdSide || secondSide === thirdSide) {
      result = "The triangle is isosceles.";
    } 
    else {
      result = "The triangle is scalene.";
    }

    // 4. Display the result
    document.getElementById("result").textContent = result;
  } 
  else {
    alert("Side lengths must be greater than zero.");
  }
}
*/


// switch case version
function lengthsOfTringles() {
  const firstSide = parseFloat(document.getElementById("firstSide").value); 
  const secondSide = parseFloat(document.getElementById("secondSide").value);
  const thirdSide = parseFloat(document.getElementById("therdSide").value); 

  // 1. Check that all inputs are valid numbers
  if (isNaN(firstSide) || isNaN(secondSide) || isNaN(thirdSide)) {
    alert("Please enter valid numbers for all three sides of the triangle.");
    return;
  }

  // 2. Check that all sides are positive
  if (!(firstSide > 0 && secondSide > 0 && thirdSide > 0)) {
    alert("Side lengths must be greater than zero.");
    return;
  }

  // variable to hold the result 
  let result = "";

  // switch case to determine the type of triangle:
  switch (true) {
    case (firstSide === secondSide && secondSide === thirdSide):
      result = "The triangle is equilateral.";
      break;

    case (
      (firstSide === secondSide || firstSide === thirdSide || secondSide === thirdSide)
      && !(firstSide === secondSide && secondSide === thirdSide)
    ):
      result = "The triangle is isosceles.";
      break;

    case (firstSide !== secondSide && secondSide !== thirdSide && firstSide !== thirdSide):
      result = "The triangle is scalene.";
      break;

    default:
      result = "Invalid triangle data.";
  }

  // Display the result
  document.getElementById("result").textContent = result;
}
