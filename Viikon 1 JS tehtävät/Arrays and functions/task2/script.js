const numbers = [];

function arrayOperations() {
  numbers.length = 0; // Clear previous Array when the user wants to add new numbers.
  
  for (let i = 1; i <= 5; i++) {
    const num = parseFloat(prompt(`Enter number ${i}:`));

    if (isNaN(num)) {
      alert("Please enter valid numbers only!");
      return;
    }
    
    numbers.push(num);
  }

  document.getElementById("result").textContent =
    `Numbers entered: ${numbers.join(", ")}`;
}


function CheckNumber() {
  const num = parseFloat(document.getElementById("check").value);

  if (isNaN(num)) {
    alert("Please enter a valid number to check.");
    return;
  } 

  if (numbers.includes(num)) {
    document.getElementById("result").textContent =
      `Number ${num} is found in the array: [${numbers.join(", ")}]`;
  } else {
    document.getElementById("result").textContent =
      `Number ${num} does NOT exists in the array: [${numbers.join(", ")}]`;
  }
}

function removeLastNumber() {
  const removedNumber = numbers.pop();

  document.getElementById("result").textContent =
    `Removed number: ${removedNumber}. Updated array: [${numbers.join(", ")}]`;
}

function sortNumbers() {
  const sortedNumbers = numbers.sort((a, b) => a - b);

  document.getElementById("result").textContent =
    `Sorted array: [${sortedNumbers.join(", ")}]`;
}
