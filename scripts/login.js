


let email_input = document.getElementById("mail");
let password_input = document.getElementById("pwd");
let login_btn = document.getElementById("loginBtn");
const baseApi = "http://ecommerce.reworkstaging.name.ng/v2";

login_btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let email = email_input.value.trim();
    let password = password_input.value.trim();
    if (email_input.value == "" || password_input.value == "") {
        alert("all fields required.");
        return;
    }

    try {
        let response = await fetch(`${baseApi}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        if (!response.ok) {
            const msg = await response.text();
            console.log("Server error:", msg);
            alert("logIn failed.");
            return;
        } else {
            let data = await response.json();
            let UserDetails = {
                user_id: data.id,
                user_email: data.email,
                user_first_name: data.first_name,
                user_last_name: data.last_name
            }
            console.log(data.password)

            if (data.email && data.id) {
                localStorage.setItem("My_User", JSON.stringify(UserDetails));
                alert("logged in successfully");
                window.location.href = "../index.html";
            } else {
                alert("invalid username or password")
            }
        }
    } catch (error) {
        console.log(error);
    }
});