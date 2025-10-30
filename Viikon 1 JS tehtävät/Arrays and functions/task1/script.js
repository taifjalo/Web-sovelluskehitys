const fruits = ["apple", "banana", "orange", "grape", "kiwi"];
console.log("Fruits:", fruits);
console.log("Length of Fruits:", fruits.length);
console.log("Element at Index 2:", fruits[2]); // index 1 is the second fruit
console.log("Last Element of Fruits:", fruits[fruits.length - 1]);

const vegetables = [];
// Prompt the user to add three vegetables:
for (let i = 0; i < 3; i++) {
  const addVegetable = prompt(`Enter Three vegetable ${i + 1}: `);
  vegetables.push(addVegetable);
}
console.log("Vegetables:", vegetables);
console.log("Length of Vegetables:", vegetables.length);
