const btns = document.querySelectorAll('.navbtn');
const storeProducts = document.querySelectorAll('.store-product');

for (i = 0; i < btns.length; i++) {

    btns[i].addEventListener('click', (e) => {
        e.preventDefault()
        var cart_toggle = document.getElementById('cart');
        var product_toggle = document.getElementById('products');
        var cartButton = document.getElementById('cart-button');
        var continueShopping = document.getElementById('continue-shopping');
        const filter = e.target.dataset.filter;
        console.log(filter);
        cart_toggle.style.display = 'none';
        product_toggle.style.display = 'block';
        cartButton.style.display = 'block';
        continueShopping.style.display = 'none';
        storeProducts.forEach((product) => {
            if (filter === 'all') {
                product.style.display = 'block'
            } else {
                if (product.classList.contains(filter)) {
                    product.style.display = 'block'
                } else {
                    product.style.display = 'none'
                }
            }
        });
    });
};

// SEARCH FILTER
const search = document.getElementById("search");
const productName = document.querySelectorAll(".product-details h2");

// A BETTER WAY TO FILTER THROUGH THE PRODUCTS
search.addEventListener("keyup", filterProducts);


function filterProducts(e) {
    const text = e.target.value.toLowerCase();
    // console.log(productName[0]);
    productName.forEach(function (product) {
        const item = product.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            product.parentElement.parentElement.style.display = "block"
        } else {
            product.parentElement.parentElement.style.display = "none"
        }
    })
}



if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    var cartQuantity = document.getElementById("cart-count")
    alert('Thank you for purchasing at PC Tech')
    cartQuantity.textContent = 0
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var cartQuantity = document.getElementById("cart-count")
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    cartQuantity.textContent = parseInt(cartQuantity.textContent) - 1;
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var cartQuantity = document.getElementById("cart-count")
    addItemToCart(title, price, imageSrc)
    cartQuantity.textContent = parseInt(cartQuantity.textContent) + 1;
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart\nTo add more of this item, change the quantity in the cart')
            cartQuantity.textContent = parseInt(cartQuantity.textContent) - 1;
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE ITEM</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


function view_cart() {
    var cart_toggle = document.getElementById('cart');
    var product_toggle = document.getElementById('products');
    var cartButton = document.getElementById('cart-button');
    var continueShopping = document.getElementById('continue-shopping');
    if (product_toggle.style.display != 'none') {
        cart_toggle.style.display = 'block';
        product_toggle.style.display = 'none';
        cartButton.style.display = 'none';
        continueShopping.style.display = 'block';

    }
    else {
        cart_toggle.style.display = 'none';
        product_toggle.style.display = 'block';
        cartButton.style.display = 'block';
        continueShopping.style.display = 'none';
    }
}
