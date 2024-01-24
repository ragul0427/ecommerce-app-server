const {category,categoryHeading} = require("../Modals/categoryModal");

const createCategory = async (req, res) => {
 console.log(req.body,"vahhjsb")
  try {
    const { name } = req.body;

    const categoryData = name ? { ...req.body } : { ...req.body };
    const categoryModel = name ? categoryHeading : category;

    await categoryModel.create(categoryData);
    return res.status(200).send("Category created successfully");
  } catch (e) {
     
    return res.status(404).send("Error while when created category");
  }
};

const getCategory = async (req, res) => {
  try {
    const result = await category.find({});
    const result2=await categoryHeading.find({})
    const populateResult=await category.find().populate('categoryId')
   
    
    return res.status(200).send({ data: { category: result, categoryHeading: result2,populateResult } });
  } catch (e) {
    return res.status(404).send("Error while fetching  category");
  }
};


const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryData = name ? { ...req.body, _id: req.body._id } : { ...req.body };
    const categoryModel = name ? categoryHeading : category;

    // Using findByIdAndUpdate with the correct parameters
    await categoryModel.findByIdAndUpdate(req.body._id, { $set: categoryData }, { new: true });

    return res.status(200).send("Category updated successfully");
  } catch (e) {
    return res.status(404).send("Error while updating category");
  }
};




const deleteCategory = async (req, res) => {
 
  try {
    const {id}=req.params
    await category.findByIdAndDelete(id)
    return res.status(200).send("Category deleted successfully");
  } catch (e) {
    return res.status(404).send("Error while deleted category");
  }
};


module.exports = {
  createCategory,
  getCategory,
  updateCategory,deleteCategory
};
