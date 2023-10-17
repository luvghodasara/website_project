    function salesCategory(userRating) {
    if (userRating >= 0 && userRating < 2) return "Below Average";
    else if (userRating >= 2 && userRating < 3) return "Pretty Good";
    else if (userRating >= 3 && userRating < 4) return "Great";
    else if (userRating >= 4 && userRating < 4.5) return "Fantastic";
    else return "Outstanding";
  }
  
  function buildTable() {
    let totalSold = 0, totalRating = 0, bestSellingPizza = "", bestSellingTotal = 0;
    let table = "<table border='1'><tr><th>Pizza Name</th><th>Number Sold</th><th>User Rating</th><th>Sales Category</th></tr>";
  
    pizzaSalesListJSON.pizzas.forEach((pizza, index) => {
      table += `<tr><td>${pizza.name}</td><td>${pizza.numberSold}</td><td>${pizza.userRating}</td><td>${salesCategory(pizza.userRating)}</td></tr>`;
      totalSold += pizza.numberSold;
      totalRating += pizza.userRating;
      if (pizza.numberSold > bestSellingTotal) {
        bestSellingPizza = pizza.name;
        bestSellingTotal = pizza.numberSold;
      }
    });
  
    table += "</table>";
  
    const avgSold = (totalSold / pizzaSalesListJSON.pizzas.length).toFixed(1);
    const avgRating = (totalRating / pizzaSalesListJSON.pizzas.length).toFixed(1);
  
    table += `<p>Average number of pizzas sold: ${avgSold}</p>`;
    table += `<p>Best selling pizza name: ${bestSellingPizza}</p>`;
    table += `<p>Best selling pizza total: ${bestSellingTotal}</p>`;
    table += `<p>User rating: ${avgRating}</p>`;
  
    document.getElementById("table-container").innerHTML = table;
    document.addEventListener('DOMContentLoaded', (event) => {
        document.getElementById('btn').addEventListener('click', buildTable);
  }
