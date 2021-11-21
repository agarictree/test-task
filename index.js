let posts_selected = document.querySelector(".selected_posts__container");
let posts_other = document.querySelector(".other_posts__container");
let posts_random = document.querySelector(".random_post__container");

//функция для создания основного контейнера
function createContainer(elem, elemClassName) {
    let container = document.createElement(elem);
    container.className = elemClassName;
    return container;
}

//функция для создания и вставки контейнера для поста
function pasteBlock(parent, container, user, item) {
    container.append(user);
    let title = document.createElement("p");
    title.textContent = `${item.title}`;
    title.className = "posts__title";
    container.append(title);
    let text = document.createElement("p");
    text.textContent = item.body;
    text.className = "posts__body";
    container.append(text);
    parent.append(container);
}

//функция для возвращения случайного числа
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


fetch("https://jsonplaceholder.typicode.com/posts")
    .then(responce => responce.json())
    .then(result => {

        //сортировка
        //посты в каждом блоке отсортированы по полю title
        let sorted = result.sort((a, b) => a.title > b.title ? 1 : -1);

        //получение списка пользователей для отображения их имен в блоках
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(requst => requst.json())
            .then(users => {

                let random = getRandomInt(0, sorted.length);
                let randomPost = sorted[random];

                //перебор массива
                sorted.map(item => {
                    let others_container = createContainer("div", "post_container")
    
                    let selected_container = createContainer("div", "post_container");

                    let userTitle = createContainer("h3", "posts__username");

                    let random_container = createContainer("div", "post_container");

                    let randomPostTitle = createContainer("h3", "posts__username");
                    
                    //поиск имени пользователя по полю id
                    users.filter(elem =>{
                        if(elem.id == item.userId) {
                            userTitle.textContent = elem.name;
                        }
                        if(randomPost.userId == elem.id) {
                            randomPostTitle.textContent = elem.name;
                        }
                    });

                    //случайный пост
                    if(randomPost.id == item.id) {
                        pasteBlock(posts_random, random_container, randomPostTitle, item);
                    }
                    //вывести все последние посты пользователей
                    if(item.id % 10 == 0) {
                        pasteBlock(posts_selected, selected_container, userTitle, item);
                    } else {
                        //остальные посты в другом блоке
                        pasteBlock(posts_other, others_container, userTitle, item);
                    }
                })
            })
    })