function findAuthorById(authors, id) {
  return authors.find((authorObj)=> authorObj.id === id)

}

function findBookById(books, id) {
  return books.find((bookObj)=> bookObj.id === id)

}

function partitionBooksByBorrowedStatus(books) {
  let bookReturnedNow = books.filter((booksObj)=>{
    const {borrows} = booksObj;
     let isReturnedNow = borrows.every((currentBookStatus)=>{
         return currentBookStatus.returned === true;
        })
    return isReturnedNow;
  
})

let bookOutNow = books.filter((booksObj)=>{
    const {borrows} = booksObj;
    let isOutNow = borrows.some((currentBookStatus)=>{
        return currentBookStatus.returned === false;
    })
    return isOutNow;
})

return [bookOutNow, bookReturnedNow];
}

function getBorrowersForBook(book, accounts) {
  const {borrows} = book;
    let result = borrows.map((bookObj)=>{
        let foundAccount = accounts.find((accountObj)=>{
            return bookObj.id === accountObj.id
        })

        foundAccount.returned = bookObj.returned

        return foundAccount;
    })
    return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
