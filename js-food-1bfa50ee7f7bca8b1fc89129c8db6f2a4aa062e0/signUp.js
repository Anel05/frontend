const API = 'https://272048b109ede573.mokky.dev/users'

async function addUser(firstName, lastName, email, userPassword) {
    await fetch(API, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            userPassword
        })
    })

}


document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const firstName = document.querySelector('.firstName').value
    const lastName = document.querySelector('.lastName').value
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value
    await addUser(firstName, lastName, email, password)
    document.location.href = './signIn.html'

})
