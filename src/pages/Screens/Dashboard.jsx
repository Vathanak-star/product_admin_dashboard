import { LayoutDashboard } from "lucide-react";
import React from "react";

export default function Dashboard(){
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex w-full h-16 bg-white justify-center items-center shadow shadow-indigo-100">
                <LayoutDashboard className="mr-3 w-5 h-5"/>
                <h1 className="font-semibold text-lg">Dashboard</h1>
            </div>
        </div>
    )
}