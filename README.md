<h2>Description</h2>

A school management system with registered user and admin roles, in addition to unregistered user. Functionality for viewing and searching schools as well as registering pupils and making requests for them to join specific schools on the user side and adding, removing and updating schools, as well as confirming requests, on the admin side.

Pupil's date of birth automatically extracted, appropriately formatted and stored on the database from the pupil's personal ID code.

React.js used for frontend and Laravel for backend. Used token-based authentication with sanctum, in addition to protected routes on the frontend.

This is the frontend repository. You can access the backend repository <a href = "https://github.com/mykolasbar/ugdymo_istaigos/">here</a>.

<h2>Instructions for launch</h2>

<h2>Functionality</h2>

<ul>
    <li>User roles:<li>
        <ul>
            <li>Unregistered user</li>
            <li>Registered user</li>
            <li>Admin</li>
        </ul>
    <li>Unregistered user:</li>
        <ul>
            <li>View schools</li>
            <li>Search schools (by their name)</li>
        </ul>
    <li>Regular user:</li>
        <ul>
            <li>View schools</li>
            <li>Search schools (by their name)</li>
            <li>Add one or more pupils</li>
            <li>Send a request for a pupil to be registered to a particular school</li>
        </ul>
    <li>Admin</li>
        <ul>
            <li>Add, update, delete schools</li>
            <li>Add pupils</li>
            <li>See list of incoming requests</li>
            <li>Confirm pupil requests</li>
        </ul>
</ul>

<h2>Launch instructions</h2>

The project is not deployed online, so in order to view it, you will have to download it from github and launch it on the live server.

<ul>
    <li>Launch your apache server and MySQL</li>
    <li>Clone or download the github repository</li>
    <li>Import the database (Dump20221021 file in the downloaded repository) with MySQL Workbench or similar software</li>
    <li>Launch the development server for the backup section on port http://127.0.0.1:8000/ (instructions <a href = "https://github.com/mykolasbar/ugdymo_istaigos/">here</a>)</li>
    <li>In case your do not have it, install npm (node package manager) and launch the development server from the app directory with your cli (npm start). The user page should load</li>
    <li>To reach the admin section, register an account (http://localhost:3000/register) and login with your credentials</li>
</ul>


Made by Mykolas Baranauskas. <a href = "https://www.linkedin.com/in/mykolas-baranauskas-b3809b110/" target = "_blank">Linkedin</a>.