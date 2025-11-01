const requestURL = "https://reqres.in/api/users/2";

const response = await fetch(requestURL, {
  headers: {
    "x-api-key": "reqres-free-v1",
  },
});
const data = await response.json();
console.log(data);
