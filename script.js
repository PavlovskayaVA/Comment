let comments = [];

loadComments();

const body = document.querySelector('body');
const button = document.querySelector('button');
//button.style.background = "red";
const name = document.querySelector('.name');
const photo = document.querySelector('.person-avatar');
const numComment = document.querySelector('.num-comment');



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
      { id: 0, name: 'Имя 1', avatar: 'https://images.unsplash.com/photo-1508185159346-bb1c5e93ebb4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=55cf14db6ed80a0410e229368963e9d8&auto=format&fit=crop&w=1900&q=80'},
      { id: 1, name: 'Имя 2', avatar: 'https://images.unsplash.com/photo-1495480393121-409eb65c7fbe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=05ea43dbe96aba57d48b792c93752068&auto=format&fit=crop&w=1351&q=80'},
      { id: 2, name: 'Имя 3', avatar: 'https://images.unsplash.com/photo-1501611724492-c09bebdba1ac?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ebdb0480ffed49bd075fd85c54dd3317&auto=format&fit=crop&w=1491&q=80'},
      { id: 3, name: 'Имя 4', avatar: 'https://images.unsplash.com/photo-1417106338293-88a3c25ea0be?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d1565ecb73a2b38784db60c3b68ab3b8&auto=format&fit=crop&w=1352&q=80'},
      { id: 4, name: 'Имя 5', avatar: 'https://images.unsplash.com/photo-1500520198921-6d4704f98092?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ac4bc726064d0be43ba92476ccae1a75&auto=format&fit=crop&w=1225&q=80'},
      { id: 5, name: 'Имя 6', avatar: 'https://images.unsplash.com/photo-1504966981333-1ac8809be1ca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9a1325446cbf9b56f6ee549623a50696&auto=format&fit=crop&w=1350&q=80'},
      { id: 6, name: 'Имя 7', avatar: 'https://images.unsplash.com/photo-1437075130536-230e17c888b5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ff573beba18e5bf45eb0cccaa2c862b3&auto=format&fit=crop&w=1350&q=80'},
      { id: 7, name: 'Имя 8', avatar: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1eac0f70640261e09152340f13b79144&auto=format&fit=crop&w=1350&q=80'},
      { id: 8, name: 'Имя 9', avatar: 'https://images.unsplash.com/photo-1506057278219-795838d4c2dd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f68d8d7b0223cd906ea8cac13421881d&auto=format&fit=crop&w=1350&q=80'},
    ];
  
    let index = Math.floor(Math.random() * users.length);

    name.innerHTML = `${users[index].name}`;
    photo.src = `${users[index].avatar}`;

   let userName = `${users[index].name}`;
   let userPhoto = `${users[index].avatar}`;

  return [userName, userPhoto]
}

let [userName, userPhoto] = generateUser();

button.addEventListener('click',addComment);

function addComment() {
  const messege = document.querySelector('.message');

  let comment = {
      photo: userPhoto, 
      name:  userName,
      time: Math.floor(Date.now()/1000),
      messege: messege.value,
  }

   messege.value = '';
      
   comments.push(comment);
   saveComments();
   showComments();
   saveCountComment();
}

function saveCountComment() {
    localStorage.setItem('countComments', JSON.stringify(numComment.innerHTML));  
}

function addCountComment() {
    if (localStorage.getItem('countComments')) numComment.innerHTML = JSON.parse(localStorage.getItem('countComments'));
    numComment.innerHTML++;
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));

    showComments();
    
}

function showComments() {
    addCountComment()

    const commentField = document.querySelector('.comment-field');
    let out = '';
    comments.forEach(function(item) {
        out += `<div class = 'containerComments'>
                    <img class = 'photoComments' src="${item.photo}" width = "50px" height = "50px"></img>
                    <div class = 'infoComments'>
                        <span class = 'nameComments'>${item.name}</span>
                        <span class = 'timeComments'>${timeConverter(item.time)}</span>
                        <p class = 'messegeComments'>${item.messege}</p>
                        <div class = 'addComments'>
                            <span class = 'answerComments'>
                                <img src="./img/answer.svg" class = 'answerCommentsImg'></img>
                                <span class = 'answerCommentsText'>Ответить</span>
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
                </div>`;
        
    })

    commentField.innerHTML = out;

}
/*
    const answerComments = document.querySelector('.answerCommentsText')
    answerComments.setAttribute("style", "color:orange;"); 

   


    
    function addAnswer() {
        addComment();
        let out2 = '';
        comments.forEach(function(item) {
            out2 +=`<div class = 'containerComments'>
                        <img class = 'photoComments' src="img/avatar.svg"></img>
                        <div class = 'infoComments'>
                            <span class = 'nameComments'>${item.name}</span>
                            <span class = 'timeComments'>${timeConverter(item.time)}</span>
                            <p class = 'messegeComments'>${item.messege}</p>
                            <div class = 'addComments'>
                                <span class = 'answerComments'>
                                    <img src="./img/answer.svg" class = 'answerCommentsImg'></img>
                                    <span class = 'answerCommentsText'>Ответить</span>
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
                            <div class='answerCommentsNew'>
                                <div class = 'containerComments'>
                                    <img class = 'photoComments' src="img/avatar.svg"></img>
                                    <div class = 'infoComments'>
                                        <span class = 'nameComments'>${item.name}</span>
                                        <span class = 'answerComments'>
                                            <img src="./img/answer.svg" class = 'answerCommentsImg'></img>
                                            <span class = 'answerCommentsText'>${item.name}</span>
                                        </span>
                                        <span class = 'timeComments'>${timeConverter(item.time)}</span>
                                        <p class = 'messegeComments'>${item.messege}</p>
                                        <div class = 'addComments'>
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
                            </div>
                        </div>
                    </div>`;
        })

        commentField.innerHTML = out2;
    }

    answerComments.addEventListener('click',addAnswer); 
}
*/


/*

 */
