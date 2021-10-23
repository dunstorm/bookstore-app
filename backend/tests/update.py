import requests

data = {
    "id": "11",
    "title": "A Changed Title",
    "author": "A Test Author",
    "image": "http://testimage",
    "description": "test description",
    "rating": "5",
    "tags": "Fiction, Another Tag"
}

r = requests.put("http://localhost:4000/v1/book", json=data)
print(r.text)
