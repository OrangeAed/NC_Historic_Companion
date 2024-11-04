# North Carolina Historic Companion

## Description

The North Carolina Historic Companion is a web application designed to provide users with an interactive experience of
historic sites in North Carolina. The application has two main interfaces:

- **Visitor Side UI**: Allows users to browse and explore various tours, view detailed descriptions, and access
  multimedia content such as images and audio files related to each tour.
- **Admin Side UI**: Enables administrators to create, update, and manage tours. Admins can add titles, descriptions,
  images, and audio files for each tour, ensuring the content is up-to-date and engaging.

## Software Architecture

The application is built using the following technologies:

- **Frontend**: React and TypeScript for building a responsive and interactive user interface.
- **Backend**: Node.js and Express for handling API requests and serving static files.
- **Database**: JSON-based storage for simplicity and ease of use.
- **Styling**: CSS and a little bit of bootstrap for styling the components and pages.

The frontend and backend communicate via RESTful APIs, ensuring a clear separation of concerns and maintainability.

## Installation

To install the application, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/OrangeAed/nc-historic-companion.git
    cd NC_Historic_Companion
    ```

2. **Install NVM (Node Version Manager)**:
   Follow the instructions on the [NVM GitHub page](https://github.com/nvm-sh/nvm#installing-and-updating) to install
   NVM.

3. **Install the latest version of Node.js and npm**:
    ```sh
    nvm install node
    nvm use node
    ```

4. **Install project dependencies**:
    ```sh
    npm install
    ```

## Starting the Application

To start the application, run the following commands in three seperate terminals. You will need to run these in
nc-historic-companion directory for them to work. To see the full commands, look in the package.json file in the
nc-historic-companion directory.:

- **Start the development server**:
    ```sh
    npm run dev  # This will start up the visitor side UI
    ```

- **Start the backend server**:
    ```sh
    npm run dev:server  # This will start up the admin side UI
    ```

- **Start the production build**:
    ```sh
    npm run start  # This will set up the backend server which both sides need to function
    ```

These commands will start the application, allowing you to access the visitor and admin interfaces through your web
browser.

## Contributing

We welcome contributions to the North Carolina Historic Companion project! To ensure a smooth collaboration, please
follow these guidelines:

### How to Contribute

1. **Fork the Repository**: Start by forking the repository to your GitHub account.
    ```sh
    git clone https://github.com/your-username/nc-historic-companion.git
    cd nc-historic-companion
    ```

2. **Create a Branch**: Create a new branch for your feature or bug fix.
    ```sh
    git checkout -b <feature-or-bugfix-name>
    ```

3. **Make Changes**: Implement your changes in the codebase. Ensure your code follows the project's coding standards and is well documented.

4. **Commit Changes**: Commit your changes with a clear and concise commit message.
    ```sh
    git add .
    git commit -m "Description of the feature or fix"
    ```

5. **Push to GitHub**: Push your changes to your forked repository.
    ```sh
    git push origin <feature-or-bugfix-name>
    ```

6. **Create a Pull Request**: Go to the original repository and create a pull request from your forked repository.
   Provide a detailed description of your changes and any related issues.

### Code Style

- Follow the existing code style and conventions.
- Ensure your code is well-documented.
- Run `npm run lint` to check for any linting errors.

### Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub. Provide as much detail as possible to help
us understand and address the issue.
Your issue should include a description of the bug, what the intended behaviour should be, and the steps to reproduce
the bug.

Thank you for contributing to the North Carolina Historic Companion project!
