function operationOnNumbers(a, b, operation) {
  return operation(a, b);
}

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;

console.log(operationOnNumbers(5, 3, add)); // 8
console.log(operationOnNumbers(10, 4, subtract)); // 6
