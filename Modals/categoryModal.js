const mongoose = require("mongoose");

const categoryHeadingSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  }
})

const categoryHeading = mongoose.model("category_heading", categoryHeadingSchema);

const categorySchema =new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category_heading",
      required: true,
    },
  },
  { timestamps: true }
);

const category = mongoose.model("category", categorySchema);

module.exports = { category,categoryHeading };
