# Import the function to connect to the database
from main import connect_to_db

# Step 1: Establish a connection to the database
connection = connect_to_db()

# Step 2: Create a cursor object to execute SQL queries
cursor = connection.cursor()

# Step 3: Execute the UPDATE query to change the user's name
cursor.execute(
    """
    UPDATE users 
    SET name = ?
    WHERE id = ?
    """,
    ("Khan", 4),  # New name and the ID of the user to update
)

# Step 4: Commit the transaction to apply the changes
connection.commit()

# Step 5: Close the connection
connection.close()
