const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
    Category.findAll({
      include:[Product]
    })
      .then(dbCategories => {
        if (dbCategories.length) {
          res.json(dbCategories);
        } else {
          res.status(404).json({ message: "No category found!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "an error occured", err: err });
      });
  });


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  });
  
  router.post('/', (req, res) => {
    // create a new category
    Category.create({
      category_name: req.body.category_name
    }).then(newCategory => {
      res.json(newCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'an error occures', err: err})
    });
  });
  
  router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    // const updateCategory = getCategory(req.params.id)
    try{
      const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
      if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
    });



router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
