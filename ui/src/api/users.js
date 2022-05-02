import URL from "./index"

const createUser = (values) =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem("token")
    fetch(`${URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: "include",
      body: JSON.stringify({ user: values }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })

const getUsers = () =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem("token")
    fetch(`${URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })

const getMe = () =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem("token")
    fetch(`${URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })

export { createUser, getUsers, getMe }
