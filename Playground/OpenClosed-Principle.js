const Color= Object.freeze({
    red :'red',
    green : 'green',
    blue: 'blue'
})
const Size = Object.freeze({
    small: 'small',
    medium : 'medium',
    large: 'large'
})
class Product{
    constructor(name, color, size){
        this.name = name;
        this.color = color;
        this.size = size
    }

   toString(){
    return `Name: ${this.name}, Color: ${this.color}, Size: ${this.size}`;
   }
}
class ProductFilter {
    filterBySize(products, size){
        return products.filter(product => product.size === size);
    }
    filterByColor(products, color){
        return products.filter(product => product.color === color);
    }
    filterByColorAndSize(products, color,size){
        return products.filter(product => product.color === color && product.size === size);
    }
}

const apple = new Product("Apple",Color.green,Size.small);
const tree = new Product("Treen",Color.green,Size.medium);
const house = new Product("House",Color.red,Size.large);
const products = [apple,tree,house]
console.log(apple.toString());
let pf = new ProductFilter();
console.log("Green Products (Old Approach)");
for(let p of pf.filterByColor(products, Color.green)){
    console.log(`${p.name} is ${p.color}`)
}

class ColorSpecification{
    constructor(color){
        this.color = color;
    }
    isSatisfied(item){
        return this.color === item.color;
    }
}
class SizeSpecification{
    constructor(size){
        this.size = size;
    }
    isSatisfied(item){
        return this.size === item.size;
    }
}
class ColorAndSizeSpecification{
    constructor(color,size){
        this.size = size;
        this.color = color;
    }
    isSatisfied(item){
        return this.size === item.size && this.color === item.color;
    }
}
class AndSpecification{
    constructor(...spec){
    this.spec = spec;
    }
    isSatisfied(item){
        return this.spec.every(x => x.isSatisfied(item))
    }
}

class BetterFilter{
    filter(items,spec){
        return items.filter(item => spec.isSatisfied(item))
    }
}
let bf = new BetterFilter();
console.log("Green Products (new)")
for(let p of bf.filter(products,new ColorSpecification(Color.green))){
    console.log(`${p.name} is ${p.color}`)
}

for(let p of bf.filter(products,new AndSpecification(
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.small)
    ))){
    console.log(`${p.name} is ${p.color} - ${p.size}`)
}