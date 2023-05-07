// filterResults([...],"jklouijui",['coco'],[],[])


function filterResults(
  originalList,
  search,
  ingredients,
  ustensils,
  appliances
) {}

this.ingredients  = [];

const addIngredient = ( value ) => { 
  this.ingredients.push(value);
  const list = filterResults();
  buildUI(list);
}
const removeIngredient = 

const filterResults = (
) => {
  const searchLowerCase = search.toLowerCase();

  var results = originalList;
 

  // champs de recherche
  if (searchLowerCase.length > 2) {
    results = results.filter(
      (element) =>
        element.name.toLowerCase() === searchLowerCase ||
        element.title.toLowerCase() === searchLowerCase ||
        element.description.toLowerCase() === searchLowerCase ||
        element.ingredients.some((i) => i.toLowerCase() === searchLowerCase) ||
        element.ustentils.some((u) => u.toLowerCase() === searchLowerCase) ||
        element.appliances.some((a) => a.toLowerCase() === searchLowerCase)
    );
  }

  if (this.ingredients.length > 0) {
    for (let i = 0; i < this.ingredients.length; i++) {
      const currentIngredient = this.ingredients[i];
      results = results.filter((element) =>
        element.ingredients.some(
          (i) => i.toLowerCase() === currentIngredient.toLowerCase()
        )
      );
    }
  }

  if (ustensils.length > 0) {
    for (let i = 0; i < ustensils.length; i++) {
      const currentUstensil = ustensils[i];
      results = results.filter((element) =>
        element.ustensils.some(
          (i) => i.toLowerCase() === currentUstensil.toLowerCase()
        )
      );
    }
  }

  if (appliances.length > 0) {
    for (let i = 0; i < appliances.length; i++) {
      const currentAppliance = appliances[i];
      results = results.filter((element) =>
        element.appliances.some(
          (i) => i.toLowerCase() === currentAppliance.toLowerCase()
        )
      );
    }
  }

  return results;
};
