window.onload = function () {

  //cart variable
  const cartOpen = document.querySelector(".cartOpen");
  const cartClose = document.querySelector(".closeCart");
  const cardDiv = document.querySelector(".cartDiv");
  const cardData = cardDiv.querySelector(".cartData");
  let cardDataTable = cardData.querySelector("table");
  const addToCartBtns = document.querySelectorAll(".addToCart");
  const cartItemsNo = document.querySelector('.cartItems');
  //adding events
  cartOpen.addEventListener("click", function () {
    cardDiv.classList.add("active");
  });
  cartClose.addEventListener("click", function () {
    cardDiv.classList.remove("active");
  });

  //items added in cart to show
  let itemsNo = 0;
  const localitems = JSON.parse(localStorage.getItem("items"));
  if(localStorage.getItem("items") != null){
    localitems.map(itms=>{
      itemsNo += itms.no;
    });
  }

  //when the user click on add to cart button

  let items = [];
  for (let i = 0; i < addToCartBtns.length; i++) {
    addToCartBtns[i].onclick = function (e) {
      if (typeof(Storage) != "undefined") {
        if (localStorage.getItem("items") == null) {
          let item = {
            id: i + 1,
            name: e.target.parentElement.children[0].textContent,
            price: e.target.parentElement.children[1].querySelector('span').textContent,
            no: 1
          };
          items.push(item);
          localStorage.setItem("items", JSON.stringify(items));
          window.location.reload();
        } else {
          items = [];

          let item = {
            id: i + 1,
            name: e.target.parentElement.children[0].textContent,
            price: e.target.parentElement.children[1].querySelector('span').textContent,
            no: 1
          };
          localitems.map((itm) => {
            if(itm.id == item.id){
              item.no += itm.no;
            }else{
              items.push(itm);
            }
          });
          items.push(item);
          itemsNo +=1;
          localStorage.setItem("items", JSON.stringify(items));

          window.location.reload();
        }
      } else {
        alert("localstorage not working on your browser");
      }
    };
  }



  //cart div
  let itemsInCart = [];
  let i =1;
  itemsInCart += '<tr><td>Sno.</td><td>Item Name</td><td>Item No</td><td>Item Price</td><td></td></tr>';
  if(JSON.parse(localStorage.getItem("items")).length != 0){
    localitems.map(itms=>{
      itemsInCart += '<tr><td>'+i+'</td>'
      itemsInCart += '<td>'+itms.name+'</td>'
      itemsInCart += '<td>'+itms.no+'</td>'
      itemsInCart += '<td>$'+itms.price * itms.no+'</td>';
      itemsInCart += '<td><a href="#" class="delete" onclick="Delete(this);">Delete</a></td></tr>';
      i++;
    });
  }else{
    itemsInCart += '<tr><th colspan="4">No Items Found</th></tr>';
  }
  cardDataTable.innerHTML = itemsInCart;
  cartItemsNo.innerHTML = itemsNo;



};
