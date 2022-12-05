function findAccountById(accounts, id) {
  let result =  accounts.find((accountObj)=> accountObj.id === id);
  return result;
}

function sortAccountsByLastName(accounts) {
 return accounts.sort((accountA, accountB)=>{
    return accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase()? 1 : -1
  })
}

function getTotalNumberOfBorrows(account={}, books=[]) {
  // - return total number of times an acct id comes up in the books {borrow's object} array
  let total = 0;
  //LOOP THROUGH BOOKS ARRAY
  books.forEach(bookObj => {
    const {borrows} = bookObj 

  //LOOP THROUGH EACH borrowsOBJ FOR MATCHING ID TO THE ACCOUNT ID
  borrows.forEach(borrowObj=>{
    if (account.id === borrowObj.id) {
      total ++;
    }
  })
})
return total;
}



function getBooksPossessedByAccount(account, books, authors) {
  let booksbyId = books.filter(book => {
  return book.borrows.some(borrow => borrow.id === account.id && borrow.returned === false)
  });
  
  console.log(booksbyId)
  booksbyId = booksbyId.map(book => {
  let authorInfo = authors.find(author => author.id === book.authorId);
  book['author'] = authorInfo;
  return book
  // console.log(book)
  })
  return booksbyId;
}
  

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
