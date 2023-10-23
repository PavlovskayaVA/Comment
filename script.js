let comments = [];
let answers = [];

let commentIndex = 0;

loadComments();
loadAnswers();

const body = document.querySelector('body');
const button = document.querySelector('button');
const name = document.querySelector('.name');
const photo = document.querySelector('.person-avatar');
const numComment = document.querySelector('.num-comment');

numComment.innerHTML = 0;

function addZero(z) {
    return z < 10 ? "0" + z : z;
}

function timeConverter(UNIX_timestamp) {

    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Now', 'Dec'];
    let year = a.getFullYear();
    //let month = months[a.getMonth()];
    let month = addZero(a.getMonth() + 1);
    let date = addZero(a.getDate());
    let hour = addZero(a.getHours());
    let min = addZero(a.getMinutes());
    let sec = addZero(a.getSeconds());
    let time = date + '.' + month + ' ' + hour + ':' + min;
    return time;
}

function generateUser() {
    let users = [
        { id: 0, name: 'Boba', avatar: './img/avatars/boba.png' },
        { id: 1, name: 'R2D2', avatar: './img/avatars/r2d2.png' },
        { id: 2, name: 'Mando', avatar: './img/avatars/mando.png' },
        { id: 3, name: 'Grogu', avatar: './img/avatars/grogu.png' },
        { id: 4, name: 'Wader', avatar: './img/avatars/wader.png' },
        { id: 5, name: 'Padme', avatar: './imgavatars/padme.png' },
        { id: 6, name: 'Rey', avatar: './img/avatars/rey.png' },
        { id: 7, name: 'Chewbacca', avatar: './img/avatars/chewbacca.png' },
        { id: 8, name: 'Trooper', avatar: './img/avatars/trooper.png' },
        { id: 9, name: 'Luke', avatar: './img/avatars/luke.png' },
        { id: 10, name: 'Solo', avatar: './img/avatars/solo.png' },
        { id: 11, name: 'Obi-Wan', avatar: './img/avatars/obi-wan.png' },
        { id: 12, name: 'Palapatin', avatar: './img/avatars/palapatin.png' },
        { id: 13, name: 'Ewok', avatar: './img/avatars/ewok.png' },
        { id: 14, name: 'Jawas', avatar: './img/avatars/jawas.png' },
        { id: 15, name: 'Dart Mol', avatar: './img/avatars/dart-mol.png' }
    ];
  
    let index = Math.floor(Math.random() * users.length);

    name.innerHTML = `${users[index].name}`;
    photo.src = `${users[index].avatar}`;
    let userName = `${users[index].name}`;
    let userPhoto = `${users[index].avatar}`;

    return [userName, userPhoto]
}

let [userName, userPhoto] = generateUser();

button.addEventListener('click',addCommentIndex);

function addCommentIndex() {
    if (localStorage.getItem('commentIndex')) {
    commentIndex = localStorage.getItem('commentIndex');
    } else {
        localStorage.setItem('commentIndex', commentIndex); 
    }
   
    addComment();
    saveCommentIndex();
}


function addComment() {
    const message = document.querySelector('.message');
  
    saveCountComment();
  
    let comment = {
        photo: userPhoto, 
        name:  userName,
        time: Math.floor(Date.now()/1000),
        message: message.value,
    }
  
     message.value = '';
        
     comments.push(comment);
     saveComments();
     showComments(); 
}

function saveCountComment() {
    numComment.innerHTML ++;
    localStorage.setItem('countComments', numComment.innerHTML);     
}

function saveCommentIndex() {
    commentIndex ++;
    localStorage.setItem('commentIndex', commentIndex);   
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));    
}

function loadComments() {
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));

    showComments(); 
}

if (localStorage.getItem('countComments')) {
    numComment.innerHTML = localStorage.getItem('countComments');
} else {
    localStorage.setItem('countComments', numComment.innerHTML); 
}


function showComments() {
    const commentField = document.querySelector('.comment-field');
    let outComment = '';
   
    comments.forEach(function(item, commentIndex) {
        outComment += `<div class = 'containerComments' data-index="${commentIndex}">
                    <img class = 'photoComments' src="${item.photo}" width = "50px" height = "50px"></img>
                    <div class = 'infoComments'>
                        <span class = 'nameComments' data-index="${commentIndex}">${item.name}</span>
                        <span class = 'timeComments'>${timeConverter(item.time)}</span>
                        <p class = 'messegeComments'>${item.message}</p>
                        <div class = 'addComments' data-index="${commentIndex}">
                            <span class = 'answerComments'>
                                <img src="./img/answer.svg" class = 'answerCommentsImg'></img>
                                <span class = 'answerCommentsText' data-index="${commentIndex}">Ответить</span>
                            </span>
                            <span class = 'favoritesComments'>
                                <img src="./img/in_favorite.svg" class = 'favoritesCommentsImg'></img>
                                <span class = 'favoritesCommentsText'>В избранном</span>
                            </span>
                            <span class = 'ratingComments'>
                                <img src="./img/minus.svg" class = 'ratingCommentsImg'></img>
                                <span class = 'ratingCommentsText'>0</span>
                                <img src="./img/plus.svg" class = 'ratingCommentsImg'></img>
                            </span>
                        </div>
                    </div>                 
                </div>
                `;  
    })

    commentField.innerHTML = outComment;   

    const answerButtons = document.querySelectorAll('.answerCommentsText')

    answerButtons.forEach(item => {
        item.addEventListener('click', () => {
            const indexAnswer = event.target.dataset.index;
            let outInput = '';

            outInput += `<div class="comment-person comment-person-answer">
                        <img alt="person-avatar" class="person-avatar photo-answer" src="${userPhoto}" ></img>
                        <div class="person-messege">
                            <div class="name-symbol">
                                <div class="name name-answer">${userName}</div>
                            </div>
                            <input class="message message-answer" placeholder="Введите текст сообщения...">
                            </input>
                        </div>
                        <button class="button button-answer">Отправить</button>
                        </div>
                        <div class = "primer"></div>
                        `
            let addAnswers = document.querySelector(`.addComments[data-index="${indexAnswer}"]`)

            addAnswers.innerHTML = outInput; 
            const buttonAnswer = document.querySelectorAll('.button-answer')

            buttonAnswer.forEach(e => {
                e.addEventListener("click", () => {
                    const messageAnswer = document.querySelector('.message-answer')

                    let answer = {
                        photoAnswer: userPhoto, 
                        nameAnswer:  userName,
                        timeAnswer: Math.floor(Date.now()/1000),
                        messageAnswer: messageAnswer.value,
                    }

                     comments.push(answer);
                     saveComments();
                     showAnswers();                     
                })
            })   
            
            
            
            function showAnswers() {
                comments.forEach(function(item, commentIndex) {
                    let namePersonAnswer = document.querySelector(`.nameComments[data-index="${indexAnswer}"]`)
                    outAnswer = ''
                    outAnswer += `<div class = 'containerComments' data-index="${commentIndex}">
                                <img class = 'photoComments' src="${item.photoAnswer}" width = "50px" height = "50px"></img>
                                <div class = 'infoComments'>
                                    <span class = 'nameComments'>${item.nameAnswer}</span>
                                    <img src="./img/answer.svg" class = 'answerCommentsImg'></img>
                                    <span class = 'nameAnswer'>${namePersonAnswer.innerHTML}</span>
                                    <span class = 'timeComments'>${timeConverter(item.timeAnswer)}</span>
                                    <p class = 'messegeComments'>${item.messageAnswer}</p>
                                    <div class = 'addComments' data-index="${commentIndex}">
                                        <span class = 'favoritesComments'>
                                            <img src="./img/in_favorite.svg" class = 'favoritesCommentsImg'></img>
                                            <span class = 'favoritesCommentsText'>В избранное</span>
                                        </span>
                                        <span class = 'ratingComments'>
                                            <img src="./img/minus.svg" class = 'ratingCommentsImg'></img>
                                            <span class = 'ratingCommentsText'>0</span>
                                            <img src="./img/plus.svg" class = 'ratingCommentsImg'></img>
                                        </span>
                                    </div>
                                </div>                 
                            </div>
                            <div class = "answer"></div>`;

                    addAnswers.innerHTML = outAnswer; 
                            
                })

            }
        }) 
        
    })

    
}


