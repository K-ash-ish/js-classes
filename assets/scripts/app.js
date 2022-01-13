class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ShoppingCart{
  items = [];

  addProduct(product){
    this.items.push(product);
    this.total.innerHTML = `<h2>Total : \${1}</h2>`
  }

  render(){
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
      <h2>Total : \${0}</h2>
      <button>Order Now!</button>
    `;
    cartEl.className = "cart";
    this.total = cartEl.querySelector("h2");
    return cartEl;
  }
}

class ProductItem {
  constructor(product){
    this.product = product;
  }

  addCart(){
    App.addProductToCart(this.product)
  }

  render(){
    const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
      prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
      // console.log(prodEl)
      const addToCartBtn = prodEl.querySelector("button");
      addToCartBtn.addEventListener("click", this.addCart.bind(this))
      return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      'A Pillow',
      'https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg',
      'A soft pillow!',
      19.99
    ),
    new Product(
      'A Carpet',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
      'A carpet which you might like - or not.',
      89.99
    )
  ];
  render (){
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);

    }
    return prodList;
  }
}

class Shop{
  render (){
    const renderHook = document.getElementById('app');
    this.shoppingCart = new ShoppingCart();
    const cartEl = this.shoppingCart.render();
    const productList = new ProductList();
    const prodEl = productList.render();
    renderHook.append(cartEl);
    renderHook.append(prodEl);
  }
}

class App {
  static shoppingCart;
  static init(){
    const shop = new Shop();
    //this represents to class not an object
    shop.render();
    this.shoppingCart = shop.shoppingCart;
    
  }
  static addProductToCart(product){
    this.shoppingCart.addProduct(product);
  }
}

App.init();

