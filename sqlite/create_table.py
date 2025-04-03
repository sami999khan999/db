# SQLite Table Creation in Python


# Function to create a table in the SQLite database
def create_table(connection):
    # Create a cursor object to execute SQL queries
    cursor = connection.cursor()

    # Execute an SQL query to create the 'users' table if it doesn't already exist
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,       
            name TEXT NOT NULL,            
            age INTEGER NOT NULL           
        )
        """
    )

    # Commit the changes to save the table to the database
    connection.commit()


# Example usage:
# connection = connect_to_db("my_database.db")
# create_table(connection)
