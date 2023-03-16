const form = document.querySelector(".search")
const searchField = document.querySelector(".search__input")
const emptyText = document.querySelector(".list__empty")
const loader = document.querySelector(".list__loader")

form.addEventListener("submit",  async (e) => {
    e.preventDefault()
    const items = document.querySelectorAll(".list__item")
    items.forEach(el => el.remove())
    loader.classList.add("active")
    await fetch(`https://api.github.com/search/repositories?q=${searchField.value}&sort=stars`)
        .then(json => json.json())
        .then(({items}) => {
            if(items.length) {
                emptyText.classList.remove("active")
                createItems(items.slice(0, 10))
            } else {
                emptyText.classList.add("active")
            }
            loader.classList.remove("active")
        })
})

const list = document.querySelector(".list")
const item = document.querySelector(".list__item")
item.remove()

const createItems = (arr) => {
    arr.forEach(el => {
        const newItem = item.cloneNode(true)
        const date = new Date(el.created_at)
        const formDate = {
            day: date.getDate(),
            month: date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
            year: date.getFullYear()
        }
        newItem.querySelector(".list__item_title").innerText = el.name
        newItem.querySelector(".list__item_title").setAttribute("href", el.html_url)
        newItem.querySelector(".list__item_create").innerText = `Создан: ${formDate.day}.${formDate.month}.${formDate.year}`
        newItem.querySelector(".list__item_watchers").innerText = `Просмотров: ${el.watchers}`
        newItem.querySelector(".list__item_stars").innerText = `Оценок: ${el.stargazers_count}`
        list.appendChild(newItem)
    })
}
