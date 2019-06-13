console.log("hi there");
process.argv.forEach(function(val, index, array) {
  console.log(index + ": " + val);
});
