var selected_product_type = "clothes";
var categories;
var images = [];
var fileList;

$(document).ready(function(){

    const fileSelector = document.getElementById('select-images');
  fileSelector.addEventListener('change', (event) => {
    fileList = event.target.files;
    console.log(fileList);
  });

    $("#loginX").click(function(){
        loginEmail();
    });

    $("#create_product_submit").click(function(){
        
        if(selected_product_type == "clothes"){
            createProductClothes();
        }
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

        $("#subcategory").empty();
        addOthersOption("subcategory");

        for (let i = 0; i < categories["shoes_category"].length; i++){
            let option = document.createElement("option");
            option.value = categories["shoes_category"][i];
            option.text = option.value;
            
            $("#subcategory").append(option); 
        }

}

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
    
    localStorage.setItem("refreshToken", responseData["refreshToken"]);
    localStorage.setItem("accessToken", responseData["accessToken"]);

    $("#product_info").show();
    $("#login_form").hide();

    let testData = {
        "serialNumber": "фыв",
        "name": "test2",
        "description": "testDescription",
        "category": {
            "name": "testCategory"
        },
        "clothesCategory": {"name": "T-Shirt"},
        "merch": {
            "name": "testMerch"
        },
        "season": {"name": "summer"},
        "materials": [
            {
                "material": {"name":"testMaterial1"},
                "percent": 0.23
            },
            {
                "material": {"name": "testMaterial2"},
                "percent": 0.43
            }
        ],
        "color": {
            "name": "testColor",
            "hexCode": "#4566ff"
        },
        "availableSizes": [
            {
                "size": {
                    "americanSize": "amsz",
                    "russianSize": "rusz"
                }
            }
        ],
        "maxSeriesCount": 10,
        "brand": {
            "name": "testBrand",
            "madeIn": "CH"
        },
        "price": 100.01,
        "salesPrice": 33.44,
        "endDate": "2022-03-08T00:00:00",
        "style": "testStyle",
        "sportType": {
            "name": "testSport"
        },
        "pattern": {
            "name": "testPattenr"
        },
        "images": [
            "64base string"
        ]
    };

    console.log(JSON.stringify(testData));

    let response2 = await fetch("https://api.barahol.kz/product/add/clothes",
    {
        method: "POST",
        headers:
            {
                "Accept": "application/json; charset=utf-8",
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
        redirect: "follow",
        body: JSON.stringify(testData)
    });

    console.log(response2.status);
    

}
}

async function createProductClothes(){
    images = [];
    
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
            percent: parseFloat("0." + $("#clothes_material_percent" + i).val())
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

    data["price"] = parseFloat($("#product_base_price").val() + ".05");
    data["salesPrice"] = parseFloat($("#product_sales_price").val() + ".05");


    data["endDate"] = $("#expiration_date").val() + "T00:00:00";

    data["style"] = $("#product_style").val();

    if(data["style"] == "Спортивный"){
        data["sportType"] = {
            name: $("#sport_type").val() != "Другое" ? $("#sport_type").val() : $("#other_sport_type").val() 
        };
    }

    data["pattern"] = {
        name: $("#product_pattern").val() 
    };


    for(let i = 0; i < fileList.length; i++){
        let file = fileList[i];
        if (file.type && !file.type.startsWith('image/')) {
            console.log('File is not an image.', file.type, file);
            continue;
          }
        
          const reader = new FileReader();
      
          reader.addEventListener('load', (event) => {
            images.push(event.target.result.replace(/^data:image\/(png|jpg);base64,/, ""));
            data["images"] = images;
          });

          reader.addEventListener('progress', (event) => {
            if (event.loaded && event.total) {
              const percent = (event.loaded / event.total) * 100;
              console.log(`Progress: ${Math.round(percent)}`);
              $("#image-progress").text(`Progress: ${Math.round(percent)}`);
            }
          });
      
          reader.readAsDataURL(file);
    }

    

    console.log(images);

    console.log(data);
    console.log(JSON.stringify(data));

    let response = await fetch("https://api.barahol.kz/product/add/clothes",
    {
        method: "POST",
        headers:
            {
                "Accept": "application/json; charset=utf-8",
                "Content-Type": "application/json;charset=utf-8",
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
        redirect: "follow",
        body: JSON.stringify(data)
    });
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

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}