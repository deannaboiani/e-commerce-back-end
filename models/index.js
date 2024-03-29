// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Product belongstomany tag
Product.belongsToMany(Tag, 
  {through: ProductTag})


// tag belongstomany product
Tag.belongsToMany(Product, 
  {through: ProductTag })


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
