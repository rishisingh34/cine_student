const getLanguage = (key) => {
  switch(key) {
    case 3 : return "C"; 
    case 4 : return "Cpp"; 
    case 5 : return "Python";
    case 6 : return "Java";
    default : return "Invalid preference number"
  }
}
module.exports = getLanguage; 