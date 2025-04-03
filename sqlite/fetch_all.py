# Import the function to connect to the database
from main import connect_to_db

# Step 1: Establish a connection to the database
connection = connect_to_db()

# Step 2: Create a cursor object to execute SQL queries
cursor = connection.cursor()

# Step 3: Execute the SELECT query to retrieve all users
cursor.execute(
    """
    SELECT * FROM users
    """
)

# Step 4: Fetch all the records from the result of the query
users = cursor.fetchall()

# Step 5: Close the connection after fetching the data
connection.close()

# Step 6: Print the list of users
print(users)
