exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("recipes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("recipes").insert([
        {
          id: 1,
          title: "Egg and Avocado Toast",
          meal_type: "lunch",
          image_url:
            "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=653&q=80",
          ingredients:
            "2 eggs, 2 slices toast, 1 avocado, 1/2c spinach, salt, pepper",
          directions:
            "Boil eggs. Toast bread. Put spinach on plate. Layer toast, avocado, sliced eggs on top of spinach. Season and garnish as desired.",
          chef_id: 4
        },
        {
          id: 2,
          title: "Blueberry Banana French Toast",
          meal_type: "breakfast",
          image_url:
            "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80",
          ingredients:
            "6 slices bread, 3 eggs, 1 banana, 6 oz blueberries, 1 cup syrup, 1tbsp vanilla, 1/2 cup milk",
          directions:
            "Mix eggs, milk, vanilla in large bowl. Emerse bread in liquid until outer surface moist. Fry in buttered pan until golden brown. Top with syrup, sliced banana and washed bluberries.",
          chef_id: 1
        },
        {
          id: 3,
          title: "Pumpkin Soup",
          meal_type: "Dinner",
          image_url:
            "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
          ingredients:
            "1 medium pumpkin, pepitas, butter, paprika, goat cheese",
          directions:
            "Wash, scrape, salt and roast pumpkin. Puree roasted pumpkin. Melt butter in a pot, add pureed pumpkin and paprika. Simmer for 45 minutes. Serve topped with goat cheese and pepitas.",
          chef_id: 5
        },
        {
          id: 4,
          title: "Pizza",
          meal_type: "dinner",
          image_url:
            "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          ingredients: "1 deliver pizza, dried chili flakes, parmesan",
          directions:
            "Call your favorite pizza delivery business. Wait 40 minutes. Serve with optional dried chili flakes and parmesan",
          chef_id: 2
        },
        {
          id: 5,
          title: "Strawberry Ice Cream",
          meal_type: "Dessert",
          image_url:
            "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
          ingredients:
            "3 cups heavy cream, 2 cups sugar, 2 tbsp vanilla, 1 cup chopped strawberries, 5 lbs ice, 1 cup rock salt, ice cream cones",
          directions:
            "Mix all ingredients in ice cream maker bowl, secure lid. Place ice and rock salt in the ice cream maker drum. Crank for 1 hour or until ice cream has reached desired consistency. Enjoy in a bowl or cone.",
          chef_id: 3
        }
      ]);
    });
};

/*
recipes
  {
    id:
title: "",
meal_type: "",
  image_url: "",
  ingredients: "",
  directions: "",
  chef_id: ""
  },

  */
