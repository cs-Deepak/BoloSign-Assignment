const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  title: String,
  pdf: String,
},
  {collation:"pdfdetails"}
);

module.exports = mongoose.model("pdfdetails", pdfSchema);
                 