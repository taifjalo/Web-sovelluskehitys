const numbers = [11, 20, 33, 40, 55];

// for each goes to main array and each element and dont returen new array.
numbers.forEach((num) => {
  math = (num * 9) / 5 + 32;
  console.log(math);
});

// map return new array from the array
const mapNum = numbers.map((num) => (num * 9) / 5 + 32);
console.log(mapNum);

// filter makes new array from the array, it goes to main array to extract elements based on specific conditions.
const oddNumbers = numbers.filter((num) => num % 2 !== 0);
console.log(oddNumbers);

// reduce method put all elements array into one while running it. example: firstNum + secondNum --> (firstNum + secondNum)newNum + nextNum --> (newNum + nextNum)againNewNum + nextNum --> ...
// (0 + 11) --> (11 + 20)--> (31 + 33) --> (64 + 40)  --> (104 + 55) --> (159).
// it keep apply elemnt to next elemnt one by one with next one always. till it done
const reduceNum = numbers.reduce((sum, num) => sum + num, 0); // some times we make the varbble sum = 0 to keep track the method while it goes forword
console.log(reduceNum);

// Example with map() and filter() and reduce()
const products = [
  { name: "Laptop", price: 1200 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 70 },
  { name: "Monitor", price: 300 },
];

// نريد نختار فقط المنتجات اللي سعرها فوق 100، ونرجع أسماؤهم بحروف كبيرة
const result = products
  .filter(({ price }) => price > 100)
  .map(({ name }) => name.toUpperCase());
console.log(result);

// وراها نجمع كل الاسعار من المصفوفة لان مانكدر انفذها بالمعادلة السابقة والسبب منطقي لان كل وحده الها شغلها الخاص
const totalPrice = products.reduce((sum, { price }) => sum + price, 0);
console.log(totalPrice);
