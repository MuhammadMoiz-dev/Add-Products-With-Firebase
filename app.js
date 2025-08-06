import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBZ3Ql-zA-gJwBOdIItHCrLHavb5WW3llA",
    authDomain: "authentication-ed98a.firebaseapp.com",
    projectId: "authentication-ed98a",
    storageBucket: "authentication-ed98a.appspot.com",
    messagingSenderId: "924619811941",
    appId: "1:924619811941:web:7b0b173e922fe76e0d6a8c",
    measurementId: "G-3NL434M9X5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Ready
document.addEventListener("DOMContentLoaded", async () => {
    // ✅ SIGNUP
    const getsbtn = document.getElementById("sbtn");
    if (getsbtn) {
        getsbtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const email = document.getElementById("semail").value.trim();
            const password = document.getElementById("spassword").value.trim();

            if (email && password) {
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                    Swal.fire({ title: "Signup Successful", icon: "success" }).then(() => {
                        window.location.href = "./login.html";
                    });
                } catch (err) {
                    Swal.fire({ title: err.message, icon: "error" });
                }
            } else {
                Swal.fire({ title: "Please enter email and password", icon: "error" });
            }
        });
    }

    // ✅ LOGIN
    const lbtn = document.getElementById("lbtn");
    if (lbtn) {
        lbtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const email = document.getElementById("lemail").value.trim();
            const password = document.getElementById("lpassword").value.trim();

            if (email && password) {
                try {
                    await signInWithEmailAndPassword(auth, email, password);
                    localStorage.setItem('login', true);
                    Swal.fire({ title: "Login Successful", icon: "success" }).then(() => {
                        window.location.href = "./index.html";
                    });
                } catch (err) {
                    Swal.fire({ title: err.message, icon: "error" });
                }
            } else {
                Swal.fire({ title: "Please enter email and password", icon: "error" });
            }
        });
    }

    // ✅ GOOGLE LOGIN
    const googleBtn = document.getElementById("googleBtn");
    if (googleBtn) {
        googleBtn.addEventListener("click", async () => {
            try {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(auth, provider);
                localStorage.setItem("login", true);
                Swal.fire({ title: "Google Login Successful", icon: "success" }).then(() => {
                    window.location.href = "./index.html";
                });
            } catch (err) {
                Swal.fire({ title: err.code, icon: "error" });
            }
        });
    }

    // ✅ ADD PRODUCT
    const addproduct = document.getElementById("addproduct");
    if (addproduct) {
        addproduct.addEventListener("click", async () => {
            const productNameInput = document.getElementById("productName");
            const productDetailInput = document.getElementById("productDetail");
            const ImageurlInput = document.getElementById("Imageurl");
            const productPriceInput = document.getElementById("productPrice");

            const productName = productNameInput.value.trim();
            const productDetail = productDetailInput.value.trim();
            const Imageurl = ImageurlInput.value.trim();
            const productPrice = productPriceInput.value.trim();

            if (productName && productDetail && Imageurl && productPrice) {
                try {
                    await addDoc(collection(db, "addproduct"), {
                        productName,
                        productDetail,
                        Imageurl,
                        productPrice,
                    });
                    Swal.fire({ title: "Product added", icon: "success" })
                    .then(()=>{
                        location.reload();
                    })

                    // Clear form inputs
                    productNameInput.value = '';
                    productDetailInput.value = '';
                    ImageurlInput.value = '';
                    productPriceInput.value = '';
                } catch (e) {
                    Swal.fire({ title: "Error adding product: " + e, icon: "error" });
                }
            } else {
                Swal.fire({ title: 'Please fill all fields', icon: "error" });
            }
        });
    }

    // ✅ FETCH PRODUCTS
    const productContainer = document.getElementById('productContainer');
    const noProduct = document.getElementById('noproduct');

    if (productContainer && noProduct) {
        try {
            const querySnapshot = await getDocs(collection(db, "addproduct"));

            if (querySnapshot.empty) {
                noProduct.style.display = 'flex';
                noProduct.innerHTML = '<h1 class="text-red-600 font-bold text-5xl">No Product Found</h1>';
            } else {
                noProduct.style.display = 'none';
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    productContainer.innerHTML += `
                        <div class="bg-white p-4 shadow rounded border-2 border-black mb-4">
                            <h3 class="text-xl font-bold">${data.productName}</h3>
                            <p>${data.productDetail}</p>
                            <img src="${data.Imageurl}" alt="Product Image" class="w-40 h-40 object-cover mt-2">
                            <p class="text-green-700 font-bold mt-2">Price: $${data.productPrice}</p>
                        </div>
                    `;
                });
            }
        } catch (e) {
            console.error("Error fetching products: ", e);
        }
    }

    // ✅ POPUP FORM
    const openFormBtn = document.getElementById("openFormBtn");
    const popupForm = document.getElementById("popupForm");
    const cancelBtn = document.getElementById("cencel");

    if (openFormBtn && popupForm) {
        openFormBtn.addEventListener("click", () => {
            popupForm.style.display = "flex";
        });
    }

    if (cancelBtn && popupForm) {
        cancelBtn.addEventListener("click", () => {
            popupForm.style.display = "none";
        });
    }

    // ✅ LOGIN CHECK & REDIRECT
    const checkauth = localStorage.getItem("login");
    const currentPage = window.location.pathname;

    if (!checkauth && currentPage.includes("index.html")) {
        window.location.href = "./signup.html";
    } else if (checkauth && currentPage.includes("signup.html")) {
        window.location.href = "./index.html";
    }
});
