environment required: MySQL, Python 3, npm, MAC OS

1. Firstly, install MySQL on the computer and set the password as ‘19961013’. If you have already set up MySQL, and have your own password for the database, change the password in configure.py in the backend folder to your own password in the following code
DIALECT = 'mysql'
DRIVER = 'pymysql'
USERNAME = 'root'
PASSWORD = '19961013' (or your own password)
HOST = 'localhost'
PORT = '3306'
DATABASE = 'cs3900'

2. After installing MySQL, entering the operation interface of MySQL using the terminal by command ‘mysql -u root -p’. It is necessary to create a database called ‘cs3900’ using command ‘create database cs3900;’.

3. Enter the backend folder, configure the database with the data_model.sql file to set up data by command ‘mysql -u root -p cs3900 < data_model.sql’


In the backend folder, input the command ‘pip3 install -r requirements.txt’ or 'pip install -r requirements.txt' (depending on the pip/python edition) to configure the libraries required in the project.

Then, enter the frontend folder, and input ‘npm i’ to install required modules. After completing this step, input ‘npm run build’ to set up the environment.

So far, the environment for the website has been configured. To run the project, enter the backend folder and input python3 app.py in the terminal. The website should run at the address 127.0.0.1:5000. Input the address in the browser, you will see the login page.

The instruction with pictures can be found in our project report.

