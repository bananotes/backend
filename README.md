# Entry API Documentation

Base URL: `http://localhost:3000`

## Endpoints

### 1. Create Entry

Create a new entry (note) in the system.

- **URL:** `/entry`
- **Method:** `POST`
- **Headers:** 
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "author": "user123",
    "content": "This is a new note.",
    "position": {
      "x": 100,
      "y": 150
    },
    "size": {
      "width": 200,
      "height": 100
    },
    "url": "https://example.com/page1"
  }
  ```
- **Success Response:**
  - **Code:** 201 Created
  - **Content:**
    ```json
    {
      "userId": "user123",
      "entries": ["entry1", "entry2"],
      "invisibleEntries": ["entry5", "entry9"]
    }
    ```
- **Error Response:**
  - **Code:** 400 Bad Request
  - **Content:** `{ "error": "Invalid input data" }`

### 2. Get Entries

Retrieve entries based on specified criteria.

- **URL:** `/entries`
- **Method:** `GET`
- **Query Parameters:**
  - `url`: The URL associated with the entries
  - `author`: The author of the entries
  - `density`: The density parameter (purpose unspecified in the provided data)
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** `["entry1", "entry2", "entry3"]`

### 3. Update Entry

Update an existing entry.

- **URL:** `/entry/{entryId}`
- **Method:** `PUT`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "content": "Updated note content.",
    "position": {
      "x": 120,
      "y": 160
    },
    "size": {
      "width": 220,
      "height": 120
    }
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "id": "entry456",
      "author": "user123",
      "content": "Updated note content.",
      "position": {
        "x": 120,
        "y": 160
      },
      "size": {
        "width": 220,
        "height": 120
      },
      "url": "https://example.com/page1",
      "createTime": "2024-09-28T13:00:00Z",
      "updateTime": "2024-09-28T14:00:00Z",
      "isDeleted": false
    }
    ```
- **Error Response:**
  - **Code:** 404 Not Found
  - **Content:** `{ "error": "Entry not found." }`

### 4. Delete Entry

Delete an existing entry.

- **URL:** `/entry/{entryId}`
- **Method:** `DELETE`
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "message": "Entry successfully deleted.",
      "id": "entry456",
      "isDeleted": true
    }
    ```
- **Error Response:**
  - **Code:** 404 Not Found
  - **Content:** `{ "error": "Entry not found." }`

### 5. Like Entry

Like an entry.

- **URL:** `/entry/like`
- **Method:** `POST`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "entryId": "entry456"
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** `{ "likes": 5 }`
- **Error Response:**
  - **Code:** 403 Forbidden
  - **Content:** `{ "error": "User has already liked this entry." }`

### 6. Unlike Entry

Remove a like from an entry.

- **URL:** `/entry/unlike`
- **Method:** `POST`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "entryId": "entry456"
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** `{ "likes": 4 }`
- **Error Response:**
  - **Code:** 403 Forbidden
  - **Content:** `{ "error": "User has not liked this entry." }`

### 7. Dislike Entry

Dislike an entry.

- **URL:** `/entry/dislike`
- **Method:** `POST`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "entryId": "entry456"
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** `{ "dislikes": 3 }`
- **Error Response:**
  - **Code:** 403 Forbidden
  - **Content:** `{ "error": "User has already disliked this entry." }`

### 8. Undislike Entry

Remove a dislike from an entry.

- **URL:** `/entry/undislike`
- **Method:** `POST`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "entryId": "entry456"
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** `{ "dislikes": 2 }`
- **Error Response:**
  - **Code:** 403 Forbidden
  - **Content:** `{ "error": "User has not disliked this entry." }`

# // TODO Feature

### 9. Hide Entry

Make an entry invisible to the user.

- **URL:** `/entry/invisible`
- **Method:** `POST`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "entryId": "entry456"
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** `{}`
- **Error Response:**
  - **Code:** 403 Forbidden
  - **Content:** `{ "error": "Entry is already invisible for this user." }`

### 10. Show Hidden Entry

Make a hidden entry visible to the user.

- **URL:** `/entry/visible`
- **Method:** `POST`
- **Headers:**
  - Content-Type: application/json
- **Body:**
  ```json
  {
    "entryId": "entry456"
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** `{}`
- **Error Response:**
  - **Code:** 403 Forbidden
  - **Content:** `{ "error": "Entry is not invisible for this user." }`
