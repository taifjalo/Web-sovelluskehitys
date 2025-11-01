const requestURL = "https://reqres.in/api/users/2";

async function createUser() {
  try {
    const response = await fetch(requestURL, {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });

    if (!response.ok) {
      // throwing error if response is not ok.
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("An error occurred::", error);
  }
}

getUser();
