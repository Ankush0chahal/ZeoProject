

Angular Recipe Book
This is a single-page application built with Angular that allows users to discover, create, and manage their favorite recipes. It also includes features for managing a shopping list. The application is connected to a Firebase backend for user authentication and data persistence, allowing users to save and fetch recipes.
Features
User Authentication: Sign up, log in, and log out functionality.
Recipe Management: Create, read, update, and delete recipes.
Shopping List: Add ingredients from recipes to a shopping list and manage the list.
Data Persistence: Save and fetch recipes from a Firebase backend.
Responsive Design: A clean and modern UI built with Bootstrap.
Technology Choices
Angular: A powerful and modern web framework for building single-page applications.
TypeScript: A statically typed superset of JavaScript that enhances code quality and maintainability.
Firebase: Provides backend services, including:
Firebase Authentication: For handling user sign-up and login.
Firestore: As a NoSQL database for storing recipe and shopping list data.
Bootstrap: A popular CSS framework for creating responsive and mobile-first layouts.
Reactive Forms: For building and validating forms in a scalable manner.
Setup Instructions
cd Angular-Recipe-App
npm install
ng 



Dependencies
node js , angular cli
Angular: The core framework for building the application.
TypeScript: The primary language used for developing the application.
Bootstrap 5: For styling and creating a responsive layout.
RxJS: For reactive programming using observables.
Firebase: Used for backend services like authentication and database storage.

API Endpoints
This application uses Firebase for its backend, which does not have traditional REST API endpoints. Instead, it communicates with Firebase services directly using the Firebase SDK. The main interactions are:
Authentication: Uses Firebase Authentication for user management.
Database: Uses Firestore to store and retrieve data in the following collections:
/recipes: Stores all the recipe documents.
/shopping-list: Stores the ingredients for the user's shopping list.