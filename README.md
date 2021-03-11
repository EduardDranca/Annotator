# Annotator

Image annotation application for image labeling in the context of AI assisted image recognition.
The app uses the Electron framework for the Desktop app, Angular for the UI, and PixiJS for handling graphics. Python is used for the back-end services and will also be used for Artificial Intelligence object recognition inside the app.

# Install & Use
## Installation
* Use `npm install` to install the node modules.
* Run the python venv activation script in src/server/Scripts.
* Install python dependencies with `pip install -r requirements.txt` inside the server folder.
## Running
* Start the server in a shell with the activated python venv: `python src/server/src/server.py`.
* Start the app with `npm start`.
