 // get all elements in html file by using dom object
 
 let title = document.getElementById("title"),
 price = document.getElementById("price"),
 taxes = document.getElementById("taxes"),
 ads = document.getElementById("ads"),
 discount = document.getElementById("discount"),
 total = document.getElementById("total"),
 category = document.getElementById("category"),
 submit = document.getElementById("submit"),
 priceInputs = document.querySelectorAll(".price input"),
 ui = document.getElementById("ui"),
 fileInput = document.getElementById("file");

 let mode = "create",
 publicI,




 products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
// [objects] or []



// get image path to display in html ui 
// input type file is like an array that have all files
// let arrImages ; 
// fileInput.addEventListener("change",(event)=>{
//     reader = new FileReader(); // FileReader class[constrcture function ] for read files from locla folder 
    
//     reader.readAsDataURL(event.target.files[0]);
//     reader.onload =(event)=> {
//      arrImages = event.target.result;
//     }

// })


// apply event keyup for each input in price block
priceInputs.forEach((input)=> {
    input.addEventListener("keyup",getTotal)
})



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
// let dataProduct; // data strcture for sorting data 
// if(localStorage.product != null) {
//   dataProduct = JSON.parse(localStorage.product)  
// }
// else {
//     dataProduct=[];
// }


submit.addEventListener("click",createProduct)
function createProduct () {
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        // img:arrImages,
        discount : discount.value,
        total:total.innerHTML,
        category:category.value.toLowerCase()
    }
    //save data in localstorage
    //count to create miltple products


    
    if(title.value !="" && price.value !="" && category.value != "" ) {
       
            if(mode === "create") {
                products.push(newProduct);
                // showData()
            }
    
            else { 
                products[publicI] = newProduct;
                
                submit.innerHTML = "create";
                mode = "create";
                
            }
            clearInputs()
   
       
       
    }
    else {
        alert("Enter Valid Data");
        return ;
    }
    
//    products.push(dataProduct)
console.log(products);
    localStorage.setItem("products", JSON.stringify(products)  )
   
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
    console.log(products);
  for(let i = 0 ; i < products.length;i++) {
       table  += `   <div class="card mt-0" style="width: 18rem;">
       <div class="imageCantainer">  <img id="im" src="./images/1.jpg" class="card-img-top img-thumbnail" alt="..."></div>
      
       <div class="card-body">
         <h3 class="card-title  ">${products[i].title}</h3> <h3 class="totalPrice">  ${products[i].total}  L.E</h3>
         <h3 class="card-text mb-3">Cateogry : ${products[i].category}</h3>
         <a href="#" class="btn  " onClick = "updateData(${i})">update</a>
         <a href="#" class="btn  ms-5" onClick = "deleteData(${i})">delelet</a>
       </div>
     </div>`
    }
    ui.innerHTML = table;
    let deleltAll = document.getElementById("deleletAll");
    if(products.length > 0) {
      deleltAll.innerHTML = `
      <button onClick = "deleletAll()">delelet All (${products.length})</button>
      `
    } 
    else {
        deleltAll.innerHTML = "";
    }
}


//delelet

function deleteData (i) {
    products.splice(i,1);
    localStorage.setItem("products", JSON.stringify(products)  );
    showData()
}


// delelet All
function deleletAll() {
    localStorage.clear();
    products=[];
    showData()
}





//update
function updateData(i) {
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value =products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    category.value = products[i].category ;
    submit.innerHTML = "update";
    getTotal();
    mode = "update";
    publicI = i;
    // scrollTo({
    //     top:0,
    //     behavior:"smooth"

    // })
    

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
    for(let i = 0 ; i<products.length;i++) {
    if(searchMood == "title") {
        if(products[i].title.includes(value.toLowerCase())) {
            table  += `   <div class="card" style="width: 18rem;">
            <img src="./images/1.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title mb-2 ">${products[i].title}</h5> <span class="totalPrice">  ${products[i].total}  L.E</span>
              <p class="card-text mt-2">Cateogry :  ${products[i].category}</p>
              <a href="#" class="btn btn-primary" onClick = "updateData(${i})">update</a>
              <a href="#" class="btn btn-primary ms-5" onClick = "deleteData(${i})">delelet</a>
            </div>
          </div>`
        }
        

    }

    else {
        
            if(products[i].category.includes(value.toLowerCase())) {
                table  += `   <div class="card" style="width: 18rem;">
                <img src="./images/1.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title mb-2 ">${products[i].title}</h5> <span class="totalPrice">  ${products[i].total}  L.E</span>
                  <p class="card-text mt-2">Cateogry :  ${products[i].category}</p>
                  <a href="#" class="btn btn-primary" onClick = "updateData(${i})">update</a>
                  <a href="#" class="btn btn-primary ms-5" onClick = "deleteData(${i})">delelet</a>
                </div>
              </div>`
            }
        

    }
    ui.innerHTML = table;
 }
 
   

}





