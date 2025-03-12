document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault()

    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value

    const fetchUsers = await fetch('http://localhost:3000/api/auth/signIn', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email, 
            password
        })
    })
    console.log(fetchUsers)
    //const users = await fetchUsers.json()

    

    //const user = users.find((item) => item.email == email && item.userPassword == password)
    //localStorage.setItem('userName', user.firstName)
    //user ? window.location.href = 'index.html' : alert('Неверный логин или пароль')

})


