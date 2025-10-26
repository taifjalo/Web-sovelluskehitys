// switch case version
function gradeScore() {
  const score = parseFloat(document.getElementById("score").value); 

  // 1. Check that input are valid numbers
  if (isNaN(score)) {
    alert("Please enter valid numbers for the score.");
    return;
  }

  // 2. Check that score are positive and under 100.
  if (score < 0 || score > 100) {
    alert("Score must be greater than zero and under 100.");
    return;
  }

  // variable to hold the result 
  let result = "";

  // switch case to determine the type of triangle:
  switch (true) {
    case (score > 0 && score <= 39):
      result = "Scores between 0 and 39 receive a grade of 0.";
      break;

    case (score >= 40 && score <= 51):
      result = "Scores between 40 and 51 receive a grade of 1.";
      break;

    case (score >= 52 && score <=63):
      result = "Scores between 52 and 63 receive a grade of 2.";
      break;
    
    case (score >= 64 && score <= 75):
      result = "Scores between 64 and 75 receive a grade of 3.";
      break;

    case (score >= 76 && score <= 87):
      result = "Scores between 76 and 87 receive a grade of 4.";
      break;


    case (score >= 88 && score <= 100):
      result = "Scores between 88 and 100 receive a grade of 5.";
      break;
    
    default:
      result = "Invalid score data.";
  }

  // Display the result
  document.getElementById("result").textContent = result;
}
