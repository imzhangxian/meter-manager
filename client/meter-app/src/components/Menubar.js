import { useParams } from 'react-router'
import { Tab } from '@headlessui/react'
import { AiFillSchedule, AiFillDashboard, AiFillPieChart, AiFillSetting } from 'react-icons/ai'
import { t } from 'i18next'
import Meters from './Meters'
import Tasks from './Tasks'
import Reports from './Reports'
import Setting from './Setting'

function Menubar() {
  const { selected } = useParams()
  const menunames = {
    meters: 0,
    tasks: 1,
    charts: 2,
    setting: 3
  }
  return (
    <Tab.Group defaultIndex={selected ? menunames[selected] : 0}>
      <Tab.List className="flex justify-center mt-2 p-2 rounded-md shadow-lg bg-blue-50">
        <div className="flex justify-evenly w-1/2">
        <Tab className={({ selected }) => selected ? "p-2 bg-blue-300 rounded-lg" : "m-2 bg-blue-50 rounded-lg"}>
          {({ selected }) => selected ? 
            (<div><AiFillDashboard size={64} color='lavender' /><span>{t('menu.meters')}</span></div>) : 
            (<div><AiFillDashboard size={64} color='royalblue' /><span>{t('menu.meters')}</span></div>)}

        </Tab>
        <Tab className={({ selected }) => selected ? "p-2 bg-blue-300 rounded-lg" : "m-2 bg-blue-50 rounded-lg"}>
          {({ selected }) => selected ? 
            (<div><AiFillSchedule size={64} color='lavender' /><span>{t('menu.tasks')}</span></div>) : 
            (<div><AiFillSchedule size={64} color='royalblue' /><span>{t('menu.tasks')}</span></div>)}
        </Tab>
        <Tab className={({ selected }) => selected ? "p-2 bg-blue-300 rounded-lg" : "m-2 bg-blue-50 rounded-lg"}>
          {({ selected }) => selected ? 
            (<div><AiFillPieChart size={64} color='lavender' /><span>{t('menu.charts')}</span></div>) : 
            (<div><AiFillPieChart size={64} color='royalblue' /><span>{t('menu.charts')}</span></div>)}          
        </Tab>
        <Tab className={({ selected }) => selected ? "p-2 bg-blue-300 rounded-lg" : "m-2 bg-blue-50 rounded-lg"}>
        {({ selected }) => selected ? 
            (<div><AiFillSetting size={64} color='lavender' /><span>{t('menu.setting')}</span></div>) : 
            (<div><AiFillSetting size={64} color='royalblue' /><span>{t('menu.setting')}</span></div>)}    
        </Tab>
        </div>
      </Tab.List>
      <Tab.Panels className="p-2 mt-4 bg-gray-100 rounded-md">
        <Tab.Panel className="flex justify-center"><Meters /></Tab.Panel>
        <Tab.Panel className="flex justify-center"><Tasks /></Tab.Panel>
        <Tab.Panel className="flex justify-center"><Reports /></Tab.Panel>
        <Tab.Panel className="flex justify-center"><Setting /></Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Menubar