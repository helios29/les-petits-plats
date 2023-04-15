// const data = [
//   {
//     id: 0,
//     title: "",
//     description: "",
//     ingredients: ["lait", "sel", "poivre"]
//   }
// ];

// const search = "coc";

// const result = data.filter(
//   (element) =>
//     element.title.includes(coc) ||
//     element.description.includes(coc) ||
//     element.ingredients.includes(coc)
// );

// buildUI(result);

// const buildUI(data){
//   document.getElementById("list").innerHTML = "";
//   for (var i = 0; i < data.length; i++){
//     const currentElement = data[i];
//     document.appendChild(currentElement);
//   }
// }

// function search_receipe() {
//   let input = document.getElementById('searchbar').value
//   input=input.toLowerCase();
//   let x = document.getElementsByClassName('animals');

//   for (i = 0; i < x.length; i++) {
//       if (!x[i].innerHTML.toLowerCase().includes(input)) {
//           x[i].style.display="none";
//       }
//       else {
//           x[i].style.display="list-item";
//       }
//   }
// }
