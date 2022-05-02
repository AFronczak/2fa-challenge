import URL from "./index"
const submitAuthentication = (values) =>
  new Promise((resolve, reject) => {
    fetch(`${URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authentication: values }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
const sumbmitOtp = (values, id, remember) =>
  new Promise((resolve, reject) => {
    console.log(values, id)
    fetch(`${URL}/otp`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: {user_id: id, remember: remember, ...values} }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt)
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })

// delete from local storage
const destroySession = () =>
  localStorage.removeItem("token")
  sessionStorage.removeItem('token')

export { destroySession, sumbmitOtp, submitAuthentication }
