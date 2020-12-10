function checkPswd() {
    var confirmPassword = "guess";
    var password = document.getElementById("pswd").value;
    if (password == confirmPassword) {
         window.location="welcome.html";
    }
    else{
        alert("Wrong.");
    }
}