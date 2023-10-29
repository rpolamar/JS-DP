const Size = Object.freeze({
    small: 'small',
    medium: 'medium',
    large: 'large'
});

const Color = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
});

class Product {
    constructor(name, size, color){
        this.name = name;
        this.size = size;
        this.color = color;
    }
    toString(){
        return `Name: ${this.name}, Color: ${this.color}, Size: ${this.size}`
    }
}

class ProductFilter {
    filterByColor(products, color){
        return products.filter(product => product.color === color);
    }
    filterBySize(products, size){
        return products.filter(product => product.size === size);
    }
    filterByColorAndSize(products,color, size){
        return products.filter(product => product.size === size && product.color === color);
    }
}

class ColorSpecification{
    constructor(color){
        this.color = color;
    }
    isSatisfied(item){
        return item.color === this.color;
    }
}

class SizeSpecification{
    constructor(size){
        this.size = size;
    }
    isSatisfied(item){
        return item.size === this.size;
    }
}

class AndSpecification{
    constructor(...spec){
        this.spec = spec;
    }
    isSatisfied(item){
        return this.spec.every(x=> x.isSatisfied(item))
    }
}

const apple = new Product('Apple',Size.small, Color.green);
const tree = new Product('Tree',Size.medium,Color.green);
const house = new Product('House',Size.large,Color.red);

const products = [apple,tree,house];
console.log("Green Products (Old)")
const pf = new ProductFilter();
for(let p of pf.filterByColor(products, Color.green)){
    console.log(`${p.name} is green color`);
}

class BetterFilter{
    filter(products,spec){
        return products.filter(product => spec.isSatisfied(product))
    }
}
const bf = new BetterFilter();
console.log("Green Products (new)")
for(let p of bf.filter(products,new ColorSpecification(Color.green))){
    console.log(`${p.name} is green color`)
}

for(let p of bf.filter(products,new AndSpecification(
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.small)
    ))){
    console.log(`${p.name} is green color And small`)
}