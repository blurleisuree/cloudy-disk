export const registration = async (email, password) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/registration",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    console.log(await response.json());
  } catch (e) {
    console.log(e);
  }
};

export const login = async (email, password) => {
  try {
    const responce = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    console.log(await responce)
  } catch (e) {
    console.log(e);
  }
};
