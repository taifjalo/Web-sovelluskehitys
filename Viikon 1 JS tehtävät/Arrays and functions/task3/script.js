const numbers = [];

function evenNumOperations() {
  numbers.length = 0; // Clear previous Array when the user wants to add new numbers.
  
  while (true) {
    const num = (prompt(`Enter a number (or 'done' to finish):`));
    if (num === null || num.toLowerCase() === "done") {
      break;
    } 
    else if (isNaN(num)) {
      alert("Please enter a valid number!");
      continue;
    } 
    
    numbers.push(num); // pushing ALL the number into the array.
  
    let evenNumbers = []; // array to hold even numbers.
    
    // iterating through the numbers array to find even numbers:
    for (const value of numbers) { 
      if (value % 2 === 0) {
      evenNumbers.push(value);
    };
  } 
  
  // printing results
  if (evenNumbers.length > 0) {
    document.getElementById("result").textContent = 
    `Even numbers: ${evenNumbers.join(", ")}`;
  } else {
    document.getElementById("result").textContent = 
    "Even Numbers: None.";
  }
  }
}