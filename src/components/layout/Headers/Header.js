import "./Header.css"
import LogoImg from "assets/images/logo.png"
import { useEffect , useRef, useState } from "react"
import { Button , Modal } from "components/UI"
import BudgetForm from "components/budgetComponents/BudgetForm/BudgetForm"
const Header = () => {
    const isMount = useRef(false)
    const [isScrolled,setIsScrolled] = useState(false)
    const [showModal,setShowModal] = useState(false)
    useEffect(()=>{
        if(!isMount.current){
            window.addEventListener("scroll",()=>{
                if(window.scrollY > 60){
                    setIsScrolled(true)
                }else{
                    setIsScrolled(false)
                }
            })
            isMount.current = true
        }
    },[])

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                {/* header_brand */}
                <div className="header_brand">
                    <div className="Logo">
                        <img src={LogoImg} alt="LogoImage" />
                    </div>
                    <h1> Budget App </h1>
                </div> 
                {/* header_actions */}
                <div className="header_actions">
                    <Button onClick={()=>setShowModal(true)}> + </Button>
                </div>
            </div> 

            <Modal visible={showModal} closeModal={()=>setShowModal(false)}>
                <BudgetForm  closeModal={()=>setShowModal(false)} />
            </Modal>

        </header>
    )
}

export default Header