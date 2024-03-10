let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let priceInputs = document.querySelectorAll(".price input");
// let searchBtns = document.querySelectorAll(".searchBtn button") ;

let mode = "create";
let publicI;



priceInputs.forEach((input)=> {
    input.addEventListener("keyup",getTotal)
})

// pric.addEventListener ("keyup",getTotal);

//get total price
function getTotal () {
    if(price.value !="") {
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green"
    }
    else {
        total.innerHTML = "";
        total.style.backgroundColor = "red"
    }

}


//create product
let dataProduct;
if(localStorage.product !=null) {
  dataProduct = JSON.parse(localStorage.product)
}
else {
    dataProduct=[];
}


submit. addEventListener("click",createProduct)
function createProduct () {
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount : discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    //save data in localstorage
    //count to create miltple products


    let countNum = newProduct.count;
    if(title.value !="" && price.value !="" &&category.value != "" ) {
        if(newProduct.count < 100) {
            if(mode === "create") {
                if(countNum > 1) {
                    for(let i = 0 ; i < countNum ; i++) {
            
                        dataProduct.push(newProduct);
                    }
                }
                else {
                    dataProduct.push(newProduct);
            
                }
        
            }
    
            else { 
                dataProduct[publicI] = newProduct;
                count.style.display = "block";
                submit.innerHTML = "create";
                mode = "create"
            }
            clearInputs()
            count.style.color = "white";

    

        }
        else {
            count.style.color = "red";
            
        }
       
    }
    
    
  
    
    localStorage.setItem("product", JSON.stringify(dataProduct)  )



   
    showData() 
}
showData()




// clear inputs



function clearInputs() {
    title.value= "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "" ;



}
//read or display in ui

function showData() {
    getTotal();

    let table = "";
  for(let i = 0 ; i < dataProduct.length;i++) {
       table  += `  <tr>
       <th>${i+1}</th>
       <th>${dataProduct[i].title}</th>
       <th>${dataProduct[i].price}</th>
       <th>${dataProduct[i].taxes}</th>
       <th>${dataProduct[i].ads}</th>
       <th>${dataProduct[i].discount}</th>
       <th>${dataProduct[i].total}</th>
       <th>${dataProduct[i].category}</th>
       <th><button onClick = "updateData(${i})">update</button></th>
       <th><button onClick = "deleteData(${i})">delelt</button></th>
   </tr>`
    }
    document.getElementById("tbody").innerHTML = table;
    let deleltAll = document.getElementById("deleletAll");
    if(dataProduct.length > 0) {
      deleltAll.innerHTML = `
      <button onClick = "deleletAll()">delelet All (${dataProduct.length})</button>
      `
    } 
    else {
        deleltAll.innerHTML = "";
    }
}


//delelet

function deleteData (i) {
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct);
    showData()
}


// delelet All
function deleletAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData()
}





//update
function updateData(i) {
    title.value= dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value =dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    count.style.display = "none"
    category.value = dataProduct[i].category ;
    submit.innerHTML = "update";
    getTotal();
    mode = "update";
    publicI = i;
    scrollTo({
        top:0,
        behavior:"smooth"

    })
    

}


//searchMood


let searchMood = "title"; // default search mood 
function getSearchMood(id) {
    let searchBtn = document.getElementById("search");
   if(id=="searchByTitle") {
    searchMood = "title";
   }
   else {
    searchMood = "category";
   }
   searchBtn.placeholder = `Search By ${searchMood}`;
   searchBtn.value = "";
   showData()
   searchBtn.focus();
  
   

}

// searchFunction
function searchData(value) {
    let table = "";
    for(let i = 0 ; i<dataProduct.length;i++) {
    if(searchMood == "title") {
        
        
            if(dataProduct[i].title.includes(value.toLowerCase())) {
                table  += `  <tr>
                <th>${i}</th>
                <th>${dataProduct[i].title}</th>
                <th>${dataProduct[i].price}</th>
                <th>${dataProduct[i].taxes}</th>
                <th>${dataProduct[i].ads}</th>
                <th>${dataProduct[i].discount}</th>
                <th>${dataProduct[i].total}</th>
                <th>${dataProduct[i].category}</th>
                <th><button onClick = "updateData(${i})">update</button></th>
                <th><button onClick = "deleteData(${i})">delelt</button></th>
            </tr>`
            }
        

    }

    else {
        
            if(dataProduct[i].category.includes(value.toLowerCase())) {
                table  += `  <tr>
                <th>${i}</th>
                <th>${dataProduct[i].title}</th>
                <th>${dataProduct[i].price}</th>
                <th>${dataProduct[i].taxes}</th>
                <th>${dataProduct[i].ads}</th>
                <th>${dataProduct[i].discount}</th>
                <th>${dataProduct[i].total}</th>
                <th>${dataProduct[i].category}</th>
                <th><button onClick = "updateData(${i})">update</button></th>
                <th><button onClick = "deleteData(${i})">delelt</button></th>
            </tr>`
            }
        

    }
 }
    document.getElementById("tbody").innerHTML = table;

}




