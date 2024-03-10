export function usersDataOrder() {
    let usersData = JSON.parse(localStorage.getItem('usersData')) || [];
    //ordenando los usuarios por tiempo, del menor tiempo al mayor
    usersData.sort((a, b) => {
        if (a.time > b.time) {
            return 1;
        }
        if (a.time < b.time) {
            return -1;
        }
        return 0;
    });
    return usersData;
}

export function userName() {
    let usersData = JSON.parse(localStorage.getItem('usersData')) || [];
    for (let user of usersData) {
        if (user.jugando === 1) {
            return user.username;
        }
    }
}

export function setJugador(jugador) {
    let usersData = JSON.parse(localStorage.getItem('usersData')) || [];
    for(let user of usersData){
        if(user.jugando === 1){
            user.jugando = 0;
        }
    }
    localStorage.setItem('usersData', JSON.stringify(usersData));
}