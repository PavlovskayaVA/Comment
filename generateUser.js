function generateUser() {
    const name = document.querySelector('.name');
    const photo = document.querySelector('.person-avatar');

    let users = [
        { name: 'Boba', avatar: './img/avatars/boba.png' },
        { name: 'R2D2', avatar: './img/avatars/r2d2.png' },
        { name: 'Mando', avatar: './img/avatars/mando.png' },
        { name: 'Grogu', avatar: './img/avatars/grogu.png' },
        { name: 'Wader', avatar: './img/avatars/wader.png' },
        { name: 'Rey', avatar: './img/avatars/rey.png' },
        { name: 'Chewbacca', avatar: './img/avatars/chewbacca.png' },
        { name: 'Trooper', avatar: './img/avatars/trooper.png' },
        { name: 'Luke', avatar: './img/avatars/luke.png' },
        { name: 'Solo', avatar: './img/avatars/solo.png' },
        { name: 'Obi-Wan', avatar: './img/avatars/obi-wan.png' },
        { name: 'Palapatin', avatar: './img/avatars/palapatin.png' },
        { name: 'Ewok', avatar: './img/avatars/ewok.png' },
        { name: 'Jawas', avatar: './img/avatars/jawas.png' },
        { name: 'Dart Mol', avatar: './img/avatars/dart-mol.png' }
    ];
  
    let index = Math.floor(Math.random() * users.length);

    name.innerHTML = `${users[index].name}`;
    photo.src = `${users[index].avatar}`;
    let userName = `${users[index].name}`;
    let userPhoto = `${users[index].avatar}`;

    return [userName, userPhoto]
}

export {generateUser}