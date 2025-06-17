const number = document.getElementById('number');
const category = document.getElementById('category');
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convert = document.getElementById("convert");
const result = document.getElementById("result");
const swap = document.getElementById("swap");

const units = {
  Length: ['Meters', 'Kilometers', 'Feet', 'Miles'],
  Weight: ['Grams', 'Kilograms', 'Pounds', 'Ounces'],
  Temperature: ['Celsius', 'Fahrenheit', 'Kelvin']
};

function dropdown() {    // This function runs when the category is changed

  fromUnit.length = 1;
  toUnit.length = 1;
  const selectedCategory = category.value;           // Get the currently selected category
  const unitList = units[selectedCategory];          // Get units from the selected category


  // Add all units to both dropdowns (from and to)
unitList.forEach(unit => {
    const optionFrom = document.createElement('option');   //create an option from
    optionFrom.value = unit;
    optionFrom.textContent = unit;
    fromUnit.appendChild(optionFrom);  // Add to "from" dropdown

    const optionTo = document.createElement('option');  //create an option to
    optionTo.value = unit;
    optionTo.textContent = unit;   
    toUnit.appendChild(optionTo);         // Add to "to" dropdown

    });
}

// When user selects a category, update unit dropdowns
category.addEventListener('change', dropdown);

// When "Convert" button is clicked, run this
  function convertUnits() {
    const value = parseFloat(number.value);    // Get and convert the input number
    const from = fromUnit.value;                // Get selected "from" unit
    const to = toUnit.value;                   // Get selected "to" unit
    const selectedCategory = category.value;    // Get selected category

    if (isNaN(value)) {  // check if input is valid
    result.innerText = "Enter a valid number.";
    return;
    }

// Check if both units are selected
if (!from || !to) {
  result.innerText = "Please select both units.";
  return;
}

    let convertedValue;   // This will store the converted result


// Run the correct conversion based on the selected category
if (selectedCategory === "Length") {
  convertedValue = convertLength(value, from, to);
} else if (selectedCategory === "Weight") {
  convertedValue = convertWeight(value, from, to);
} else if (selectedCategory === "Temperature") {
  convertedValue = convertTemperature(value, from, to);
}


result.textContent = `${value} ${from} = ${convertedValue} ${to}`;  //show the result
  }
  
convert.addEventListener("click", convertUnits);   // Add click event to "Convert" button

swap.addEventListener("click", () => {
  const fromValue = fromUnit.value;  // Store current 'from' value
  const toValue = toUnit.value;      // Store current 'to' value

  // Swap them
  fromUnit.value = toValue;
  toUnit.value = fromValue;
});


function convertLength(value, from, to) {   // Length conversion function (all to meters first)
    const meters  = {
        Meters: 1,
        Kilometers: 1000,
        Feet: 0.3048,
        Miles: 1609.34
    };
    const inMeters = value * meters[from];      // Convert from source unit to meters
    const result = inMeters / meters[to];       // Convert from meters to target unit

    return result.toFixed(4);                    // Round to 4 decimal places
}

function convertWeight(value, from, to) {     // Weight conversion function (all to grams first)
    const grams = {
    Grams: 1,
    Kilograms: 1000,
    Pounds: 453.592,
    Ounces: 28.3495
    };
    const inGrams = value * grams[from];        // Convert to grams first
  const result = inGrams / grams[to];         // Then convert to target unit

  return result.toFixed(4);                   // Return with 4 decimal places
}

function convertTemperature(value, from, to) {    // Temperature conversion function
    let result;

  if (from === to) {    // If both units are the same, return the same value
    result = value;
  }

  // Celsius to others
  else if (from === 'Celsius' && to === 'Fahrenheit') {
    result = (value * 9/5) + 32;
  } else if (from === 'Celsius' && to === 'Kelvin') {
    result = value + 273.15;
  }

  // Fahrenheit to others
  else if (from === 'Fahrenheit' && to === 'Celsius') {
    result = (value - 32) * 5/9;
  } else if (from === 'Fahrenheit' && to === 'Kelvin') {
    result = ((value - 32) * 5/9) + 273.15;
  }

  // Kelvin to others
  else if (from === 'Kelvin' && to === 'Celsius') {
    result = value - 273.15;
  } else if (from === 'Kelvin' && to === 'Fahrenheit') {
    result = ((value - 273.15) * 9/5) + 32;
  }
  return result.toFixed(2);   // Round result to 2 decimal places
} 


