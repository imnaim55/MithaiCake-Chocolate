// Hamburger close script start //

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// Hamburger close script end //


// slider banner script start // 

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1;
    }
    
    if (n < 1) {
        slideIndex = slides.length;
    }

    Array.from(slides).forEach(slide => {
        slide.style.display = "none";
    });
    Array.from(dots).forEach(dot => {
        dot.className = dot.className.replace(" active", "");
    });

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

setInterval(() => {
    plusSlides(1);
}, 4500);

// slider banner script end // 


//admin login script start//

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        console.log("Username: ", username);
        console.log("Password: ", password);

        if (username === 'admin123' && password === 'naim123') {
            console.log("Redirecting to adminpanel.html...");
            window.location.href = 'adminpanel.html';s
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
});

//admin login script end //


//checkout script start //

document.addEventListener('DOMContentLoaded', function () {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    document.getElementById('cartTotalFinal').textContent = `₹${total}`;

    const paymentForm = document.getElementById('paymentForm');
    const paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');
    const cardDetails = document.getElementById('cardDetails');
    const upiDetails = document.getElementById('upiDetails');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const detectLocationButton = document.getElementById('detectLocationButton');
    const gpsAddress = document.getElementById('gpsAddress');
    const addressInput = document.getElementById('addressInput');

    detectLocationButton.addEventListener('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`;

                fetch(geocodeUrl)
                    .then(response => response.json())
                    .then(data => {
                        const address = data.results[0].formatted_address;
                        gpsAddress.textContent = `Detected Address: ${address}`;
                        addressInput.value = address;
                    })
                    .catch(error => {
                        console.error('Error fetching GPS address:', error);
                        gpsAddress.textContent = 'Error detecting location';
                    });
            }, function (error) {
                gpsAddress.textContent = 'Error: GPS access denied.';
            });
        } else {
            gpsAddress.textContent = 'Geolocation is not supported by this browser.';
        }
    });

    function generateUPIQRCode() {
        const upiID = "9874984121@ptsbi";
        const amount = total;
        const name = "Mithai Cake & Chocolate";
        const upiString = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR`;

        qrCodeContainer.innerHTML = "";
        QRCode.toCanvas(upiString, { errorCorrectionLevel: 'H' }, function (error, canvas) {
            if (error) {
                console.error("Error generating QR Code:", error);
                alert("Error generating QR Code. Please try again.");
            } else {
                qrCodeContainer.appendChild(canvas);
            }
        });
    }

    paymentMethodInputs.forEach(input => {
        input.addEventListener('change', function () {
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
                upiDetails.style.display = 'none';
            } else if (this.value === 'upi') {
                cardDetails.style.display = 'none';
                upiDetails.style.display = 'block';
                generateUPIQRCode();
            } else {
                cardDetails.style.display = 'none';
                upiDetails.style.display = 'none';
            }
        });
    });

    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        const address = addressInput.value.trim();

        if (!address) {
            alert('Please enter your delivery address or use the GPS to detect it.');
            return;
        }

        if (selectedPaymentMethod === 'card') {
            const cardName = document.getElementById('cardName').value;
            const cardNumber = document.getElementById('cardNumber').value;
            const expDate = document.getElementById('expDate').value;
            const cvv = document.getElementById('cvv').value;

            if (!cardName || !cardNumber || !expDate || !cvv) {
                alert('Please fill out all card details.');
                return;
            }

            alert('Payment successful with card!');
        } else if (selectedPaymentMethod === 'upi') {
            alert('Scan the QR code with your UPI app to complete the payment.');
        } else {
            alert('Payment successful with Cash on Delivery!');
        }

        localStorage.removeItem('cartItems');
        window.location.href = "thankyou.html";
    });
});

//checkout script end //


// user login script start //

document.addEventListener('DOMContentLoaded', function () {
    const profilePictureInput = document.getElementById('profilePictureInput');
    const profilePicture = document.getElementById('profilePicture');
    const mobileVerifyBtn = document.getElementById('mobileVerifyBtn');
    const emailVerifyBtn = document.getElementById('emailVerifyBtn');
    const verificationSection = document.getElementById('verificationSection');

    profilePicture.addEventListener('click', function () {
        profilePictureInput.click();
    });

    profilePictureInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicture.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    mobileVerifyBtn.addEventListener('click', function () {
        alert("Mobile verification code sent!");
        verificationSection.style.display = 'block';
    });

    emailVerifyBtn.addEventListener('click', function () {
        alert("Email verification code sent!");
        verificationSection.style.display = 'block';
    });

    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault();
        alert("Registration Successful!");
    });
});

// user login script end //