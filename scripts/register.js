
let registerInputFirstname = document.getElementById("registerInputFirstname");
let registerInputLastname = document.getElementById("registerInputLastname");
let registerInputEmail = document.getElementById("registerInputEmail");
let registerInputPhone = document.getElementById("registerInputPhone");
let registerInputPassword = document.getElementById("registerInputPwd");
let registerButton = document.getElementById("registerButton");


const baseApi = "http://ecommerce.reworkstaging.name.ng/v2";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
let validate = {
    first_name: false,
    last_name: false,
    email: false,
    phone_number: false,
    password: false,
};
async function inputValidation() {
    let firstName = registerInputFirstname.value.trim()
    let lastName = registerInputLastname.value.trim()
    let email = registerInputEmail.value.trim()
    let password = registerInputPassword.value.trim()
    let phone = registerInputPhone.value.trim()
    // firstName validation
    if (firstName.length < 2 || firstName.trim() == "") {
        registerInputFirstname.nextElementSibling.innerHTML = "firstname must be at least 2 characters!"

    } else {
        validate.first_name = true;
        registerInputFirstname.nextElementSibling.innerHTML = ""
    }
    // last name validation
    if (lastName.length < 2) {
        registerInputLastname.nextElementSibling.innerHTML = "Last Name must be at least 2 characters!"
    } else {
        validate.last_name = true;
        registerInputLastname.nextElementSibling.innerHTML = ""
    }
    // email validation
    if (!emailRegex.test(email)) {
        registerInputEmail.nextElementSibling.innerHTML = "Invalid Email Address!"
    }
    else if (!email.trim()) {
        registerInputEmail.nextElementSibling.innerHTML = "Email is required!"
    }
    else {
        validate.email = true;
        registerInputEmail.nextElementSibling.innerHTML = ""
    }
    // phone validation
    if (!phone.trim()) {
        registerInputPhone.nextElementSibling.innerHTML = " Phone number is required!"
    } else {
        validate.phone_number = true;
        registerInputPhone.nextElementSibling.innerHTML = ""
    }
    // password validation
    if (!passwordRegex.test(password)) {
        registerInputPassword.nextElementSibling.innerHTML = "Password must be at least 6 characters, including letters and numbers"
    } else {
        validate.password = true;
        registerInputPassword.nextElementSibling.innerHTML = ""
    }

    let isValidated = Object.values(validate).every(v => v === true);
    if (!isValidated) {
        alert("Please fill in all required fields correctly.");
        console.log("Please fill in all required fields correctly.");
    } else {
        // If all validations pass, proceed with registration
        let user_obj = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            password: password
        };
        try {
            let response = await fetch(`${baseApi}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user_obj),
            });
            if (!response.ok) {
                const msg = await response.text();
                console.log("Server error:", msg);
                alert("Registration failed.");
                return;
            }
            const data = await response.json();
            alert("Registration Successful! Please Login.");
            window.location.href = "./Login.html";
        }
        catch (error) {
            console.log(error);
        }
    }


}
registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    inputValidation();

});

