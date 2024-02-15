import {generateUser} from './generateUser.js';
import {addZero, timeConverter} from './generateDateTime.js';
import {maxSymbol, maxCountSymbol} from './maxSymbol.js';
import {maxSymbolAnswer, maxCountSymbolAnswer} from './maxSymbolAnswer.js';

const button = document.querySelector('button');
const numComment = document.querySelector('.num-comment');
const message = document.querySelector('.message');

setInterval(maxCountSymbol, 100);
setInterval(maxCountSymbolAnswer, 100);

let comments = [];
let commentIndex = 0;

loadComments();

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
    message.innerHTML = '';
}

function addComment() {
    saveCountComment();
    let comment = {
        photo: userPhoto, 
        name:  userName,
        time: Math.floor(Date.now()/1000),
        message: message.innerHTML,
        answers: [],
        rating: 0,
        favorite: false,
    }
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
    let addCommentsHTML = ''
   
    comments.forEach(function(comment, commentIndex) {
        addCommentsHTML += `<div class = 'containerComments' data-index="${commentIndex}">
                                <img class = 'photoComments' src="${comment.photo}" width = "50px" height = "50px"></img>
                                <div class = 'infoComments'>
                                    <span class = 'nameComments' data-index="${commentIndex}">${comment.name}</span>
                                    <span class = 'timeComments'>${timeConverter(comment.time)}</span>
                                    <p class = 'messegeComments'>${comment.message}</p>
                                    <span class = 'answerComments'>
                                        <img src="./img/answer.svg" class = 'answerCommentsImg'></img>
                                        <span class = 'answerCommentsText' data-index="${commentIndex}">Ответить</span>
                                    </span>
                                    <span class = 'favoritesComments'>
                                    <img class = 'favoritesCommentsImg' data-parent="${commentIndex}" src="${comment.favorite ? './img/in_favorite.svg' : './img/favorite.svg'}"></img>
                                    <span class = 'favoritesCommentsText' data-parent="${commentIndex}">${comment.favorite ? 'В избранном' : 'В избранное'}</span>
                                    </span>
                                    <span class = 'ratingComments'>
                                        <img src="./img/minus.svg" class = 'ratingCommentsImg rating-minus' data-parent="${commentIndex}"></img>
                                        <span class = 'ratingCommentsText' data-parent="${commentIndex}">${comment.rating}</span>
                                        <img src="./img/plus.svg" class = 'ratingCommentsImg rating-plus' data-parent="${commentIndex}"></img>
                                    </span>
                                    <div class = 'eventsComments' data-index="${commentIndex}">${showAnswers(comment.answers, comment.name,commentIndex)}
                                        <div class = "userAnswer" data-index="${commentIndex}"></div>
                                    </div>
                                </div>            
                            </div>`;  
    })

    commentField.innerHTML = addCommentsHTML; 
    
    const answerButtons = document.querySelectorAll('.answerCommentsText')
    answerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const indexAnswer = event.target.dataset.index;
            let addInputsHTML = '';

            addInputsHTML += `<div class="comment-person comment-person-answer">
                                <img alt="person-avatar" class="person-avatar photo-answer" src="${userPhoto}" ></img>
                                <div class="person-messege">
                                    <div class="name-symbol name-symbol-answer">
                                        <div class="name name-answer">${userName}</div>
                                        <span class="symbol symbol-inactiveAnswer">Макс.1000 символов</span>
                                        <span class="symbol symbol-activeAnswer"><span class = "symbol-active-numberAnswer"></span>/1000</span>
                                        <span class="symbol symbol-errorAnswer">Слишком длинное сообщение</span>
                                    </div>
                                    <div contenteditable="" class="message message-answer" placeholder="Введите текст сообщения..."></div>
                                </div>
                                <button class="button button-answer">Отправить</button>
                            </div>`
            let addAnswers = document.querySelector(`.userAnswer[data-index="${indexAnswer}"]`)

            addAnswers.innerHTML = addInputsHTML; 

            const buttonAnswer = document.querySelectorAll('.button-answer');
            const messageAnswer = document.querySelector('.message-answer');
            messageAnswer.innerHTML = '';

            buttonAnswer.forEach(button => {
                button.addEventListener("click", () => {
                    let answer = {
                        photoAnswer: userPhoto, 
                        nameAnswer:  userName,
                        timeAnswer: Math.floor(Date.now()/1000),
                        messageAnswer: messageAnswer.innerHTML,
                        rating: 0,
                        favorite: false,
                    }

                     comments[indexAnswer].answers.push(answer);
                     saveComments();      

                     addAnswers.innerHTML = showAnswers(comments[indexAnswer].answers, userName, commentIndex)  
                     loadComments();                 
                })
            })   
     
        }) 
        
    })
}

function showAnswers(answers, name,commentIndex) {
    let addAnswersHTML = ''
    answers.forEach(function(answer, answerIndex) {
        addAnswersHTML += `<div class = 'containerComments' data-index="${answerIndex}">
                                <img class = 'photoComments' src="${answer.photoAnswer}" width = "50px" height = "50px"></img>
                                <div class = 'infoComments'>
                                    <span class = 'nameComments'>${answer.nameAnswer}</span>
                                    <img src="./img/answer.svg" class = 'answerCommentsImg'></img>
                                    <span class = 'nameAnswer'>${name}</span>
                                    <span class = 'timeComments'>${timeConverter(answer.timeAnswer)}</span>
                                    <p class = 'messegeComments'>${answer.messageAnswer}</p>
                                    <div class = 'eventsAnswer' data-index="${answerIndex}">
                                        <span class = 'favoritesComments'>
                                            <img class = 'favoritesCommentsImg' data-parent="${commentIndex}" data-index="${answerIndex}" src="${answer.favorite ? './img/in_favorite.svg' : './img/favorite.svg'}"></img>
                                            <span class = 'favoritesCommentsText' data-parent="${commentIndex}" data-index="${answerIndex}" >${answer.favorite ? 'В избранном' : 'В избранное'}</span>
                                        </span>
                                        <span class = 'ratingComments'>
                                            <img src="./img/minus.svg" class = 'ratingCommentsImg rating-minus' data-parent="${commentIndex}" data-index="${answerIndex}"></img>
                                            <span class = 'ratingCommentsText'>${answer.rating}</span>
                                            <img src="./img/plus.svg" class = 'ratingCommentsImg rating-plus' data-parent="${commentIndex}" data-index="${answerIndex}"></img>
                                        </span>
                                    </div>
                                </div>                 
                            </div>`;          
    })
    return addAnswersHTML
}
let favorite;

//favorite
function inFavorite(element) {
    let commentIndex = element.dataset.parent;
    let answerIndex = element.dataset.index;
    let favoriteText;
    let favoriteImg;


    if (!answerIndex)  {
        comments[commentIndex].favorite = !comments[commentIndex].favorite;
        favorite = comments[commentIndex].favorite;
    }

    else {
        comments[commentIndex].answers[answerIndex].favorite = !comments[commentIndex].answers[answerIndex].favorite;
        favorite = comments[commentIndex].answers[answerIndex].favorite;
    }
    
    favoriteText = favorite ? 'В избранном' : 'В избранное';
    favoriteImg = favorite ? './img/in_favorite.svg' : './img/favorite.svg';
    
    element.closest('.favoritesComments').querySelector('.favoritesCommentsText').innerHTML = favoriteText;
    element.closest('.favoritesComments').querySelector('.favoritesCommentsImg').src = favoriteImg;
    saveComments();
    showComments();
}

//rating
function ratingCount(element, ratingSymbol) {
    let commentIndex = element.dataset.parent;
    let answerIndex = element.dataset.index;
    let rating;

    if (!answerIndex) {
        if (ratingSymbol === 'plus' && comments[commentIndex].rating < 1) {
            comments[commentIndex].rating += 1;
        }
        else if (ratingSymbol === 'minus' && comments[commentIndex].rating > -1) {
            comments[commentIndex].rating -= 1;
        }
        rating = comments[commentIndex].rating;
    }
    else {
        if (ratingSymbol === 'plus' && comments[commentIndex].answers[answerIndex].rating < 1) {
            comments[commentIndex].answers[answerIndex].rating += 1;
        }
        else if (ratingSymbol === 'minus' && comments[commentIndex].answers[answerIndex].rating > -1) {
            comments[commentIndex].answers[answerIndex].rating -= 1;
        }
        rating = comments[commentIndex].answers[answerIndex].rating;
    }
    element.closest('.ratingComments').querySelector('.ratingCommentsText').innerHTML = rating;
    saveComments(); 
}

document.addEventListener('click', function (event) {
    const target = event.target;

    if (target.matches('.rating-plus')) {
        ratingCount(target, 'plus');
    }

    if (target.matches('.rating-minus')) {
        ratingCount(target, 'minus');
    }
    if(target.matches('.favoritesCommentsText')) {
        inFavorite(target)
    }
});

//favoritePage
//let containerComments = document.querySelectorAll('.containerComments') // получаем в переменную весь блок с комментарием

let favoriteButton = document.querySelector('.title-favorites');
favoriteButton.addEventListener('click', favoritePage)

function favoritePage() {
    comments.forEach(commentItem => { // проходимся по всем комментариям
        if(commentItem.favorite == true) { // если какой-либо комментарий содержит "В избранном"
            alert('1')
            commentItem.classList.add("hideFalseFavorite"); // находим блок с комментарем с таким же индексом и скрываем блок
        } else {
            alert('2')
            commentItem.classList.remove("hideFalseFavorite"); // показываем блок
        }
    })
}

   
    







