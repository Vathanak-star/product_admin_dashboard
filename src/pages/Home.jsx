import { useState } from "react";
import SideBar, { SidebarItem }  from "../components/SideBar";
import {
    LayoutDashboard,
    Layers2,
    ShoppingCart,
    MapPin,
    Contact,
    BookText,
    LogOut
} from 'lucide-react'
import Dashboard from "./Screens/Dashboard";
import Product from "./Screens/Product";
import Category from "./Screens/Category";
import Location from "./Screens/Location";
import Users from "./Screens/Users";
import Document from "./Screens/Document";
import { useNavigate } from "react-router-dom";


export default function HomePage() {
    const navigate = useNavigate()
    const [activeView, setActiveView] = useState('Location')

    const onLogout = () => {
        navigate('/login')
    }

    const onClickItem = (value) => {
        console.log(`${value} Clicked`)
        setActiveView(value)
    }

    return(
        <div className="flex h-screen">
            <SideBar>
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" onClick={() => onClickItem('Dashboard')} active={activeView === 'Dashboard'}/>
                <SidebarItem icon={<ShoppingCart size={20} />} text="Product" onClick={() => onClickItem('Product')} active={activeView === 'Product'}/>
                <SidebarItem icon={<Layers2 size={20} />} text="Categories" onClick={() => onClickItem('Category')} active={activeView === 'Category'}/>
                <SidebarItem icon={<MapPin size={20} />} text="Location" onClick={() => onClickItem('Location')} active={activeView === 'Location'}/>
                <hr className="my-3"/>
                <SidebarItem icon={<Contact size={20} />} text="Users" onClick={() => onClickItem('Users')} active={activeView === 'Users'}/>
                <SidebarItem icon={<BookText size={20} />} text="Document" onClick={() => onClickItem('Document')} active={activeView === 'Document'}/>
                <SidebarItem icon={<LogOut size={20} />} text="Logout" onClick={() => onLogout()}/>
            </SideBar>

            <main className="flex-1 p-0 overflow-auto">
                {/* Your main content goes here */}
                {activeView === 'Dashboard' && <Dashboard/>}
                {activeView === 'Product' && <Product/>}
                {activeView === 'Category' && <Category/>}
                {activeView === 'Location' && <Location/>}
                {activeView === 'Users' && <Users/>}
                {activeView === 'Document' && <Document/>}
            </main>
        </div>
    )
}
