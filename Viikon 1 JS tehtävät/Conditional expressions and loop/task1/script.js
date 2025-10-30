
// Function to convert Celsius to Fahrenheit and Kelvin

function convert() {
    const celsius = parseFloat(document.getElementById("celsiusInput").value);

    // Check if the input is a valid number or not.
    // If not, display an error message:
    if (isNaN(celsius)) {
    document.getElementById("result").textContent = 
    "Please enter a valid number!";
    return;
    }


    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    // If input is valid, perform the conversion and 
    // Display the result with two decimal places:
    document.getElementById("result").textContent =
    `${celsius}°C = ${fahrenheit.toFixed(2)}°F and ${kelvin.toFixed(2)}K.`;

}
