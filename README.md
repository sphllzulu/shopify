
# Shopping List App

## Overview

The **Shopping List App** is a functional and user-friendly web application that helps users manage their shopping lists efficiently. Built with React, Redux Toolkit, and Material-UI (MUI), this app offers a seamless experience for adding, editing, deleting, and organizing shopping items. The app also supports user authentication, allowing users to manage their own lists securely.

## Features

- **User Authentication:** Secure sign-in and sign-up functionality.
- **CRUD Operations:** Add, update, and delete items from your shopping lists.
- **Search & Filter:** Easily search and filter items by name or category.
- **Category Management:** Organize items into categories such as Grocery, Household, and Other.
- **Send List via Email:** Share your shopping list with others via email.
- **Responsive Design:** Optimized for various screen sizes, ensuring a smooth user experience on both desktop and mobile devices.
- **Offline Support:** Access and manage your shopping lists even without an internet connection.
- **Multiple Lists:** Create and manage multiple shopping lists.
- **State Management:** Redux Toolkit is used to manage the application's state.
- **JSON Server Integration:** JSON Server is used as the backend for data storage.

## Technologies Used

- **ReactJS**: For building the user interface.
- **Redux Toolkit**: For managing application state.
- **Material-UI (MUI)**: For styling the application with pre-designed components.
- **JSON Server**: For simulating a REST API and managing the backend data.
- **Axios**: For making HTTP requests to the JSON Server.
- **HTML5 & CSS3**: For structuring and styling the application.

## Installation

### Prerequisites

- **Node.js** and **npm** should be installed on your system.
- JSON Server should be set up for local development.

### Clone the Repository

\`\`\`bash
git clone https://github.com/sphllzulu/shopify.git
cd shopping-list-app
\`\`\`

### Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Start the JSON Server & Run the application

\`\`\`bash
npm start
\`\`\`



Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

1. **Sign Up / Sign In**: Create an account or log in with your existing credentials.
2. **Create a List**: Start by creating a new shopping list.
3. **Add Items**: Use the floating action button to add items to your list.
4. **Edit or Delete Items**: Click the edit or delete icons next to each item to modify or remove them.
5. **Search & Filter**: Use the search bar or category icons to filter your items.
6. **Send List via Email**: Share your shopping list by clicking the send icon.

## File Structure

\`\`\`
├── public
├── src
│   ├── components
│   │   ├── ShoppingList.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── Carousel.jsx
│   │   └── ...
│   ├── features
│   │   ├── shoppingListSlice.js
│   │   ├── userSlice.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   ├── store.js
│   └── ...
├── db.json
├── package.json
└── README.md
\`\`\`

## Contributing

Contributions are welcome! If you have any suggestions, please feel free to create a pull request or submit an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


