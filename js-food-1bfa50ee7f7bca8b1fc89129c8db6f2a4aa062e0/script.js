const API = 'https://272048b109ede573.mokky.dev/pizzas'
const search = document.querySelector('.search')
// const pizzas = ''
changeTotalPizza()
search.oninput = () => {
    const searchValue = search.value
    renderPizzas(searchValue)
}


const cartButton = document.querySelector('.cart-button')
cartButton.addEventListener('click', () => {
    document.querySelector('.cart').classList.remove('hidden')
})

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.cart').classList.add('hidden')
})

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']
const categoriesList = document.querySelector('.categories')

async function renderCategories(indexCategory) {
    const pizzas = await getPizzas('')
    categoriesList.innerHTML = ''
    categories.forEach((item, index) => {
        categoriesList.insertAdjacentHTML('beforeend',
            `
                <button class="${indexCategory == index ? 'bg-black text-white' : 'bg-slate-100 text-black'}  px-5 py-3 rounded-full">${item}</button>
            `
        )
    })
    const categoryList = document.querySelectorAll('.categories button')
    categoryList.forEach((buttonCategory, index) => {
        buttonCategory.addEventListener('click', () => {
            renderCategories(index)
            if (index == 0) {
                renderPizzas('')
            }
            else {
                const pizzaCategory = pizzas.filter(pizza => pizza.category == index)
                renderPizzas('', pizzaCategory)
            }

        })
    })
}

renderCategories(0)

const pizzaList = document.querySelector('#pizzaList')

renderPizzas('')

async function getPizzas(searchValue, sort) {
    const response = await fetch(API + (searchValue != '' ? '?name=*' + searchValue + '*' : '') + (sort ? '?sortBy=' + sort : ''))
    const data = await response.json()
    return data
}

async function renderPizzas(searchValue, sort) {
    const pizzas = await getPizzas(searchValue, sort)
    pizzaList.innerHTML = ''
    pizzas.forEach(item => {
        pizzaList.insertAdjacentHTML('beforeend', `
            <div class="p-5 flex flex-col items-center rounded-xl shadow-xl pizza">
                        <img class="" src="${item.imageUrl}" alt="">
                        <p class="text-center text-xl font-bold">${item.name}</p>
                        <div class="bg-slate-200 w-full p-2 mt-4 flex items-center flex-col gap-3 rounded-[5px]">
                            <div class="flex items-center justify-between gap-3">
                                <span class="bg-white p-1 rounded-[5px]">тонкое</span>
                                <span class="bg-white p-1 rounded-[5px]">традиционное</span>
                            </div>
                            <div class="flex items-center justify-between gap-3">
                                <span class=" bg-white p-1 rounded-[5px]">26см.</span>
                                <span class="bg-white p-1 rounded-[5px]">30см.</span>
                                <span class="bg-white p-1 rounded-[5px]">40см.</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between w-full mt-4">
                            <span class="text-2xl font-bold">${item.price}тг.</span>
                            <div onclick="addToCart(${item.id}, ${item.price}, '${item.imageUrl}', '${item.name}')" data-id="${item.id}" class="cursor-pointer flex gap-2 items-center border-orange-400 border-[2px] p-3 rounded-full">
                                <img src="./img/plus.svg" alt="">
                                <span>Добавить</span>
                            </div>
                        </div>
                    </div>
            
            `)
    });

}

function addToCart(id, price, imageUrl, name) {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const pizzaObject = {
        id,
        name,
        imageUrl,
        price
    }
    cart.push(pizzaObject)
    localStorage.setItem('cart', JSON.stringify(cart))
    document.querySelector('.cart-pizza-list').innerHTML = ''
    renderCartPizzas()
    changeTotalPizza()

    Swal.fire({
        title: "Отличный выбор",
        text: `Пицца "${name}" добавлена в корзину!`,
        icon: "success"
    });






}

function changeTotalPizza() {
    document.querySelectorAll('.total-pizza-price').forEach((item) => {
        item.textContent = JSON.parse(localStorage.getItem('totalPrice')) || 0
    })

    document.querySelectorAll('.total-pizza-count').forEach((item) => {
        item.textContent = JSON.parse(localStorage.getItem('totalPizzas')) || 0
    })
}

function renderCartPizzas() {
    let count = 0
    const pizzas = JSON.parse(localStorage.getItem('cart')) || []
    localStorage.setItem('totalPizzas', pizzas.length)

    pizzas.forEach((item, index) => {
        count = count + Number(item.price)
        document.querySelector('.cart-pizza-list').insertAdjacentHTML('beforeend',
            `
            <div class="flex items-center justify-between w-[100%]">
                    <div class="flex items-center gap-3">
                        <img class="w-[150px]" src="${item.imageUrl}" alt="">
                        <div class="w-[400px]">
                            <p class="text-xl font-bold">${item.name}</p>
                            <p class="text-slate-400">Тонкое тесто, 26см.</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <img src=" ./img/MinusCart.svg" alt="">
                        <span class="font-bold">2</span>
                        <img src="./img/PlusCart.svg" alt="">
                    </div>
                    <p class="font-bold text-xl">${item.price}тг.</p>
                    <img class="cursor-pointer" onclick="removePizza(${index})" src="./img/Cross.svg" alt="">
                </div>
            `
        )
    })

    localStorage.setItem('totalPrice', count)


}

function removePizza(index) {
    const pizzas = JSON.parse(localStorage.getItem('cart')) || []
    pizzas.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(pizzas))
    document.querySelector('.cart-pizza-list').innerHTML = ''
    renderCartPizzas()
    changeTotalPizza()

}

renderCartPizzas()

document.querySelector('.remove-cart').addEventListener('click', () => {
    localStorage.setItem('cart', '[]')
    document.querySelector('.cart-pizza-list').innerHTML = ''
    renderCartPizzas()
    changeTotalPizza()
})


const img = document.querySelector('.img')
const listItems = document.querySelector('.list-items')

document.querySelector('.tog').addEventListener('click', () => {
    listItems.classList.toggle('whatch')
    img.classList.toggle('rotate-180')
})


// По убыванию и по возрастанию цены сортировка
document.querySelector('.up').addEventListener('click', () => {
    renderPizzas('', 'price')
    listItems.classList.remove('whatch')
})

document.querySelector('.down').addEventListener('click', () => {
    renderPizzas('', '-price')
    listItems.classList.remove('whatch')
})
// По убыванию и по возрастанию цены сортировка


document.querySelector('.sign-button').addEventListener('click', () => {
    window.location.href = 'signIn.html'
})

const userNameLocal = localStorage.getItem('userName')
if (userNameLocal) {
    document.querySelector('.right-block').prepend(`Привет, ${userNameLocal}`)
}

document.querySelector('.exit-button').addEventListener('click', () => {
    localStorage.removeItem('userName')
    document.location.reload()
})

const userName = localStorage.getItem('userName')
if (!userName) {
    document.querySelector('.exit-button').style.display = 'none'
    document.querySelector('.sign-button').style.display = 'block'
}
else {
    document.querySelector('.exit-button').style.display = 'block'
    document.querySelector('.sign-button').style.display = 'none'
}