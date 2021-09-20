/*  This is a simple menu application that allows archivists 
to add collections and create items within the collections  
with a title, creator, and year.  They can then list collections, 
the items within a collection, and display the properties of items.

I modified the example that was created in the video because I 
wanted to use the describe() methods from the classes as a way to practice
providing more information to the user when actions were taken.

I also added delete confirmation options, for additional practice.
*/

//defining the Item class

class Item {
  constructor(title, creator, year) {
    this.title = title;
    this.creator = creator;
    this.year = year;
  }

  //method to print out the Item's attributes (properties)
  describe() {
    return `${this.title} was created by ${this.creator} in ${this.year}.`;
  }
}

//defining the Collection class

class Collection {
  constructor(name) {
    this.name = name;
    this.items = [];
  }

  //method to add Item to Collection
  addItem(item) {
    if (item instanceof Item) {
      this.items.push(item);
    } else {
      throw new Error(
        `Only Items can be added to collections.  ${item} is not an item.`
      );
    }
  }

  //method to print out the name of Collection and number of items it contains
  describe() {
    return `${this.name} contains ${this.items.length} items.`;
  }
}

//defining the Menu class

class Menu {
  constructor() {
    this.collections = [];
    this.selectedCollection = null;
  }

  //presents the menu of Collection actions in a dialog box
  start() {
    let selection = this.showMenuOptions();
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createCollection();
          break;
        case "2":
          this.viewCollection();
          break;
        case "3":
          this.displayCollections();
          break;
        case "4":
          this.deleteCollection();
          break;
        default:
          selection = 0;
      }
      selection = this.showMenuOptions();
    }
    alert("You have exited.");
  }

  //creating display of Collection menu
  showMenuOptions() {
    return prompt(`
      1. Create New Collection
      2. View Collection
      3. Display All Collections
      4. Delete Collection
      0. Exit`);
  }

  //creating display of Item submenu
  showItemMenuOptions(itemInfo) {
    return prompt(`
    ${itemInfo}
    --------------------
    1. Create New Item
    2. Delete Item
    0. Back
    `);
  }

  //method to show the list of Collections
  displayCollections() {
    let colString = "";
    for (let i = 0; i < this.collections.length; i++) {
      colString += i + ". " + this.collections[i].name + "\n";
    }
    alert(colString);
  }

  //method to create a new Collection
  createCollection() {
    let name = prompt("Enter the name for new collection:");
    this.collections.push(new Collection(name));
    alert(this.collections[this.collections.length - 1].describe());
  }

  /* method to display a Collection, list the Items in it with their properties, 
  and display the Items submenu */

  viewCollection() {
    let index = prompt("Enter the index of the collection to display:");
    if (index > -1 && index < this.collections.length) {
      this.selectedCollection = this.collections[index];
      let description =
        "Selected collection is " + this.selectedCollection.name + "\n";

      for (let i = 0; i < this.selectedCollection.items.length; i++) {
        description +=
          i +
          ". " +
          this.selectedCollection.items[i].title +
          " - " +
          this.selectedCollection.items[i].creator +
          " - " +
          this.selectedCollection.items[i].year +
          "\n";
      }

      let selection = this.showItemMenuOptions(description);
      switch (selection) {
        case "1":
          this.createItem();
          break;
        case "2":
          this.deleteItem();
      }
    }
  }

  //method to delete a Collection
  deleteCollection() {
    let index = prompt("Enter the index of the collection you wish to delete");
    if (index > -1 && index < this.collections.length) {
      let response = confirm(
        "You are deleting " +
          this.collections[index].name +
          " and this cannot be undone."
      );
      if (response === true) {
        this.collections.splice(index, 1);
      } else {
        alert("Collection not deleted.");
      }
    }
  }

  //method to create an Item
  createItem() {
    let title = prompt("Enter item title");
    let creator = prompt("Enter item creator");
    let year = prompt("Enter the year the item was created");
    this.selectedCollection.items.push(new Item(title, creator, year));
    alert(
      this.selectedCollection.items[
        this.selectedCollection.items.length - 1
      ].describe()
    );
  }

  //method to delete an Item
  deleteItem() {
    let index = prompt("Enter the index of the item you wish to delete");

    if (index > -1 && index < this.selectedCollection.items.length) {
      let response = confirm(
        "You are deleting " +
          this.selectedCollection.items[index].title +
          " and this cannot be undone."
      );
      if (response === true) {
        this.selectedCollection.items.splice(index, 1);
      } else {
        alert("Item not deleted.");
      }
    }
  }
}

//presenting the user with the Collections Menu in a dialog box
let menu = new Menu();
menu.start();
