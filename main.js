$("#total").css({
  background: "red",
});
var colorButton = " rgb(148, 175, 101)";
$("button").hover(
  function () {
    $(this).css("background-color", " rgb(88, 112, 46)");
  },
  function () {
    $(this).css("background-color", colorButton);
  }
);
//calcul price

var calclTotal = function () {
  var result = 0;
  var valuePrice = Number($("#price").val());
  var valueTaxes = Number($("#taxes").val());
  var valueDiscount = Number($("#discount").val());

  if (valuePrice !== 0 && valueTaxes !== 0 && valueDiscount !== 0) {
    result = valuePrice + valueTaxes - valueDiscount;
    $("#total").empty();
    $("#total").append("total:  " + Number(result) + " $");
  }
  return result;
};
//add product
var data = [];
$("#add").on("click", function () {
  let obj = {
    title: $("#title").val(),
    price: $("#price").val(),
    taxes: $("#taxes").val(),
    discount: $("#discount").val(),
    total: calclTotal(),
    productNumber: Number($("#product-number").val()),
    category: $("#category").val(),
  };

  if (obj.productNumber > 1) {
    for (let i = 0; i < obj.productNumber; i++) {
      data.push(obj);
      console.log(obj.productNumber);
    }
  } else {
    data.push(obj);
  }

  if (data.length > 0) {
    $("#deleteAll").show();
  }

  clearData();
  displayData();
});
function clearData() {
  $("#title").val("");
  $("#price").val("");
  $("#taxes").val("");
  $("#discount").val("");
  $("#product-number").val("");
  $("#category").val("");
  $("#total").html("Total: ");
}

//display data

function displayData() {
  if (data.length === 0) {
    $("#deleteAll").hide();
  }
  $("#tbody").empty();

  for (let i = 0; i < data.length; i++) {
    var table = ` <tr > 
      <td> ${i}
      </td> 
      <td> 
     ${data[i].title}
      </td> 
      <td> 
     ${data[i].price}
      </td> 
      <td> 
     ${data[i].taxes}
      </td> 
      <td> 
      ${data[i].discount}
      </td> 
      <td> 
       ${data[i].total}
      
      </td> 
      <td> 
         ${data[i].productNumber}
      </td> 
      <td>
      ${data[i].category} 
   
      </td> 
        <td>
      <button onclick="deleteProduct(${i})">delete</button>
            </td>
      </tr>`;
    $("#tbody").append(table);
  }
}

$("#deleteAll").append(
  `  <button id="deleteAll" onclick=" deleteAll()" >delete all</button>`
);

//remove product

function deleteProduct(index) {
  data.splice(index, 1);
  displayData();
}
displayData();
// remove all products
function deleteAll() {
  data = [];
  displayData();
}
function each(coll, func) {
  if (Array.isArray(coll)) {
    for (var i = 0; i < coll.length; i++) {
      func(coll[i], i);
    }
  } else {
    for (var key in coll) {
      func(coll[key], key);
    }
  }
}

function filter(array, predicate) {
  var acc = [];
  each(array, function (element, index) {
    // notice we added the index here
    if (predicate(element, index)) {
      // notice we added the index here
      acc.push(element);
    }
  });
  return acc;
}
var searched = $("#searchCategory");
$("#btn-search").on("click", searchCategory);
function searchCategory() {
  var arr = filter(data, function (element) {
    return element.category === searched.val();
  });

  data = arr;

  displayData();
  searched.val("");
}
