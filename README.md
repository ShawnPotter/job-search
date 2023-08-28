# Welcome

This is a simple job search list application. The primary function of the application is for the user to input the company name and a url of their choice. My thought process is that you can go to a company website and apply what filters you want, which most career pages will display in the url, and then copy it and paste it into the URL input.

The application will submit the data to a MongoDB Atlas database and return the data to the list for use. Also displayed is a counter for when the page was last visited so you can make sure you stay on top of checking the companies you want work for. Edit and Delete buttons are also provided.

## Current Application Status

Currently the status is very much in development. The connection to MongoDB is only available on my localhost at the current time. The live production page shows the input fields but does not currently do anything.

### Future Development

1. Fully functional sign up, login, and logout functions.

   This is mostly finished but not quite done yet.

1. Pagination to enable faster loading of the database.

   Hopefully reducing load times to under 10 seconds required by my hobby Vercel account. Other workarounds might be need to be investigated and implemented.

1. Sample database for demonstration.

   I would like to show off my work in a more proper manner so there will be a sample database in the public facing version. I'm unsure how I want to approach this however because just allowing everyone and anyone, even if they sign up for an account, to add items to the list is a potential minefield and would naturally require moderation of varying degrees. Likely submitting, editing and deleting entries will be disabled on the public version to avoid abuse. I'm currently formulating strategies to handle this.

1. Individual account lists.

   If implemented, this will be a much later addition because it is outside the scope of the original project idea (which was just to make sure I was keeping on top of my job hunting).

### Technologies

Next.js, React, Typescript, MongoDB, Vercel

## Running the Next.js Project Locally

To run this Next.js project locally on your computer, follow these steps (this is a brief step by step and is assuming you have some previous experience forking and installing repositories):

### 1. Fork the Repository

1. Click the "Fork" button at the top right corner of this repository. This will create a copy of the repository in your GitHub account.

### 2. Clone the Repository

1. Open your terminal or command prompt.

2. Navigate to the directory where you want to store the project by using the `cd` command.

   ```shell
   cd your/preferred/directory
   ```

3. Clone the repository by running the following command, replacing `<your-username>` with your GitHub username:

   ```shell
   git clone https://github.com/<your-username>/repository-name.git
   ```

### 3. Connect the Repository to Your IDE

Choose your preferred Integrated Development Environment (IDE) to connect to the project. I recommend Visual Studio Code:

#### Visual Studio Code (VS Code)

1. Open VS Code.

2. Click on "File" > "Open Folder..." and select the folder where you cloned the repository.

### 4. Install Dependencies

1. Open the visual studio terminal.

2. Navigate to the project directory (the one you cloned in step 2) using the `cd` command if needed (shouldn't need to).

3. Run the following command to install project dependencies:

   ```shell
   npm install
   ```

## 5. Configure Environment Variables

1. In the root directory of your cloned project, create a file named `.env.local` if it doesn't already exist.

2. Open the `.env.local` file in the editor of your choice.

3. Add the following environment variables to the file:

   ```js
   MONGODB_URI = 'your-mongodb-uri'
   NEXT_PUBLIC_VERCEL_URL = 'http://localhost:3000'
   NEXTAUTH_URL = 'http://localhost:3000'
   NEXTAUTH_SECRET = 'your-secret-key'
   ```

   - Replace `your-mongodb-uri` with the actual MongoDB connection URI you intend to use for your project.
   - Ensure that `NEXT_PUBLIC_VERCEL_URL` and `NEXTAUTH_URL` are both set to `http://localhost:3000` for local development.
   - Replace `your-secret-key` with a strong and secure secret key for NextAuth.js authentication.

4. Save the `.env.local` file.

These environment variables are essential for configuring your Next.js project to work with MongoDB and NextAuth.js locally. Be sure not to share your secret key or sensitive information in your version control system. Always keep these values private.

### 6. Run the Development Server

1. After installing dependencies, you can start the development server by running the following command:

   ```shell
   npm run dev
   ```

2. The Next.js application should now be running locally. You can access it in your web browser by navigating to `http://localhost:3000`.

That's it! You've should have successfully set up and run the Next.js project locally on your machine.

**If you run into any issues regarding setup please create an issue and I'll help you through the setup.**
