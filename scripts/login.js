
$(document).ready(function (){
    $("#loginX").click(function(){
        loginEmail();
    });
});

async function loginEmail() {
    var email = $("#typeEmailX").val();
    var password = $("#typePasswordX").val();
    
    var data = {Identity: email, Password: password};

    console.log(data);

    var response = await fetch('https://api.barahol.kz/account/login/email', {
                    method: 'POST',
                    redirect: 'follow',
                    headers: {
                        "Accept": "application/json; charset=utf-8",
                        "Content-Type": "application/json;charset=utf-8",
                      },
                    body: JSON.stringify(data)
                });


    if(response.status != 200){
        return;
    } else{
        var responseData = (await response.json());
    console.log(responseData);
    console.log(response.status);

    console.log(email + " " + password);
    
    sessionStorage.setItem("refreshToken", responseData["refreshToken"]);
    sessionStorage.setItem("accessToken", responseData["accessToken"]);

    window.location = "/products.html";
}
}