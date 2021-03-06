import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router'
// import { Listbox } from '@headlessui/react'
import axios from 'axios'
import { t } from 'i18next'
import { AuthContext } from '../context/AuthContext'

function Meters() {
  // const sortCriteria = {
  //   "number": "Sort By Number",
  //   "distance": "Sort By Distance"
  // }
  // const [sortBy, setSortBy] = useState('...')
  const [meters, setMeters] = useState([])
  const [keyphrase, setKeyphrase] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()


  const fetchMeters = () => {
    const authConfig = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      }
    }
    setLoading(true)
    axios.get('/api/watermeters', authConfig)
    .then(res => {
      setMeters(res.data)
    })
    .catch(e => console.log(e))
    .finally(() => {setLoading(false)})
  }

  // useEffect initialize
  useEffect(fetchMeters, [])

  // TODO useEffect sort by

  function searchMeters(keyphrase) {
    if (keyphrase) {
      const authConfig = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        }
      }
      setLoading(true)
      axios.post('/api/search/watermeters/', {keyphrase: keyphrase}, authConfig)
      .then(res => {
        setMeters(res.data)
      })
      .catch(e => console.log(e))
      .finally(() => {setLoading(false)})
    }
  }

  return (
    <div className='mx-auto md:w-2/3 w-full'>
      {/** search box */}
      <div className="flex flex-grow content-center">
        <input className="text-sm rounded-md ml-auto mr-2 my-auto py-2 pl-10 pr-3 w-3/4" 
          type="search" id="search" placeholder={t('meter.search.placeholder')} 
          value={keyphrase}
          onChange={e => { setKeyphrase(e.target.value) }} 
          onKeyDown={e => {if (e.key === 'Enter') {searchMeters(keyphrase)} }}/>
        <button
          type="button"
          className="mx-2 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-300 rounded-md hover:bg-blue-100 "
          onClick={() => {setKeyphrase(''); fetchMeters()}} >
          {t('meter.search.button.clear')}
        </button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 my-3">
      {/** sort by list box 
        <div className="relative col-start-3 col-span-1 md:col-start-5 md:col-span-2">
        <Listbox value={0} onChange={setSortBy}>
          <Listbox.Button className="relative w-full p-2 bg-yellow-400 hover:bg-yellow-200 rounded-md">{"Sort by " + sortBy}</Listbox.Button>
          <Listbox.Options className="absolute w-full position p-2 mt-2 bg-yellow-300 rounded-md">
            {Object.keys(sortCriteria).map((k, i) => {
              return (
              <Listbox.Option
                key={i}
                value={k}
                className="p-2 hover:bg-yellow-50 rounded-md cursor-pointer"
              > {sortCriteria[k]}
              </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Listbox>
        </div>
      */}
      </div>
      {loading ? <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-400"></div> : 
      <ul>
        <li>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-gray-300 rounded-t-md">
            <div className="text-left p-2 hover:bg-gray-200 rounded-tl-md">{t('th.number')}</div>
            <div className="text-left p-2 hover:bg-gray-200">{t('th.name')}</div>
            <div className="text-left p-2 hover:bg-gray-200 hidden md:block md:col-span-3">{t('th.address')}</div>
            <div className="text-left p-2 hover:bg-gray-200 rounded-tr-md">{t('th.updated_on')}</div>
          </div>
        </li>
        {meters.map((meter, i) => {
          return (
          <li key={meter.id}>
            <div className={'grid grid-cols-3 md:grid-cols-6 gap-2 hover:bg-blue-100 cursor-pointer my-1 shadow-md'
                + (i % 2 ? ' bg-gray-100' : ' bg-gray-200')}
              onClick={() => {navigate('/meterdetails/' + meter.id)}}>
              <div className="text-left p-2">{meter.name}</div>
              <div className="text-left p-2">{meter.number}</div>
              <div className="text-left p-2 hidden md:block md:col-span-3">{'N.A.'}</div>
              <div className="text-left p-2">{meter.update_on}</div>
            </div>
          </li>
          )
        })}
      </ul>
      }
    </div>
  )
}

export default Meters
