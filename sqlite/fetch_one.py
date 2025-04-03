# Import the function to connect to the database
from main import connect_to_db

# Step 1: Establish a connection to the database
connection = connect_to_db()

# Step 2: Create a cursor object to execute SQL queries
cursor = connection.cursor()

# Step 3: Execute the SELECT query to retrieve the user with a specific name
cursor.execute(
    """
    SELECT * FROM users WHERE name = ?
    """,
    ("Sami",),  # The name of the user to search for
)

# Step 4: Fetch all matching records from the result of the query
user = cursor.fetchall()

# Step 5: Close the connection after retrieving the data
connection.close()

# Step 6: Print the user's information
print(user)
