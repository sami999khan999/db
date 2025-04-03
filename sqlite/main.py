# SQLite Database Connection in Python

# Importing the sqlite3 module
import sqlite3


# Function to connect to an SQLite database
# The function takes an optional argument `db_name`, which specifies the name of the database file.
# If no argument is passed, it defaults to "data.db".
def connect_to_db(db_name="data.db"):
    # Establish a connection to the SQLite database
    # If the database file does not exist, it will be created.
    connection = sqlite3.connect(db_name)

    # Return the connection object to interact with the database
    return connection


# Example usage:
# connection = connect_to_db("my_database.db")
# This would create or connect to the "my_database.db" file.
