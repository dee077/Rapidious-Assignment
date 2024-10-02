import pandas as pd
from opensearchpy import OpenSearch

# Connect to OpenSearch
client = OpenSearch(
    hosts=[{'host': 'localhost', 'port': 9200}],
    http_auth=('admin', 'admin'), 
    use_ssl=False
)

# Load the dataset
df = pd.read_csv('data/data.csv') 

# Function to clean the document data
def clean_doc(recipe):
    try:
        # Start with the predefined fields
        doc = {
            'title': str(recipe.get('title', 'Unknown Title')),
            'rating': float(recipe.get('rating', 0)) if not pd.isna(recipe.get('rating')) else 0,       
            'calories': float(recipe.get('calories', 0)) if not pd.isna(recipe.get('calories')) else 0,   
            'protein': float(recipe.get('protein', 0)) if not pd.isna(recipe.get('protein')) else 0,     
            'fat': float(recipe.get('fat', 0)) if not pd.isna(recipe.get('fat')) else 0,
            'sodium': float(recipe.get('sodium', 0)) if not pd.isna(recipe.get('sodium')) else 0
        }

        keywords = []

        # Iterate over other columns and check if value is 1
        for column in recipe.index:
            if column not in ['title', 'rating', 'calories', 'protein', 'fat', 'sodium']: 
                value = recipe.get(column, 0)
                if value == 1:
                    keywords.append(column)

        # Add keywords to the document if any are found
        if keywords:
            doc['keywords'] = keywords

        return doc

    except (ValueError, TypeError) as e:
        print(f"Data parsing error for recipe: {recipe}. Error: {e}")


MAX_INDEX = 100000
indexed_count = 0

# Ingest data into OpenSearch
for index, row in df.iterrows():
    # Clean the document data
    document = clean_doc(row)

    # Only index if document is valid and max limit not reached
    if document and indexed_count < MAX_INDEX:
        try:
            response = client.index(index='recipes', body=document)
            print(f"Indexed document ID: {response['_id']}")
            indexed_count += 1 
        except Exception as e:
            print(f"Failed to index document {index}: {e}")
            print(document)
            raise RuntimeError(f"Indexing failed at document {index}. Stopping the process.")

    # Break the loop if the maximum limit is reached
    if indexed_count >= MAX_INDEX:
        print(f"Reached the maximum limit of {MAX_INDEX} indexed documents.")
        break

print(f"Total documents indexed: {indexed_count}")

# Create a new index named 'unique'
unique_keys = df.columns.difference(['title', 'rating', 'calories', 'protein', 'fat', 'sodium']).tolist()

# Prepare the document for the 'unique' index
unique_doc = {
    'unique_keys': unique_keys
}

try:
    # Index the unique keys document
    response = client.index(index='unique', body=unique_doc)
    print(f"Indexed unique document ID: {response['_id']}")  # Log the document ID
except Exception as e:
    print(f"Failed to index unique document: {e}")