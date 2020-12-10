function checkPswd() {
    var confirmPassword = "wario";
    var password = document.getElementById("pswd").value;
    if (password == confirmPassword) {
         window.location="welcome.html";
    }
    else{
        alert("Wrong.");
    }
}