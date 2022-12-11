function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// function getBooksBorrowedCount(books) {
//   let totalBooksOut = 0;
//   books.forEach(bookObj => {
//     const {borrows} = bookObj;
//     let isBookOutNow = borrows.some(borrowObj =>{
//       return borrowObj.returned == false;
//     })
//     if (isBookOutNow === true){
//       totalBooksOut ++;
//     }
//   })
//   return totalBooksOut;
// }


function getBooksBorrowedCount(books) {
  const total= books.reduce((accumulator, bookObj) => {
    const {borrows} = bookObj;
    let isBookOutNow = borrows.some((borrowObj) => {
      return borrowObj.returned === false;
    })
    if (isBookOutNow === true) {
      accumulator ++;
    }
    //reduce callback fn needs to return the accumulator
    return accumulator
  },0)
  return total;
}

function getMostCommonGenres(books) {
  let genreLookUp ={}
  // loop through each book object of the books array 
  books.forEach(bookObj=>{
  // for each book I want to pull the genre value out and put it in a new object called genreLookUp
  // console.log(genreLookUp) -- to see if the previous line pulled all the values and placed it on the new object(genreLookUp)
  // if the genre is not listed then it should add that new item to genreLookUp and give the genreCounter a value of 1
  //console.log(genreCounter)
  // if the genre is already in genreLookUp then the genreCounter should increment by 1 
    const {genre} = bookObj;
    if (genreLookUp.hasOwnProperty(genre)) {
      genreLookUp[genre] +=1;
    } else {
      genreLookUp[genre] = 1;
    }
  })
  // console.log("genreLookUp",genreLookUp)
  const genreArray = Object.keys(genreLookUp)
 
  // console.log(Object.keys(genreLookUp))

  let result = genreArray.map(genre=>{
        let count = genreLookUp[genre]
        let currentObj = {name: genre, count: count};
          return currentObj
    })
    // console.log("result", result)
  return result.sort((a,b)=>b.count-a.count).slice(0,5);
}

function getMostPopularBooks(books=[]) {
  books.sort((bookObjA,bookObjB)=>{
   return bookObjB.borrows.length - bookObjA.borrows.length;
  })
  let topFiveBooks = books.map(bookObj =>{
    const {title, borrows}= bookObj;
    let newObj = {name: title, count: borrows.length};
    
    return newObj;
  })
  return topFiveBooks.slice(0,5);
}

function getMostPopularAuthors(books=[], authors=[]) {
 //  1. sort through books & return top 5 most pop books
     books.sort((bookObjA,bookObjB)=>{
      return bookObjB.borrows.length - bookObjA.borrows.length;
     })
     let topFiveBooks = books.slice(0,5)  
  console.log(topFiveBooks)
    
  // 2. map through top five 
     // 2a. find author from books.authorId and return match from authors.id 
  let topAuthors = topFiveBooks.map(topFiveObj=>{
    const {authorId, borrows} = topFiveObj

    let foundAuthor = authors.find(authorObj=>{
      return (authorId === authorObj.id);
    })
    // 3. create and use helper function for the author name
    let authorName = helperJoinFirstAndLastNames(foundAuthor.name.first, foundAuthor.name.last)
    // 4. create obj for authorName 
    let authorNameObj = {name: authorName, count: borrows.length};
    return authorNameObj;
  })
  return topAuthors;
}
function helperJoinFirstAndLastNames(first, last) {
  return `${first} ${last}`
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
