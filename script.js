document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const logoutButton = document.getElementById('logout-button');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const commentsSection = document.getElementById('comments-section');
    const commentBox = document.getElementById('comment-box');
    const submitComment = document.getElementById('submit-comment');
    const commentsList = document.getElementById('comments-list');

    // Verificar si hay usuario activo
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        commentsSection.style.display = 'block';
        loadComments();
    }

    // Mostrar modales
    loginButton.addEventListener('click', () => loginModal.style.display = 'flex');
    registerButton.addEventListener('click', () => registerModal.style.display = 'flex');

    // Cerrar modales
    document.getElementById('close-login').addEventListener('click', () => loginModal.style.display = 'none');
    document.getElementById('close-register').addEventListener('click', () => registerModal.style.display = 'none');

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) loginModal.style.display = 'none';
        if (event.target === registerModal) registerModal.style.display = 'none';
    });

    // Registro de usuario
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;

        if (newUsername && newPassword) {
            localStorage.setItem(newUsername, JSON.stringify({ password: newPassword, comments: [] }));
            alert('Usuario registrado correctamente.');
            registerModal.style.display = 'none';
        }
    });

    // Inicio de sesión
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const storedUser = localStorage.getItem(username);

        if (storedUser && JSON.parse(storedUser).password === password) {
            alert(`Bienvenido, ${username}!`);
            localStorage.setItem('currentUser', username);
            loginButton.style.display = 'none';
            registerButton.style.display = 'none';
            commentsSection.style.display = 'block';
            loginModal.style.display = 'none';
            loadComments();
        } else {
            alert('Usuario o contraseña incorrecta.');
        }
    });

    // Cierre de sesión
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        loginButton.style.display = 'block';
        registerButton.style.display = 'block';
        commentsSection.style.display = 'none';
        alert('Sesión cerrada correctamente.');
    });

    // Función para cargar comentarios guardados
    function loadComments() {
        let allComments = JSON.parse(localStorage.getItem("comments")) || [];
        commentsList.innerHTML = "";

        allComments.forEach(comment => {
            const commentElement = document.createElement("p");
            commentElement.innerHTML = `<strong>${comment.user}:</strong> ${comment.text}`;
            commentsList.appendChild(commentElement);
        });
    }

    // Función para guardar y mostrar comentarios
    submitComment.addEventListener('click', () => {
        if (!localStorage.getItem('currentUser')) {
            alert("Debes iniciar sesión para comentar.");
            return;
        }

        const commentText = commentBox.value.trim();
        if (commentText === "") {
            alert("El comentario no puede estar vacío.");
            return;
        }

        let allComments = JSON.parse(localStorage.getItem("comments")) || [];
        allComments.push({ user: localStorage.getItem('currentUser'), text: commentText });

        localStorage.setItem("comments", JSON.stringify(allComments));
        commentBox.value = "";
        loadComments();
    });
});