import "./Tabs.css"
import {useState} from 'react'
const Tabs = ({children , defaultTab=1}) => {

    const [activeTab,setActiveTab] = useState(defaultTab)

    // console.log(children)
    const tabstitles = children.map(t=>t.props.title || '')
    const tabscontent = children.map(t=>t.props.children)
    // console.log(tabscontent)
    // console.log(tabstitles)
    
    return (
        <div className="TabsAndContent">
            <div className="tabs">
                {tabstitles.map((title , inx)=>(
                    <div key={inx+1} className={`tab_title ${activeTab===(inx+1) ? "active":""}`} onClick={()=>setActiveTab(inx+1)}> {title} </div>
                ))}
            </div>


            <div className="tab_content">
                {tabscontent[activeTab - 1]}
            </div>
        </div>
    )
}

export default Tabs