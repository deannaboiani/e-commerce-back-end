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

// Products belongToMany Tags (through ProductTag)
// ProductTag = sequelize.define('product_tag', {
//   role: Sequelize.STRING
// });
// Product.belongsToMany(Tag, 
//   {through: ProductTag});
// Product.addTag(product, { through: { id: 'product_id'}})

// Tags belongToMany Products (through ProductTag)
// Tag.belongstoMany(Product, 
//   {through: ProductTag });


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
