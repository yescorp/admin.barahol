$(document).ready(function(){
    loadOrdersInfo();
});

async function loadOrdersInfo(){
    await refreshTokens();
    try{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        if(urlParams.get('productId') == null || urlParams.get('productId') == undefined){
            window.location = "/products.html";
            return;
        }

        let result = await fetch("https://api.barahol.kz/admin/order/get-by-product?productId=" + urlParams.get('productId'), {
            method: "GET",
            headers:
                {
                    "Accept": "application/json; charset=utf-8",
                    "Content-Type": "application/json;charset=utf-8",
                    "Authorization": "Bearer " + sessionStorage.getItem("accessToken")
                },
            redirect: "follow"
        });

        let data = await result.json();

        console.log(data);

        let series = [];

        for(let i = 0; i < data.length; i++){ 
            
            let order = document.createElement('div');

            order.classList.add('order');
            
            let p = document.createElement('p');
            p.textContent = "";
            p.textContent += "Заказ №" + data[i]['orderId'];
            p.textContent += "\n";
            p.textContent += "№ Заказа в иоке: " + data[i]['externalOrderId'];
            p.textContent += '\n\n';
            p.textContent += "Размер: " + data[i]['size'];
            p.textContent += '\n\n';
            p.textContent += "Адрес: \n\n" + data[i]['address']['city'] + '\n' + data[i]['address']['mailIndex'] + '\n' + data[i]['address']['physicalAddress'];
            order.appendChild(p);

            if(series.find((e) => e == data[i]['seriesId']) == undefined){
                series.push(data[i]["seriesId"]);
                let seriesDiv = document.createElement('div');
                seriesDiv.id = "series-" + data[i]["seriesId"];
                seriesDiv.classList.add('series');
                seriesDiv.append(order);

                $('#orders').append(seriesDiv);
            }
            else {
                $('#series-' + data[i]['seriesId']).append(order);
            }
        }


    }
    catch(e){
        console.log(e);
        return;
    }
}