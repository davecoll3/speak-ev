import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


# get terms function to retrive all terms from the database and render on home page
@app.route("/")
@app.route("/get_terms")
def get_terms():
    terms = list(mongo.db.terms.find().sort("term_name", 1))
    return render_template("terms.html", terms=terms)


# search function to search the terms database
@app.route("/search", methods=["GET", "POST"])
def search():
    query = request.form.get("query")
    terms = list(mongo.db.terms.find({"$text": {"$search": query}}))
    return render_template("terms.html", terms=terms)


# sign up function to add new users to the database
@app.route("/sign_up", methods=["GET", "POST"])
def sign_up():
    if request.method == "POST":
        # check if username already exists in the database
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            flash("Username already exists")
            return redirect(url_for("sign_up"))

        sign_up = {
            "username": request.form.get("username").lower(),
            "password": generate_password_hash(request.form.get("password"))
        }
        mongo.db.users.insert_one(sign_up)

        # put the new user into session cookie
        session["user"] = request.form.get("username").lower()
        flash("You have successfully signed up!")
        return redirect(url_for("profile", username=session["user"]))

    return render_template("sign-up.html")


# login function to find user's username and password on the database
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # check if username exists in the database
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            # ensure hashed password matches user input
            if check_password_hash(	
                existing_user["password"], request.form.get("password")):	
                    session["user"] = request.form.get("username").lower()	
                    flash("Welcome, {}".format(
                        request.form.get("username")))	
                    return redirect(url_for(
                        "profile", username=session["user"]))
            else:
                # invalid password match
                flash("Incorrect Username and/or Password")
                return redirect(url_for("login"))

        else: 
            # username doesn't exist
            flash("Incorrect Username and/or Password")
            return redirect(url_for("login"))

    return render_template("login.html")


# profile function to find session user's username
@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    # take the session user's username from the database
    username = mongo.db.users.find_one(
        {"username": session["user"]})["username"]

    if session["user"]:
        terms = list(mongo.db.terms.find().sort("term_name", 1))
        return render_template("profile.html", terms=terms, username=username)

    return redirect(url_for("login"))


# logout function to end user's session and delete session cookie
@app.route("/logout")
def logout():
    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("login"))


# add term function add new terms to dictionary
@app.route("/add_term", methods=["GET", "POST"])
def add_term():
    if request.method == "POST":
        # check if term already exists in database
        existing_term = mongo.db.terms.find_one(
            {"term_name": request.form.get("term_name").upper()})

        # check if term already exists as an alternative_name in database
        existing_alt_term = mongo.db.terms.find_one(
            {"alternative_name": request.form.get("term_name").upper()})

        if existing_term:
            flash("Sorry, this term already exists")
            return redirect(url_for("add_term"))

        elif existing_alt_term:
            flash("Sorry, this term already exists")
            return redirect(url_for("add_term"))

        term = {
            "term_name": request.form.get("term_name").upper(),
            "alternative_name": request.form.get("alternative_name").upper(),
            "term_definition": request.form.get("term_definition"),
            "created_by": session["user"],
            "created_on": datetime.today().strftime("%d-%b-%Y")
        }
        mongo.db.terms.insert_one(term)
        flash("Term Successfully Added to Dictionary")
        return redirect(url_for("get_terms"))

    return render_template("add_term.html",)


# edit term function find and edit an existing term on the dictionary
@app.route("/edit_term/<term_id>", methods=["GET", "POST"])
def edit_term(term_id):
    if request.method == "POST":
        # check if term already exists in the database
        existing_term = mongo.db.terms.find_one(
            {"term_name": request.form.get("term_name").upper()})

        # check if term already exists as an alternative_name in the database
        existing_alt_term = mongo.db.terms.find_one(
            {"alternative_name": request.form.get("term_name").upper()})

        if existing_term:
            flash("Sorry, this term already exists")
            return redirect(url_for("get_terms"))

        elif existing_alt_term:
            flash("Sorry, this term already exists")
            return redirect(url_for("get_terms"))

        submit = {"$set": {
            "term_name": request.form.get("term_name").upper(),
            "alternative_name": request.form.get("alternative_name").upper(),
            "term_definition": request.form.get("term_definition"),
            "created_by": session["user"],
            "created_on": datetime.today().strftime("%d-%b-%Y")
        }}
        mongo.db.terms.update_one({"_id": ObjectId(term_id)}, submit)
        flash("Term Successfully Updated on Dictionary")

    term = mongo.db.terms.find_one({"_id": ObjectId(term_id)})
    return render_template("edit_term.html", term=term)


# delete term function to delete a term from the database
@app.route("/delete_term/<term_id>")
def delete_term(term_id):
    mongo.db.terms.delete_one({"_id": ObjectId(term_id)})
    flash("Term Successfully Deleted fom Dictionary")
    return redirect(url_for("get_terms"))

if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)