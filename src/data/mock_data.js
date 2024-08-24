let FOOD_DATA = [
    {
        name: 'wortel',
        id: 1,
        description: 'oranje wortel'
    },
    {
        name: 'choco',
        id: 2,
        description: 'bruine chocopasta'
    },
    {
        name: 'soep',
        id: 3,
        description: 'soep met brokken'
    }
];

let RECIPE_DATA = [
    {
        name: 'kippensoep',
        description: 'recept vr kipsoep',
        ingredients: [1, 3],
        id: 1
    },
    {
        name: 'cake',
        description: 'lekkere cake maken',
        ingredients: [2],
        id: 2
    },
    {
        name: 'tomatensaus',
        description: 'saus maken van tomaat',
        ingredients: [1, 2, 3],
        id: 3
    }
];

let FRIDGE_DATA = [
    {
        name: 'keukenfrigo',
        id: 1,
        contents: [1]
    },
    {
        name: 'koekenkast',
        id: 2,
        contents: [2]
    }
];

let FOODITEM_DATA = [
    {
        foodid: 1,
        id: 1,
        amount: 5
    },
    {
        foodid: 2,
        id: 2,
        amount: 1
    }
];

module.exports = {FOOD_DATA, RECIPE_DATA, FRIDGE_DATA, FOODITEM_DATA};