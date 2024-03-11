let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let priceInputs = document.querySelectorAll(".price input");
let ui = document.getElementById("ui");

let fileInput = document.getElementById("file");





let mode = "create";
let publicI;


// get image path
// fileInput.addEventListener("change",(event)=>{
//     let selectedFile = event.target.files[0];
//     let fileNAme = selectedFile.name;
//     console.log(fileNAme);
// })
let arrImages ;
fileInput.addEventListener("change",(event)=>{
    reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload =(event)=> {
      
     arrImages = reader.result;

    }

})
 




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
let dataProduct; // data strcture for sorting data 
if(localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product) // data in localStorage must be in string formate 
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
        img:arrImages,
        discount : discount.value,
        total:total.innerHTML,
        // count:count.value,
        category:category.value.toLowerCase()
    }
    //save data in localstorage
    //count to create miltple products


    // let countNum = newProduct.count;
    if(title.value !="" && price.value !="" && category.value != "" ) {
       
            if(mode === "create") {
                dataProduct.push(newProduct);
                showData()
            }
    
            else { 
                dataProduct[publicI] = newProduct;
                // count.style.display = "block";
                submit.innerHTML = "create";
                mode = "create";
                
            }
            clearInputs()
   
       
       
    }
    else {
        window.prompt("Enter Valid Data")
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
    category.value = "" ;



}
//read or display in ui


function showData() {
    getTotal();

    let table = "";
  for(let i = 0 ; i < dataProduct.length;i++) {
       table  += `   <div class="card mt-0" style="width: 18rem;">
       <div class="imageCantainer">  <img id="im" src="${dataProduct[i].img}" class="card-img-top img-thumbnail" alt="..."></div>
      
       <div class="card-body">
         <h3 class="card-title  ">${dataProduct[i].title}</h3> <h3 class="totalPrice">  ${dataProduct[i].total}  L.E</h3>
         <h3 class="card-text mb-3">Cateogry : ${dataProduct[i].category}</h3>
         <a href="#" class="btn  " onClick = "updateData(${i})">update</a>
         <a href="#" class="btn  ms-5" onClick = "deleteData(${i})">delelet</a>
       </div>
     </div>`
    }
    ui.innerHTML = table;
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
                table  += `   <div class="card" style="width: 18rem;">
                <img src="./images/1.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title mb-2 ">${dataProduct[i].title}</h5> <span class="totalPrice">  ${dataProduct[i].total}  L.E</span>
                  <p class="card-text mt-2">Cateogry of this product is ${dataProduct[i].category}</p>
                  <a href="#" class="btn btn-primary" onClick = "updateData(${i})">update</a>
                  <a href="#" class="btn btn-primary ms-5" onClick = "deleteData(${i})">delelet</a>
                </div>
              </div>`
            }
        

    }

    else {
        
            if(dataProduct[i].category.includes(value.toLowerCase())) {
                table  += `   <div class="card" style="width: 18rem;">
                <img src="./images/1.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title mb-2 ">${dataProduct[i].title}</h5> <span class="totalPrice">  ${dataProduct[i].total}  L.E</span>
                  <p class="card-text mt-2">Cateogry of this product is ${dataProduct[i].category}</p>
                  <a href="#" class="btn btn-primary" onClick = "updateData(${i})">update</a>
                  <a href="#" class="btn btn-primary ms-5" onClick = "deleteData(${i})">delelet</a>
                </div>
              </div>`
            }
        

    }
    ui.innerHTML = table;
 }
 
   

}




