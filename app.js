
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyBZ3Ql-zA-gJwBOdIItHCrLHavb5WW3llA",
    authDomain: "authentication-ed98a.firebaseapp.com",
    projectId: "authentication-ed98a",
    storageBucket: "authentication-ed98a.firebasestorage.app",
    messagingSenderId: "924619811941",
    appId: "1:924619811941:web:7b0b173e922fe76e0d6a8c",
    measurementId: "G-3NL434M9X5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


let getsbtn = document.querySelector("#sbtn");
if (getsbtn) {
    getsbtn.addEventListener('click', (event) => {
        event.preventDefault();
        let email = document.getElementById("semail").value.trim();
        let password = document.getElementById("spassword").value.trim();

        if (email && password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    Swal.fire({
                        title: "Signup Successful",
                        icon: "success",
                        draggable: true
                    }).then(() => {

                        window.location.href = './login.html';
                    })
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    Swal.fire({
                        title: errorMessage,
                        icon: "error",
                        draggable: true
                    });
                });
        } else {
            Swal.fire({
                title: 'Please provide both email and password.',
                icon: "error",
                draggable: true
            });
        }
    });
}

let lbtn = document.getElementById('lbtn');
if (lbtn) {
    lbtn.addEventListener('click', (event) => {
        event.preventDefault();
        let email = document.getElementById("lemail").value.trim();
        let password = document.getElementById("lpassword").value.trim();

        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    Swal.fire({
                        title: 'Login Successful',
                        icon: "success",
                        draggable: true
                    }).then(() => {

                        window.location.href = './index.html';
                    })
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    Swal.fire({
                        title: errorMessage,
                        icon: "error",
                        draggable: true
                    });
                });
        } else {

            Swal.fire({
                title: 'Please provide both email and password.',
                icon: "error",
                draggable: true
            });
        }
    });
}


let googleBtn = document.getElementById('googleBtn');
if (googleBtn) {
    googleBtn.addEventListener('click', () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                Swal.fire({
                    title: 'Login with Google Successful',
                    icon: "success",
                    draggable: true
                }).then(() => {
                    localStorage.setItem('login')
                }).then(() => {
                    window.location.href = './index.html';
                })
            })
            .catch((error) => {
                Swal.fire({
                    title: error.code,
                    icon: "error",
                    draggable: true
                });
            });
    });
}



let addproduct = document.getElementById('addproduct')

addproduct.addEventListener('click', async () => {
    let productName = document.getElementById('productName').value
    let productDetail = document.getElementById('productDetail').value
    let Imageurl = document.getElementById('Imageurl').value
    let productPrice = document.getElementById('productPrice').value
    try {
        const docRef = await addDoc(collection(db, "addproduct"), {
            productName,
            productDetail,
            Imageurl,
            productPrice
        });
        Swal.fire({
            title: "Document written successfully ",
            icon: "success",
            draggable: true
        });
    } catch (e) {
        Swal.fire({
            title: "Error adding document: " + e,
            icon: "error",
            draggable: true
        });
    }

})



document.getElementById('openFormBtn').addEventListener('click', () => {
    document.getElementById('popupForm').style.display = 'flex'

})
document.getElementById('cencel').addEventListener('click', () => {
    document.getElementById('popupForm').style.display = 'hidden'

})


let checkauth = localStorage.getItem('login')
if (checkauth) {
    window.location.href = './index.html'
} else {
    window.location.href = './signup.html'

}