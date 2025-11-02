const requestURL = "https://reqres.in/api/users/2";

const userData = { name: "Taif", job: "leader" };
const response = await fetch(requestURL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  },
  body: JSON.stringify(userData),
});
const data = await response.json();
console.log(data);
