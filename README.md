# SYM-CHECKER, A Symptom Checker

## Description
Sym-Checker is a web application that allows a user to input symptoms and returns to the user the list of probable diseases.

## Features
- Allow user inputs for age, county, gender and symptoms
- View list of possible diseases

## Technologies Used
- HTML
- CSS
- Plain JavaScript
- JSON Server

## Setup and Installation
1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install JSON Server if you haven't already:
   ```
   npm install -g json-server
   ```
4. Start the JSON Server:
   ```
   json-server --watch db.json
   ```
5. Open the `index.html` file in your web browser.

## Usage
- When you open the app, you'll see a landing page.
- Click on the button "GET STARTED".
- Proceed to input your details in the form provided.
- Check symptom.

## API Endpoints
The app uses the following API endpoints:
- GET /diseases - returns a list of all diseases
- GET /diseases/:id - returns details for a specific disease

## License
This project is licensed under the APACHE License.