# Event-blog-app


The Event & Blog Management System is a robust RESTful API designed to facilitate the creation, management, and display of events and blogs. With distinct user roles – admin and normal user – it ensures seamless collaboration and control over content.


## Features

## User Authentication
Seamlessly implemented user authentication for both admin and normal users, ensuring secure access to the platform through signup and login functionalities.

## Event Creation
Empowers normal users to create events effortlessly by furnishing details such as title, description, date, time, location (with latitude and longitude), website link, event photos, and category.

## Admin Approval
Provides admin with a comprehensive panel to verify, approve, and manage users. Admins can take actions like blocking, unblocking, or permanently deleting users, thereby maintaining platform integrity.

## Blog Section
Offers users a Medium-like experience to express themselves through blogs. Users can craft blogs with titles, content, authors, predefined or manually added categories, and tags.

## Content Display
Ensures all approved events and blogs are prominently displayed on the home screen of the mobile application, offering users easy access to relevant and engaging content.

## Filtering
Enhances user experience by enabling filtering of events based on date, time, location, and categories. Similar functionality is extended to blogs, allowing users to filter them by category and tags.

## Technologies Used
- **Node.js:** Server-side runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MySql:** For storing data 
- **JWT:** JSON Web Token for secure authentication.
- **Bcrypt:** Password hashing for enhanced security.
- **Joi:** For validation.

# Installation and Setup

To set up the application locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Anshul194/Event-blog-app.git
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file based on the provided `.env.example` file and configure necessary environment variables such as  JWT secret key, etc.

4. **Run the application:**
    ```bash
    npm run dev
    ```

5. **Access the application in your web browser:**
    ```bash
    http://localhost:5001
    ```

## NOTE

If you encounter any issues or have suggestions for improvements, please create an issue or reach out to me on [LinkedIn](https://www.linkedin.com/in/YourLinkedInProfile/).

## Requests

- If you find any bugs, please create an issue; I would love to solve them.
- If you have suggestions or want new features, feel free to create an issue with the "feature" label.
