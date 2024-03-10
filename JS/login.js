//////////////////////// CANVAS ////////////////////////
window.onload = function () {
    // Obtener el canvas y su contexto
    var canvas = document.getElementById('backgroundCanvas');
    var ctx = canvas.getContext('2d');

    // Establecer el tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Dibujar el fondo
    var fondo = new Image();
    fondo.onload = function () {
        ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);
    };
    fondo.src = '../media/atardecer.jpg';
};

//////////////////////// Fin de Canvas ////////////////////////
//Si el buton de "JUGAR" esta desabilitado se ponen los siguientes estilos:
const usernameInput = document.getElementById('usernameInput');
const startButton = document.getElementById('startButton');
const welcomeMessage = document.getElementById('welcomeMessage');
const maxScore = document.getElementById('maxScore');
const time = document.getElementById('time');
const userDataDiv = document.getElementById('userData');

// Enfocar el input al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("usernameInput").focus();
    //jugando=0 en todos los jugadores
    let userData = JSON.parse(localStorage.getItem('usersData')) || [];
    userData.forEach(user => {
        user.jugando = 0;
    });
});

// Función para verificar si el usuario existe en localStorage
function checkUserExists(username) {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
    // hacerlo no case sensitive
    return usersData.find(user => user.username.toLowerCase() === username.toLowerCase());
}

// Función para mostrar los datos del usuario
function showUserData(userData) {
    welcomeMessage.innerText = `¡Que bueno volver a verte, ${userData.username}!`;
    maxScore.innerText = userData.score;
    time.innerText = userData.time;
    userDataDiv.style.display = 'block';
}

// Función para ocultar los datos del usuario
function hideUserData() {
    userDataDiv.style.display = 'none';
}

// Función para manejar el cambio en el input del nombre de usuario
function handleUsernameChange() {
    const username = usernameInput.value.trim();
    const userExists = checkUserExists(username);

    if (username === '') {
        // ponerle la clase pokeButton-disabled al botón de inicio
        startButton.classList.remove('pokeButton');
        startButton.classList.add('pokeButton-disabled');
        startButton.disabled = true;
    } else {
        // quitarle la clase pokeButton-disabled al botón de inicio
        startButton.classList.remove('pokeButton-disabled');
        startButton.classList.add('pokeButton');
        startButton.disabled = false;
    }

    if (userExists) {
        showUserData(userExists);
    } else {
        hideUserData();
    }
}

// Función para manejar el inicio del juego
function startGame() {
    var username = usernameInput.value.trim().toLowerCase(); // Obtener el nombre de usuario
    if (username === '') return; // Si el nombre de usuario está vacío, no hacer nada
    if (!checkUserExists(username)) { // Si el usuario no existe, crearlo
        const newUser = {
            username: username,
            score: 0,
            time: '00:00',
            juagando: 1
        };
        const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
        usersData.push(newUser);
        localStorage.setItem('usersData', JSON.stringify(usersData));
        //Comenzar el juego
    }
    else {
        //Si el usuario ya existe comenzar el juego
        const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
        usersData.forEach(user => {
            if (user.username === username) {
                user.jugando = 1;
            }
        });
        localStorage.setItem('usersData', JSON.stringify(usersData));
    }
    window.location.href = 'final.html';
}

// Event listener para el cambio en el input
usernameInput.addEventListener('input', handleUsernameChange);

// Event listener para el botón de iniciar juego
startButton.addEventListener('click', startGame);

// Ejemplo de usuarios predefinidos
const exampleUsers = [
    {
        username: 'usuario1',
        score: 100,
        time: '01:30',
        jugando: 0
    },
    {
        username: 'usuario2',
        score: 150,
        time: '02:00',
        jugando: 0
    }
];

// Guardar usuarios predefinidos en localStorage
localStorage.setItem('usersData', JSON.stringify(exampleUsers));




