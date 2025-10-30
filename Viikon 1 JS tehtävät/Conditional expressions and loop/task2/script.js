function distanceFromOrigin() {
  const x1 = parseFloat(document.getElementById("x1Input").value); 
  const x2 = parseFloat(document.getElementById("x2Input").value);
  const y1 = parseFloat(document.getElementById("y1Input").value); 
  const y2 = parseFloat(document.getElementById("y2Input").value);

  // Check that all inputs are valid numbers
  if (isNaN(x1) || isNaN(x2) || isNaN(y1) || isNaN(y2)) {
    alert("Please enter valid numbers for all coordinates.");
    return;
  }

  // Euclidean distance formula
  const distance = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);

  // Display the result
  document.getElementById("result").textContent =
    `The distance between (${x1}, ${y1}) and (${x2}, ${y2}) is ${distance.toFixed(2)}.`;
}
