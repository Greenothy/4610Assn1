import { useState, useEffect, FormEvent } from 'react'
import './App.css'

interface Quote {
  author: string
  content: string
  _id: string
}

function App() {
  const [name, setName] = useState('');
  const [quotes, setQuotes] = useState<Quote[]>([]);

  async function loadRandomQuote() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const quote = await result.json();
    setQuotes([quote]);
  } 

  useEffect(() => {
    loadRandomQuote()
  }, []);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const search = "https://usu-quotes-mimic.vercel.app/api/search?query=" + name;
    const result = await fetch(search);
    const resultsQuotes = await result.json();
    setQuotes(resultsQuotes.results)
  }

  return (

    <div>
      <div className='title stuff-box'>
        <h1>Quotable</h1>
        <h3>Search Notable Quotes by Author</h3>
      </div>
      <div>
        <form onSubmit={e => submitRequest(e)}>
          <input type="text" value={name} placeholder='Benjamin Franklin' onChange={e => setName(e.target.value)}/>
        </form>
      </div>
      <div>
        {
          quotes.map((quote) => (
            <div key={quote._id} className='quote stuff-box'>
              <h2>{quote.content}</h2>
              <h4>--{quote.author}</h4>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
