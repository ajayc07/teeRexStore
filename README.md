# **TeeRexStore**
#### 🛡️ Language: JavaScript
#### ⚙️ Frame Work: Angular 14
#### 📱 Style: SCSS
#### 🧪 Unit test: Jasmine Karma
#### :octocat: GIT Repo: https://github.com/ajayc07/skillTest-TeeRexStore
#### 💻 Live: https://ajayc07.github.io/teeRexStore/
No additional libraries used.

## How to run: 
- Extract the Files
- Run npm install to install the required packages
- Run `ng serve` for a dev server. 
- Navigate to `http://localhost:4200/`

## Running unit tests
Run `ng test` to execute the unit tests via Karma

## About the application
TeeRexStore is a responsive e-commerce site for selling t-shits which allows customer to
- Browse the catalog on a product listing page
- Search using free text which is a combination of one or more of the attributes like type, color, name
- Filter for t-shirts using specific attributes
- Add one or more t-shirts to the shopping cart
- View the shopping cart by clicking the shopping cart icon
- Increase quantity or delete items from the shopping cart
- Display the total amount in the shopping cart.

## High level design

### Product
<img src="./screenshot%20and%20designs/TeeRexStore%20Product%20HLD.png" width="600px" height="300px">

### Cart
<img src="./screenshot%20and%20designs/TeeRexStore%20Cart%20HLD.png"
width="600px" height="300px">

## Low level design
Application is build with 2 Module which are handled with Angular's `Lazy loading` and with shared components.  
State Management is handled using `RXjs's Behavior Subject`.  
API communication is handled with `Angular's HTTP Client`

    App
    ├── Product Module
    │   ├── Product
    │   └── Product card 
    ├── Cart Module
    │   ├── Cart
    │   ├── Cart item 
    │   └── Cart summary
    ├── Shared Components
    │   ├── Header component
    │   ├── Filter component
    │   └── Search component
    └── Services
        ├── State management 
        └── Communication


### ***Product Module***
Product module contains 2 Component.
### *Product Component*
Product component is a wrapper component of Product Module which does the following functions
- Allows the user to browse the product catalogue.
- Search for a product(s) with attributes such as type, color, name.
- Filter the product with attributes like type, color, name and price range.

All data flow and functional handling will be done in product component.
### *Product Card Component*
Product card component is a presentation component to display product details with functionalities like
- Show details like image, name, type, color, gender.
- Add to cart actions.
- Displays the available stock an item if it is less than 2.
- Disables the *Add to Cart* button and shows *Out of stock* note if stock of particular item is not available.
Updating the cart item event will be passed to product component form product card component.


### ***Cart Module***
Cart module contains 3 Component.
### *Cart Component*
Cart component is a wrapper component of Cart Module which does the following functions:
- Allows the user to view all the item added to cart.
- Allows the user to view the summary of the cart.
### *Cart Item Component*
Cart Item component is a presentation component which allows the user to:
- Enables user to increase / decrease the quantity of the item.
- Enables user to delete the item from the cart.
### *Cart Summary Component*
Cart Summary component is a presentation component which allows the user to:
- View the sumamry of the cart with total number of items and total amount of the items in the cart.

### ***Shared Components***
### *Header Component*
Header consists of company logo section and navigation section.  
Navigation section will have 2 page route links
- Product
- Cart  

Cart icon will indicate number of cart items present.

| *Empty cart* | *Cart with an item* 
|:-----:|:-----:|
|<img src="./screenshot%20and%20designs/cart-no-item.jpg" width="90px" height="55px"> | <img src="./screenshot%20and%20designs/cart-has-item.jpg" width="90px" height="55px">

### *Filter Component*
Filter component enables the apply filter values of attribute like color, gender, price range, type.  
- Values of the filter are **extracted from the product list**.  
- Number of product shown is displayed in filter component.  
- Clear Filter button will be shown only if any of the filter is selected.
- In mobile view filter will be show in bottom sheet and number of filter criteria applied will be shown aside of button.
- Filter will be cleared when search value is present.

| *Filter Desktop* | *Filter Mobile* 
|:-----:|:-----:|
| <img src="./screenshot%20and%20designs//Filter-desktop.jpg" height="500px"> | <img src="./screenshot%20and%20designs//Filter-mobile.jpg" height="500px">

### *Search Component*
Search component allows the user to search for product(s) with a free text  which is a combination of one or more of the attributes like type, color, name.  
Search will be cleared when filter values are selected.

## Screenshots

[](./screenshot%20and%20designs/)

| *Product Page* 
|:-----:
| <img src="./screenshot%20and%20designs/Product%20page%20desktop.png" width="600px" height="300px"> 

| *Cart Page*
|:-----:|
| <img src="./screenshot%20and%20designs/Product%20Cart%20Desktop.png" width="600px" height="300px">

| *Product Page Mobile* | *Cart page Mobile* 
|:-----:|:-----:|
| <img src="./screenshot%20and%20designs/Product%20page%20mobile.png" height="500px"> | <img src="./screenshot%20and%20designs/Cart%20mobile.png" height="500px">

| *Product card*
|:-----:
| <img src="./screenshot%20and%20designs/Product%20card.jpg" height="300px">

### ***Exception handling***
Exception are handled for the following scenarios:
- When no cart item present.
- When the searched / filtered product is not available.
- When product fetching api is failed.

| *No cart item* 
|:-----: 
| <img src="./screenshot%20and%20designs/No%20cart%20desktop.png" width="600px" height="300px">

| *No product Found*
|:-----:
| <img src="./screenshot%20and%20designs/No%20product%20found.png" width="600px" height="300px">

| *Wild card*
|:-----:
| <img src="./screenshot%20and%20designs/Something%20went%20wrong.png" width="600px" height="300px">

| *No cart item Mobile* | *No product Found Mobile* 
|:-----:|:-----:|
| <img src="./screenshot%20and%20designs/No%20cart%20%20mobile.png" height="500px"> | <img src="./screenshot%20and%20designs/No%20Product%20Mobile.png" height="500px">
