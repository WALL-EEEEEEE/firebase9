import { SetStateAction, useDeferredValue, useEffect, useState } from 'react'
import './App.css'
import { initializeApp } from 'firebase/app'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, query, where, orderBy, serverTimestamp, DocumentReference, getDoc } from 'firebase/firestore'

type Book = {
  id?: string
  author: string
  title: string
}

// const firebaseConfig = {
//   apiKey: "AIzaSyAQoBjqsQbm-0Zw7sCxpEtb8sgj31hXWnQ",
//   authDomain: "fir-9-c149d.firebaseapp.com",
//   projectId: "fir-9-c149d",
//   storageBucket: "fir-9-c149d.appspot.com",
//   messagingSenderId: "315942202177",
//   appId: "1:315942202177:web:77217bd16604c570470fc0",
//   measurementId: "G-7Q0BDL0GH8"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDsooB17qabx4nXTU3dFyjYknT9gVJRjuw",
  authDomain: "fir-9-2-2b858.firebaseapp.com",
  projectId: "fir-9-2-2b858",
  storageBucket: "fir-9-2-2b858.appspot.com",
  messagingSenderId: "868628130158",
  appId: "1:868628130158:web:960f66da4679065244397f",
  measurementId: "G-YW6WBE7ET8"
};

//init firebase app
initializeApp(firebaseConfig)
//init service
const db = getFirestore()
//collection ref
const colRef = collection(db, 'books')
const q = query(colRef, orderBy('createdAt'))

async function addBook(book: Partial<Book>): Promise<void> {
  const _ = await addDoc(colRef, {
    ...book,
    createdAt: serverTimestamp()
  })
  console.log("a book added")
}
async function delBook(id: string): Promise<void> {
  const docRef = doc(db, "books", id)
  await deleteDoc(docRef)
}

async function ListBooks(): Promise<Book[]> {
  let books: Book[] = []
  try {
    const snapshot = await getDocs(colRef)
    for (const book of snapshot.docs) {
      books.push({ ...(book.data() as Book), id: book.id})
    }
  } catch (error) {
    throw new Error(`failed to fetch books: ${error}`)
  }
  return books
}
async function getBook(id: string): Promise<Book> {
   const docRef = doc(db, 'books', id)
   const docData =(await getDoc(docRef)).data() 
   if (!!!docData) {
      throw new Error(`book ${id} doesn't exist!`)
   }
   const book: Book = {
      ...(docData as Book),
      id: docData.id
   }
   return book
}
async function getBookBySnap(id: string, callback: ()=> void) {
   const docRef = doc(db, 'books', id)
   onSnapshot(docRef, (snapshot) => {
      const book = snapshot.data() as Book
      console.log(book)
   })
}

async function getBooks( callback: (books: Book[]) => void) {
   onSnapshot(q, (snapshot) => {
    let books: Book[] = []
    snapshot.docs.forEach((doc) => {
      books.push({...doc.data(), id: doc.id} as Book)
    })
    callback(books)
   })
}


function App() {
  const [bookList, setBookList] = useState<Book[]>([])

  useEffect(() => {
    getBooks((books) => {
      setBookList(books)
    }).catch((e) => {
      console.error(e)
    })
  }, [])
  const bookListComp = bookList.length < 1 ? (<></>) : bookList.map(item => {
    return (
      <div className='card book' key={item.id} >
        <span className='book-author'>
          <span className='prefix'>Author</span>
          <span> {item.author} </span>

        </span>
        <span className='book-title'>
          <span className='prefix'>Title</span>
          <span> {item.title} </span>
        </span>
        <button onClick={(e) => {
          const bookId = item.id
          console.log(item)
          console.log(bookId)
          delBook(bookId!).then(() => {
            console.log(`book ${bookId} deleted`)
          }).catch((e) => {
            console.log(`failed to delete ${bookId} (${e})`)
          })
        }}>Delete</button>
      </div>
    )
  });

  return (
    <>
      <div className='c-app'>
        <h1>Firebase Firestore</h1>

        <div className='c-book-list'>
          <h3>Book Shelf</h3>
          {bookListComp}
        </div>

        <div className="c-add-book">
          <form className='card' onSubmit={(e) => {
            e.preventDefault()
            const addBookForm = e.target as HTMLFormElement
            const title = addBookForm.title.value
            const author = addBookForm.author.value
            addBook({
              title: title,
              author: author,
            })
          }}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" required />
            <label htmlFor="author">Author</label>
            <input type="text" name="author" required />
            <button>add a new book</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
