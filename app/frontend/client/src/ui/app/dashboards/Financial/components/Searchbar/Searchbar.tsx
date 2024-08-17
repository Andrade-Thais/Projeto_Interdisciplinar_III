import { useState } from 'react'
import { Button, TextInput } from 'flowbite-react'

export default function Searchbar({handleSearch}) {
  const [searchInput, setSearchInput] = useState('')

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  }

  const handleButtonClick = () => {
    handleSearch(searchInput);
  }

  return (
    <div className='flex my-4 justify-center mx-auto'>
      <TextInput type="search" placeholder="Pesquise uma receita ou despesa por título..." className="w-8/12" onChange={handleInputChange}/>
      <Button className="bg-primary" type='button' onClick={handleButtonClick}>Pesquisar</Button>
    </div>
  )
}