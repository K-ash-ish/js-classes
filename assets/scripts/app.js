class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute{
  constructor (attrName, attrValue){
    this.name =attrName;
    this.value = attrValue;
  }
}

class Component{

  constructor (hookId){
    this.hookId = hookId ;
  }

  createComponent(tag, cssClasses, attributes){
    const rootElement = document.createElement(tag);
    if(cssClasses){
      rootElement.className = cssClasses;
    }
    if(attributes && attributes.length > 0){

      for(const attr of attributes){
        rootElement.setAttribute(attr.name, attr.value);
      }
  
    }

    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component{
  items = [];

  get totalAmount(){
    const sum = this.items.reduce( (prevValue, currValue) =>   prevValue + currValue.price, 0)
    // console.log(sum)
    return sum;
  }
  constructor (hookId){
    super(hookId);
  }

  addProduct(product){
    this.items.push(product);
    this.total.innerHTML = `<h2>Total : \$ ${this.totalAmount.toFixed(2)}</h2>`
  }
  addOrder(){
    console.log("Ordering...")
    console.log(this.items);
  }
  render(){
    const cartEl = this.createComponent("section", "cart" );    
    cartEl.innerHTML = `
      <h2>Total : \${0}</h2>
      <button>Order Now!</button>
    `;
    const orderBtn = cartEl.querySelector("button");
    // orderBtn.addEventListener("click", this.addOrder.bind(this.items));
    orderBtn.addEventListener("click", ()=> this.addOrder());
    // orderBtn.addEventListener("click", this.addOrder);
    this.total = cartEl.querySelector("h2");
  }
}

class ProductItem extends Component{
  constructor(product, hookId){
    super(hookId);
    this.product = product;
    
  }

  addCart(){
    App.addProductToCart(this.product)
  }

  render(){
      const prodEl = this.createComponent("li", "product-item")
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
      addToCartBtn.addEventListener("click", this.addCart.bind(this));
  }
}

class ProductList extends Component {
  // private list # symbolt to access and to  set
  #products = [
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
  constructor(hookId){
    super(hookId);
  }
  render (){
    this.createComponent("ul", "product-list", [new ElementAttribute ("id", "prod-list")]);
    for (const prod of this.#products) {
      const productItem = new ProductItem(prod, "prod-list");
      productItem.render();
    }
  }
}

class Shop{
  render (){
    this.shoppingCart = new ShoppingCart("app");
    this.shoppingCart.render();
    const productList = new ProductList("app");
    productList.render();
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

