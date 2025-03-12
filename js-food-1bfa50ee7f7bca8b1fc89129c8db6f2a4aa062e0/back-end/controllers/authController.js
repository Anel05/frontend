const users = [
    {
        id: 1,
        firstName: "Anel",
        lastName: "Toktasyn",
        email: "anel7@gmail.com",
        passwordUser: "qwerty123"
    }
]

const getUsers = (req, res) => {
    res.json(users)
}

const signIn = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = users.find(user => user.email == email && user.passwordUser == password)
}

module.exports = { getUsers, signIn }