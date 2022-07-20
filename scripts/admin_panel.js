var selected_product_type = "clothes";
var categories;
var images = [];
var filesUploaded = false;
var fileList;
var page = 1;


function Spinner(){
	Spinner.element=document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	let c=document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	Spinner.element.setAttribute('width','100');
	Spinner.element.setAttribute('height','100');
	c.setAttribute('viewBox','0 0 100 100');
	c.setAttribute('cx','50');
	c.setAttribute('cy','50');
	c.setAttribute('r','42');
	c.setAttribute('stroke-width','16');
	c.setAttribute('stroke','#2196f3');
	c.setAttribute('fill','transparent');
    Spinner.element.classList.add("spinner");
	Spinner.element.appendChild(c);
	$("#white-background").append(Spinner.element)
}
Spinner.id=null;
Spinner.element=null;
Spinner.show=function(){
	const c=264,m=15;
	Spinner.element.style.display='block';
	move1();
	function move1(){
		let i=0,o=0;
		move();
		function move(){
			if(i==c)move2();
			else{
				i+=4;o+=8;
				Spinner.element.setAttribute('stroke-dasharray',i+' '+(c-i));
				Spinner.element.setAttribute('stroke-dashoffset',o)
				Spinner.id=setTimeout(move,m)
			}
		}
	}
	function move2(){
		let i=c,o=c*2;
		move();
		function move(){
			if(i==0)move1();
			else{
				i-=4;o+=4;
				Spinner.element.setAttribute('stroke-dasharray',i+' '+(c-i));
				Spinner.element.setAttribute('stroke-dashoffset',o)
				Spinner.id=setTimeout(move,m)
			}
		}
	}
};
Spinner.hide=function(){
	Spinner.element.style.display='none';
	if(Spinner.id){
		clearTimeout(Spinner.id);
		Spinner.id=null
	}
	Spinner.element.setAttribute('stroke-dasharray','0 264');
	Spinner.element.setAttribute('stroke-dashoffset','0')
};


$(document).ready(function(){
    refreshTokens();

    Spinner();
    Spinner.show();
    
    loadProducts();


    $("#load-more").click(function(){
        page++;
        loadProducts();
    });

    const fileSelector = document.getElementById('select-images');
  fileSelector.addEventListener('change', (event) => {
    $("img").remove();
    fileList = event.target.files;
    console.log(fileList);
    images = [];

    for(let i = 0; i < fileList.length; i++){
        let file = fileList[i];
        if (file.type && !file.type.startsWith('image/')) {
            console.log('File is not an image.', file.type, file);
            continue;
        }
        
        const reader = new FileReader();
    
        reader.addEventListener('load', (event) => {
            

            let img = document.createElement("img");
            img.height = "100";
            img.src = event.target.result;
            $("#product_images_div").append(img);
            console.log(event.target.result);
            images.push(event.target.result.replace(/^(.){0,};base64,/, ""));
            if(images.length > 0){
                filesUploaded = true;
            }

            
        }, false);

        reader.addEventListener('progress', (event) => {
            if (event.loaded && event.total) {
            const percent = (event.loaded / event.total) * 100;
            console.log(`Progress: ${Math.round(percent)}`);
            $("#image-progress").text(`Progress: ${Math.round(percent)}`);
            }
        });
    
        reader.readAsDataURL(file);
    }
  });

  if(sessionStorage.getItem("refreshToken") != null){
    refreshTokens();
  }

    

    $("#show_product_creation_form").click(function(){
        console.log("button clicked");
        $("#product_info").show(); 
        $("#exit_creation").show();
        $("#white-background").show();
        $("#main_body").hide();
    });

    $("#exit_creation").click(function (){
        $("#product_info").hide(); 
        $("#exit_creation").hide();
        $("#white-background").hide();
        $("#main_body").show();
    });

    $("#create_product_submit").click(async function(){
        
        $("#product_info").hide(); 
        $("#exit_creation").hide();
        
        $("#white-background").show();

        if(selected_product_type == "clothes"){
            await createProductClothes();
        }
        else if(selected_product_type == "shoes"){
            await createProductShoes();
        }
        else if (selected_product_type == "accessories"){
            await createProductAccessories();
        }

        $("#white-background").hide();
        $("#main_body").show();

        document.location.reload();
    });

    fetch('/scripts/categories.json')
  .then(response => response.json())
  .then((data) =>{
    categories = data;
    
    $("#subcategory").empty();
    addOthersOption("subcategory");

    for (let i = 0; i < categories["clothes_category"].length; i++){
        addOption("subcategory", categories["clothes_category"][i]);
    }

    $("#product_brand").empty();
    addOthersOption("product_brand");

    for(let i = 0; i < categories["brand"].length; i++){
        addOption("product_brand", categories["brand"][i]);    
    }

    $("#manufacturer").empty();

    for(let i = 0; i < categories["countries"].length; i++){
        let option = document.createElement("option");
        option.value = categories["country_codes"][i];
        option.text = categories["countries"][i];
        $("#manufacturer").append(option);
    }

    $("#select_shoes_material").empty();
    addOthersOption("select_shoes_material");

    for(let i = 0; i < categories["shoes_material"].length; i++){
        addOption("select_shoes_material", categories["shoes_material"][i]);
    }

    $("#sport_type").empty();
    addOthersOption("sport_type");

    for(let i = 0; i < categories["sport_type"].length; i++){
        addOption("sport_type", categories["sport_type"][i]);
    }

    $("#select_merch").empty();
    let option = document.createElement("option");
    option.value = "None";
    option.text = option.value;
    $("#select_merch").append(option);
    
    for(let i = 0; i < categories["merch"].length; i++){
        addOption("select_merch", categories["merch"][i]);
    }
  });

  
  $("#shoes_size").hide();
  $("#accessory_size").hide();
  $('#shoes_material').hide();

    $("#clothes_btn").click(function(){
        showClothes();
    });

    $("#accessories_btn").click(function(){
        showAccessories();
    });

    $("#shoes_btn").click(function(){
        showShoes();
    });

    $("#subcategory").change(function(){
        if($(this).val() == "Другое"){
            $("#other_subcategory").show();
        }
        else {
            $("#other_subcategory").hide();
        }
    });

    $("#other_shoes_material").show();
    $("#select_shoes_material").change(function(){
        if($(this).val() == "Другое"){
            $("#other_shoes_material").show();
        }
        else{
            $("#other_shoes_material").hide();
        }
    });

    $("#product_brand").change(function(){
        if($(this).val() == "Другое"){
            $("#other_brand").show();
        }
        else {
            $("#other_brand").hide();
        }
    });

    $("#sport_style_div").hide();

    $("#product_style").change(function(){
        if($(this).val() == "Спортивный"){
            $("#sport_style_div").show();
        }
        else {
            $("#sport_style_div").hide();
        }
    });

    $("#sport_type").change(function(){
        if($(this).val() == "Другое"){
            $("#other_sport_type").show();
        }
        else {
            $("#other_sport_type").hide();
        }
    });
});

var materialCount = 0;

function addMaterial(){
    
    let sel = document.createElement("input");
    sel.id = "clothes_material" + materialCount;
    sel.type = "text";
    sel.placeholder = "Материал";
    var inp = document.createElement("input");
    inp.type = "number";
    inp.id = "clothes_material_percent" + materialCount;
    inp.placeholder = "процентов";

    sel.style = "width:40%";
    inp.style = "width: 40%";
    $("#clothes_material").append(sel);
    
    $("#clothes_material").append(inp);
    materialCount++;
    console.log(materialCount);
}

function removeLastMaterial(){
    materialCount--;
    if(materialCount == -1){
        materialCount++;
        return;
    }
    $("input").remove("#clothes_material_percent" + materialCount);
    $("input").remove("#clothes_material" + materialCount);
    
}

function addOthersOption(id){
    let option = document.createElement("option");
    option.value = "Другое";
    option.text = option.value;
    $("#" + id).append(option);
}

function addOption(id, value){
    let option = document.createElement("option");
    option.value = value;
    option.text = option.value;
    $("#" + id).append(option);
}

function showClothes(){
    $("#shoes_material").hide();
        $("#clothes_material").show();
        $("#accessory_size").hide();
        $("#shoes_size").hide();
        $("#clothes_size").show();
        $("#pattern_div").show();
        selected_product_type = "clothes";
        $("#clothes_btn").addClass("selected_product_type");
        $("#shoes_btn").removeClass("selected_product_type");
        $("#accessories_btn").removeClass("selected_product_type");
        $("#accessory_material_div").hide();

        $("#subcategory").empty();
        addOthersOption("subcategory");

        for (let i = 0; i < categories["clothes_category"].length; i++){
            let option = document.createElement("option");
            option.value = categories["clothes_category"][i];
            option.text = option.value;
            $("#subcategory").append(option);
        }
}

function showAccessories(){
    $("#shoes_material").hide();
    $("#clothes_material").hide();
    $("#accessory_size").show();
    $("#shoes_size").hide();
    $("#clothes_size").hide();
    $("#pattern_div").hide();
    selected_product_type = "accessories";
    $("#accessories_btn").addClass("selected_product_type");
    $("#shoes_btn").removeClass("selected_product_type");
    $("#clothes_btn").removeClass("selected_product_type");
    $("#accessory_material_div").show();

    $("#subcategory").empty();
    addOthersOption("subcategory");

    for (let i = 0; i < categories["accessories_category"].length; i++){
        let option = document.createElement("option");
        option.value = categories["accessories_category"][i];
        option.text = option.value;
        
        $("#subcategory").append(option);
    }
}

function showShoes(){
    $("#shoes_material").show();
    $("#clothes_material").hide();
        $("#accessory_size").hide();
        $("#shoes_size").show();
        $("#clothes_size").hide();
        $("#pattern_div").hide();
        selected_product_type = "shoes";
        $("#shoes_btn").addClass("selected_product_type");
        $("#accessories_btn").removeClass("selected_product_type");
        $("#clothes_btn").removeClass("selected_product_type");
        $("#accessory_material_div").hide();

        $("#subcategory").empty();
        addOthersOption("subcategory");

        for (let i = 0; i < categories["shoes_category"].length; i++){
            let option = document.createElement("option");
            option.value = categories["shoes_category"][i];
            option.text = option.value;
            
            $("#subcategory").append(option); 
        }

}


async function createProductClothes(){

    console.log(filesUploaded);

    if(!filesUploaded){
        return;
    }

    var data = {};

    data["serialNumber"] = $("#serial_number").val();
    console.log("asd");
    data["name"] = $("#product_name").val();
    data["description"] = $("#product_description").val();
    data["category"] = {name: ($("#category_gender").val())};
    data["clothesCategory"] = 
    {name: ($("#subcategory").val() != "Другое" 
    ? $("#subcategory").val() : $("#other_subcategory").val())};

    data["merch"] = {name: $("#select_merch").val()};
    data["season"] = {name: $("#season").val()};
    data["materials"] = [];

    if(materialCount == 0){
        return;
    }

    for(let i = 0; i < materialCount; i++){
        let material = {name: $("#clothes_material" + i).val()};
        data["materials"].push({
            material, 
            percent: parseFloat($("#clothes_material_percent" + i).val())
    });
    }

    data["color"] = {
        name: $("#product_color").val(),
        hexCode: $("#color_hex").val()

    };

    data["availableSizes"] = [];

    let clothes_size_checkboxes = $(".clothes_size_checkbox:checked");
    for (let i = 0; i < clothes_size_checkboxes.length; i++){
        data["availableSizes"].push({
            size: {americanSize: clothes_size_checkboxes[i].value,
            russianSize: "none"
            }
        });
    }   
    
    data["maxSeriesCount"] = parseInt($("#max_series_count").val(), 10);
    
    data["brand"] = {};

    let brand = $("#product_brand").val();
    let manufacturer = $("#manufacturer").val();

    if(brand == "Другое"){
        data["brand"]["name"] = $("#other_brand").val();
    }
    else {
        data["brand"]["name"] = brand;
    }

    data["brand"]["madeIn"] = manufacturer;

    data["price"] = parseFloat($("#product_base_price").val() + ".0");
    data["salesPrice"] = parseFloat($("#product_sales_price").val() + ".0");


    data["endDate"] = $("#expiration_date").val() + "T00:00:00";

    data["style"] = $("#product_style").val();

    if(data["style"] == "Спортивный"){
        data["sportType"] = {
            name: $("#sport_type").val() != "Другое" ? $("#sport_type").val() : $("#other_sport_type").val() 
        };
    }
    else {
        data["sportType"] = {name: "none"};
    }

    data["pattern"] = {
        name: $("#product_pattern").val() 
    };

    data["images"] = [];

    for(let i  = 0; i < images.length; i++){

        let frmt = "png";

        if(images[i].includes("png")){
            frmt = "png";
        }
        else if(images[i].includes("jpg") || images[i].includes("jpeg")){
            frmt = "jpg";
        }

        data["images"].push({
            imageData: images[i],
            format: frmt
        });
    }

    console.log(images);

    console.log(data);
    console.log(JSON.stringify(data));

    $("#white-background").show();
    
    let response = await fetch("https://api.barahol.kz/product/add/clothes",
    {
        method: "POST",
        headers:
            {
                "Accept": "application/json; charset=utf-8",
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": "Bearer " + sessionStorage.getItem("accessToken")
            },
        redirect: "follow",
        body: JSON.stringify(data)
    });

    
    $("#white-background").hide();

    console.log(response.status);

    if(response.status == 200){
        alert("Успех");
    }
    else if(response.status == 401){
        refreshTokens();
        createProductClothes();
        return;
    }
    else {
        alert("Отправьте скриншот этого сообщения Естаю \n\n" + response.status + " " + response.statusText + "\n" + JSON.stringify(data));
    }
}

async function createProductShoes(){
    console.log("Creating shoes product");
    console.log(filesUploaded);

    if(!filesUploaded){
        return;
    }

    var data = {};

    data["serialNumber"] = $("#serial_number").val();
    data["name"] = $("#product_name").val();
    data["description"] = $("#product_description").val();
    data["category"] = {name: ($("#category_gender").val())};
    data["shoesCategory"] = 
    {name: ($("#subcategory").val() != "Другое" 
    ? $("#subcategory").val() : $("#other_subcategory").val())};

    data["merch"] = {name: $("#select_merch").val()};
    data["season"] = {name: $("#season").val()};
    data["material"] = {
        name: (
            $("#select_shoes_material").val() == "Другое" ? 
            $("#other_shoes_material").val() 
            : $("#select_shoes_material").val()
        )};

    data["color"] = {
        name: $("#product_color").val(),
        hexCode: $("#color_hex").val()

    };

    data["availableSizes"] = [];

    let shoesSizeFrom = parseFloat($("#shoes_size_from").val());
    let shoesSizeTo = parseFloat($("#shoes_size_to").val());
    let interval = parseInt($("#shoes_size_interval").val());

    for (let i = shoesSizeFrom; i <= shoesSizeTo; i += interval){
        data["availableSizes"].push({
            shoesSize: {size: (i + "")}
        });
    }
    
    data["maxSeriesCount"] = parseInt($("#max_series_count").val(), 10);
    
    data["brand"] = {};

    let brand = $("#product_brand").val();
    let manufacturer = $("#manufacturer").val();

    if(brand == "Другое"){
        data["brand"]["name"] = $("#other_brand").val();
    }
    else {
        data["brand"]["name"] = brand;
    }

    data["brand"]["madeIn"] = manufacturer;

    data["price"] = parseFloat($("#product_base_price").val() + ".0");
    data["salesPrice"] = parseFloat($("#product_sales_price").val() + ".0");

    data["endDate"] = $("#expiration_date").val() + "T00:00:00";

    data["style"] = $("#product_style").val();

    if(data["style"] == "Спортивный"){
        data["sportType"] = {
            name: $("#sport_type").val() != "Другое" ? $("#sport_type").val() : $("#other_sport_type").val() 
        };
    }
    else {
        data["sportType"] = {name: "none"};
    }

    data["images"] = [];

    for(let i  = 0; i < images.length; i++){

        let frmt = "png";

        if(images[i].includes("png")){
            frmt = "png";
        }
        else if(images[i].includes("jpg") || images[i].includes("jpeg")){
            frmt = "jpg";
        }

        data["images"].push({
            imageData: images[i],
            format: frmt
        });
    }

    console.log(images);

    console.log(data);
    console.log(JSON.stringify(data));

    let response = await fetch("https://api.barahol.kz/product/add/shoes",
    {
        method: "POST",
        headers:
            {
                "Accept": "application/json; charset=utf-8",
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": "Bearer " + sessionStorage.getItem("accessToken")
            },
        redirect: "follow",
        body: JSON.stringify(data)
    });

    $("#white-background").hide();

    console.log(response.status);

    if(response.status == 200){
        alert("Успех");
    }
    else if(response.status == 401){
        refreshTokens();
        createProductShoes();
        return;
    }
    else {
        alert("Отправьте скриншот этого сообщения Естаю \n\n" + response.status + " " + response.statusText + "\n" + JSON.stringify(data));
    }
}

async function createProductAccessories(){
    console.log("Creating accessory product");
    console.log(filesUploaded);

    if(!filesUploaded){
        return;
    }

    var data = {};

    data["serialNumber"] = $("#serial_number").val();
    data["name"] = $("#product_name").val();
    data["description"] = $("#product_description").val();
    data["category"] = {name: ($("#category_gender").val())};
    data["accessoryCategory"] = 
    {name: ($("#subcategory").val() != "Другое" 
    ? $("#subcategory").val() : $("#other_subcategory").val())};

    data["merch"] = {name: $("#select_merch").val()};
    data["season"] = {name: $("#season").val()};
    data["AccessoryMaterial"] = {
        name: (
            $("#accessory_material").val()
        )};

    data["color"] = {
        name: $("#product_color").val(),
        hexCode: $("#color_hex").val()

    };

    data["availableSizes"] = [];

    let shoesSizeFrom = parseFloat($("#shoes_size_from").val());
    let shoesSizeTo = parseFloat($("#shoes_size_to").val());

    for (let i = shoesSizeFrom; i < shoesSizeTo; i += 0.5){
        data["availableSizes"].push({
            shoesSize: {size: (i + "")}
        });
    }
    
    data["maxSeriesCount"] = parseInt($("#max_series_count").val(), 10);
    
    data["brand"] = {};

    let brand = $("#product_brand").val();
    let manufacturer = $("#manufacturer").val();

    if(brand == "Другое"){
        data["brand"]["name"] = $("#other_brand").val();
    }
    else {
        data["brand"]["name"] = brand;
    }

    data["brand"]["madeIn"] = manufacturer;

    data["price"] = parseFloat($("#product_base_price").val() + ".0");
    data["salesPrice"] = parseFloat($("#product_sales_price").val() + ".0");

    data["endDate"] = $("#expiration_date").val() + "T00:00:00";

    data["style"] = $("#product_style").val();

    if(data["style"] == "Спортивный"){
        data["sportType"] = {
            name: $("#sport_type").val() != "Другое" ? $("#sport_type").val() : $("#other_sport_type").val() 
        };
    }
    else {
        data["sportType"] = {name: "none"};
    }

    data["images"] = [];

    for(let i  = 0; i < images.length; i++){

        let frmt = "png";

        if(images[i].includes("png")){
            frmt = "png";
        }
        else if(images[i].includes("jpg") || images[i].includes("jpeg")){
            frmt = "jpg";
        }

        data["images"].push({
            imageData: images[i],
            format: frmt
        });
    }

    console.log(images);

    console.log(data);
    console.log(JSON.stringify(data));

    $("#white-background").show();

    let response = await fetch("https://api.barahol.kz/product/add/accessories",
    {
        method: "POST",
        headers:
            {
                "Accept": "application/json; charset=utf-8",
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": "Bearer " + sessionStorage.getItem("accessToken")
            },
        redirect: "follow",
        body: JSON.stringify(data)
    });

    $("#white-background").hide();

    console.log(response.status);

    if(response.status == 200){
        alert("Успех");
    }
    else if(response.status == 401){
        refreshTokens();
        createProductAccessories();
        return;
    }
    else {
        alert("Отправьте скриншот этого сообщения Естаю \n\n" + response.status + " " + response.statusText + "\n" + JSON.stringify(data));
    }
}

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
}

async function refreshTokens(){

    let checkToken = await fetch("https://api.barahol.kz/account/info", {
    method: "POST",
        headers: {
            "Accept": "application/json; charset=utf-8",
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + sessionStorage.getItem("accessToken")
        }
    });

    if(checkToken.status == 200){
        console.log("Tokens are valid");
        $("#main_body").show();
        $("#login_form").hide();
        return;
    }

    let newTokensResponse = await fetch("https://api.barahol.kz/account/token/refresh",
    {
        method: "POST",
        headers: {
            "Accept": "application/json; charset=utf-8",
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + sessionStorage.getItem("accessToken")
        },
        body: JSON.stringify({"refreshToken": sessionStorage.getItem("refreshToken")})
    });

    if(newTokensResponse.status == 200){
        let newTokens = await newTokensResponse.json();
        sessionStorage.setItem("accessToken", newTokens["accessToken"]);
        sessionStorage.setItem("refreshToken", newTokens["refreshToken"]);
        console.log("refreshed tokens");
        $("#main_body").show();
        $("#login_form").hide();
    }
}



async function loadProducts(){


    $("#white-background").show();

    let result = await fetch("https://api.barahol.kz/admin/product/get-ordered?page=" + page + "&limit=10", {
        method: "GET",
            headers:
        {
            "Accept": "application/json; charset=utf-8",
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + sessionStorage.getItem("accessToken")
        }
    });

    if(result.status != 200){
        
        return;
    }

    let products_data = await result.json();

    console.log(products_data);

    for(let i =0; i < products_data["products"].length; i++){

        console.log(products_data["products"][i]["productId"]);
        
        let div = document.createElement("div");
        div.classList.add("product");

        let img = document.createElement("img");

        img.src = "https://barahol.kz/ProductImages/" + products_data["products"][i]["productImages"][0]["imageSource"];
        
        console.log(img.src);
        img.alt = "asd";
        img.width = "100";
 
        div.appendChild(img);

        let description = document.createElement("div");

        div.appendChild(description);

        let product_name = document.createElement("p");
        product_name.textContent = "name: " + products_data["products"][i]["productName"];

        
        let price = document.createElement("p");
        price.textContent = "price: " + products_data["products"][i]["salesPrice"];

        description.appendChild(product_name);

        description.appendChild(price);
        $("#products").append(div);
        div.addEventListener("click", function(){
            window.location = "/orders.html?productId=" + products_data["products"][i]["productId"];
        });
    }

    if(products_data["products"].length > 0){
        page++;
        console.log(page);
    }
     
    $("#white-background").hide();
}