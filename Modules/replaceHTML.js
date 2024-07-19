module.exports = function (template, product) {
  let output = template.replace("{{%image}}", product.productImage);
  output = output.replace("{{%Name%}}", product.name);
  output = output.replace("{{%modelName%}}", product.modeName);
  output = output.replace("{{%modelNumber%}}", product.modelNumber);
  output = output.replace("{{%Description%}}", product.Description);
  output = output.replace("{{%modelPrice%}}", product.price);
  output = output.replace("{{%SIZE%}}", product.size);
  output = output.replace("{{%CAMERA%}}", product.camera);
  output = output.replace("{{%COLOR%}}", product.color);
  output = output.replace("{{%ID%}}", product.id);
  output = output.replace("{{%ROM%}}", product.ROM);
  return output;
};
