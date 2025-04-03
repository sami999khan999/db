# Import the required functions from separate modules
from main import connect_to_db
from create_table import create_table

# Step 1: Establish connection to the database
connection = connect_to_db()

# Step 2: Create the 'users' table if it doesn't already exist
create_table(connection)

# Step 3: Insert a new user into the 'users' table
# Create a cursor object to execute SQL commands
cursor = connection.cursor()

# Execute the INSERT query with placeholders for the name and age
cursor.execute(
    """
    INSERT INTO users (name, age) VALUES (?, ?)
    """,
    ("Sami", 22),  # Values to be inserted into the 'name' and 'age' columns
)

# Step 4: Commit the transaction to save the changes to the database
connection.commit()

# Step 5: Close the connection after the operation is completed
connection.close()
