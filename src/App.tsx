import { useState, useEffect, FormEvent } from 'react'
import './App.css'

interface Quote {
  author: string
  content: string
  _id: string
}

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('');
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

  async function loadRandomQuote() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const quote = await result.json();
    console.log(quote)
    setQuotes([quote]);
  } 

  useEffect(() => {
    loadRandomQuote()
  }, []);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(name)
    const search = "https://usu-quotes-mimic.vercel.app/api/search?query=" + name;
    console.log(search)
    const result2 = await fetch(search);
    const resultsQuotes = await result2.json();
    setQuotes(resultsQuotes.results)
    console.log(resultsQuotes.results);
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
