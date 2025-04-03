# Import the function to connect to the database
from main import connect_to_db

# Step 1: Establish a connection to the database
connection = connect_to_db()

# Step 2: Create a cursor object to execute SQL queries
cursor = connection.cursor()

# Step 3: Execute the DELETE query
# This will delete the user with id 13 from the 'users' table
cursor.execute(
    """
    DELETE FROM users WHERE id = ?
    """,
    (13,),  # The ID of the user to delete
)

# Step 4: Commit the transaction to apply the delete operation
connection.commit()

# Step 5: Close the connection
connection.close()
