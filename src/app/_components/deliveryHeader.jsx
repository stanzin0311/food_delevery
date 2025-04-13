import Link from "next/link"

const  DeliveryHeader = ()=>{
    return(
        <div className="header">
        <div className="logo">
        <img
          style={{ width: 100 }}
          src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"
          alt="Logo"
        />
        </div>
            <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
              
            </li>
            
            </ul>
        </div>
    )
}
export default DeliveryHeader