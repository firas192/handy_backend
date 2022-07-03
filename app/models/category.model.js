module.exports = mongoose => {
  const Category = mongoose.model(
    "category",
    mongoose.Schema(
      {
        name:{
          type:String,
          required: true,
        },
        description: String,
       
      },
      { timestamps: true }
    )
  );
  return Category;
};