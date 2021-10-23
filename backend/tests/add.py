import requests

data = {
    "id": "1",
    "title": "A Test Book 2",
    "author": "A Test Author",
    "image": "http://testimage",
    "description": "test description",
    "rating": "5",
    "tags": "Fiction, Another Tag"
}

r = requests.post("http://localhost:4000/v1/book", json=data)
print(r.json())
