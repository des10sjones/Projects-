function searchBooks() {
    const query = document.getElementById('searchInput').value.trim();
    if (query === '') return;
  
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayBookList(data.items);
      })
      .catch(error => {
        console.error('There was a problem with the request:', error);
      });
  }
  
  function displayBookList(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
  
    books.forEach(book => {
      const title = book.volumeInfo.title;
      const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
      const bookItem = document.createElement('div');
      bookItem.classList.add('book-item');
      bookItem.innerHTML = `
        <h3>${title}</h3>
        <p>By ${authors}</p>
        <button onclick="showBookDetails('${book.id}')">Details</button>
      `;
      bookList.appendChild(bookItem);
    });
  }
  
  function showBookDetails(bookId) {
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayBookDetails(data);
      })
      .catch(error => {
        console.error('There was a problem with the request:', error);
      });
  }
  
  function displayBookDetails(book) {
    const bookDetails = document.getElementById('bookDetails');
    bookDetails.innerHTML = '';
  
    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
    const description = book.volumeInfo.description || 'No description available';
  
    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');
    bookInfo.innerHTML = `
      <h2>${title}</h2>
      <p>By ${authors}</p>
      <p>${description}</p>
      <button onclick="hideBookDetails()">Close</button>
    `;
    bookDetails.appendChild(bookInfo);
  
    bookDetails.style.display = 'block';
  }
  
  function hideBookDetails() {
    const bookDetails = document.getElementById('bookDetails');
    bookDetails.style.display = 'none';
  }
  