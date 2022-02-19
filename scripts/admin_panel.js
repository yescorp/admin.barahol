var selected_product_type = "clothes";
var categories;

$(document).ready(function(){

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

var materialCount = 2;

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
}

function removeLastMaterial(){
    materialCount--;
    if(materialCount == 1){
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