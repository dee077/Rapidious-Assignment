# Rapidious Assignment Submission ✅

This project involves ingesting a large dataset of recipe information into OpenSearch for efficient search and retrieval. The dataset includes various recipe attributes such as title, rating, calories, and ingredients. The goal of this assignment is to index the data into OpenSearch, handle any inconsistencies in the dataset, and ensure that the indexing is done in an efficient manner, especially when dealing with large volumes of data and showing them on frontend.

## Features

- **Data Cleaning and Ingestion**: The script reads a dataset of recipes, cleans the data, and indexes it into OpenSearch.
- **Error Handling**: The script gracefully handles various types of errors, such as missing or malformed data, ensuring that invalid documents are not indexed.
- **Field Customization**: Only specific fields like `title`, `rating`, `calories`, `protein`, `fat`, `sodium`, and relevant `keywords` are indexed.
- **Limit on Document Indexing**: The script includes a mechanism to stop indexing once a predefined limit of documents (e.g., 100,000) is reached.
- **Unique Key Indexing**: The script also indexes a set of unique keywords found in the dataset into a separate index for future reference.
  **API for Data Filtering**: Developed APIs that allow filtering the indexed data based on various field `keywords`. This enables dynamic querying.
- **Searchable Table**: Created a table to display the indexed recipe data with pagination support.
- **Multi-Tag Search Filtering**: Implemented a frontend feature where users can apply multiple tags to filter the table data dynamically, making it easier to search for specific recipes.
- **Pagination**: Added pagination functionality to handle large data sets and improve user navigation within the table.

## Installation and Setup

Follow these steps to set up and run the project:

### Prerequisites

- Python 3.12 or higher
- Docker and Docker Compose
- OpenSearch running on `localhost:9200` (or any other preferred port)
- A dataset in CSV downloaded from kaggle

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/dee077/Rapidious-Assignment.git
   cd Rapidious-Assignment
   cd Django_Backend
   ```

2. **Set Up Virtual Environment**

   ```bash
   python -m venv venv
   source venv/bin/activate   # For Linux/MacOS
   .\venv\Scripts\activate    # For Windows
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run OpenSearch Using Docker Compose**

   ```bash
   docker-compose up opensearch --build -d
   ```

   This command builds and runs the OpenSearch service and ensure OpenSearch is running and accessible at `localhost:9200`.

5. **Run Data Ingestion Script**

   ```bash
   python ingest_data.py
   ```
   This will index each entry one by one so it may take some time to complete.

6. **Run Backend Application**

   ```bash
   python manage.py runserver
   ```

7. **Run Frontend Application**
   ```bash
   cd react_frontend
   npm i
   npm start
   ```

## API Endpoints

The application provides several API endpoints to interact with the data stored in OpenSearch. Below are the available endpoints:

### 1. **GET `http://localhost:8000/`**

- **Description:** Fetch all recipes.
- **Response:**
  ```json
  [
    {
      "title": "Old-Fashioned Crawfish Boil",
      "rating": 3.75,
      "calories": 862,
      "protein": 104,
      "fat": 11,
      "sodium": 7887,
      "keywords": ["boil", "corn", "family reunion", "lemon", "mardi gras", "potato", "shellfish", "spice", "spring"]
    },
    ...
  ]
  ```

### 2. **POST /api/recipes_filter**

- **Description:** Filter the data with keyword and adds pagination.
- **Request Body:**
  ```json
  {
    "page": 1,
    "size": 10,
    "keywords": ["boil"]
  }
  ```
- **Response:**
  ```json
  [
    {
      "title": "Old-Fashioned Crawfish Boil",
      "rating": 3.75,
      "calories": 862,
      "protein": 104,
      "fat": 11,
      "sodium": 7887,
      "keywords": ["boil", "corn", "family reunion", "lemon", "mardi gras", "potato", "shellfish", "spice", "spring"]
    },
    ...
  ]
  ```

### 3. **GET /api/recipes/unique-keys**

- **Description:** Fetch unique keywords from all recipes.
- **Response:**
  ```json
  {
    "unique_keywords": [
      "boil",
      "corn",
      "family reunion",
      "lemon",
      "mardi gras",
      "potato",
      "shellfish",
      "spice",
      "spring"
      ...And More
    ]
  }
  ```

### Note:

Ensure that the server is running and that the API endpoints are accessible at `http://localhost:8000/` (or your configured port).

## Conclusion

All components of the project are ready for submission, and the application has been built according to the requirements as per the assignment documents. 

Please review the implementation, and I look forward to discussing it further in the next round of the interview process. Thank you for the opportunity!