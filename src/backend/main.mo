import Text "mo:core/Text";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";

actor {
  type Category = { #LivingRoom; #Bedroom; #Dining; #Outdoor };

  type Product = {
    id : Nat;
    name : Text;
    category : Category;
    description : Text;
    priceCents : Nat;
    imageUrl : Text;
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  let products = Map.empty<Nat, Product>();
  let carts = Map.empty<Principal, [CartItem]>();

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(
      func(product) {
        product.category == category;
      }
    );
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    let currentCart = switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };

    let updatedCart = currentCart.concat([
      {
        productId;
        quantity;
      },
    ]);

    carts.add(caller, updatedCart);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    let currentCart = switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };

    let updatedCart = currentCart.filter(
      func(item) {
        item.productId != productId;
      }
    );

    carts.add(caller, updatedCart);
  };

  public shared ({ caller }) func clearCart() : async () {
    carts.add(caller, []);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart };
    };
  };

  system func preupgrade() {};
  system func postupgrade() {
    initializeProducts();
  };

  public shared ({ caller }) func init() : async () {
    initializeProducts();
  };

  func initializeProducts() {
    products.add(
      1,
      {
        id = 1;
        name = "Arbor Sofa";
        category = #LivingRoom;
        description = "Comfortable 3-seater sofa";
        priceCents = 59999;
        imageUrl = "sofa.jpg";
      },
    );
    products.add(
      2,
      {
        id = 2;
        name = "Oak Coffee Table";
        category = #LivingRoom;
        description = "Solid oak coffee table";
        priceCents = 24999;
        imageUrl = "coffee_table.jpg";
      },
    );
    products.add(
      3,
      {
        id = 3;
        name = "Lounge Chair";
        category = #LivingRoom;
        description = "Elegant lounge chair with cushions";
        priceCents = 19999;
        imageUrl = "lounge_chair.jpg";
      },
    );
    products.add(
      4,
      {
        id = 4;
        name = "King Size Bed";
        category = #Bedroom;
        description = "Spacious king size bed";
        priceCents = 79999;
        imageUrl = "bed.jpg";
      },
    );
    products.add(
      5,
      {
        id = 5;
        name = "Nightstand";
        category = #Bedroom;
        description = "Matching nightstand for your bed";
        priceCents = 9999;
        imageUrl = "nightstand.jpg";
      },
    );
    products.add(
      6,
      {
        id = 6;
        name = "Wardrobe";
        category = #Bedroom;
        description = "Spacious wardrobe with sliding doors";
        priceCents = 49999;
        imageUrl = "wardrobe.jpg";
      },
    );
    products.add(
      7,
      {
        id = 7;
        name = "Dining Table";
        category = #Dining;
        description = "Large wooden dining table";
        priceCents = 69999;
        imageUrl = "dining_table.jpg";
      },
    );
    products.add(
      8,
      {
        id = 8;
        name = "Dining Chair Set";
        category = #Dining;
        description = "Set of 4 dining chairs";
        priceCents = 29999;
        imageUrl = "dining_chairs.jpg";
      },
    );
    products.add(
      9,
      {
        id = 9;
        name = "Bar Stool";
        category = #Dining;
        description = "Modern bar stool for counters";
        priceCents = 12999;
        imageUrl = "bar_stool.jpg";
      },
    );
    products.add(
      10,
      {
        id = 10;
        name = "Patio Set";
        category = #Outdoor;
        description = "Outdoor patio set with table and chairs";
        priceCents = 39999;
        imageUrl = "patio_set.jpg";
      },
    );
    products.add(
      11,
      {
        id = 11;
        name = "Outdoor Lounge Chair";
        category = #Outdoor;
        description = "Comfortable outdoor lounge chair";
        priceCents = 14999;
        imageUrl = "outdoor_lounge_chair.jpg";
      },
    );
    products.add(
      12,
      {
        id = 12;
        name = "Garden Bench";
        category = #Outdoor;
        description = "Classic wooden garden bench";
        priceCents = 24999;
        imageUrl = "garden_bench.jpg";
      },
    );
  };
};
