import { useState} from "react"

type TProps = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const Form: React.FC<TProps> = ({setSearchTerm}) => {
  const [input, setInput] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchTerm(input)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input 
          placeholder="Поиск" 
          type="search" 
          name="search" 
          value={input}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Поиск</button>
    </form>
  )
}

export default Form
