import { BlocksIcon, BookAIcon, MapPin, ShoppingCartIcon, User2 } from "lucide-react";
import React from "react";

const loremText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'


export default function Document(){
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex w-full h-16 bg-white justify-center items-center shadow shadow-indigo-100">
                <BookAIcon className="mr-3 w-5 h-5"/>
                <h1 className="font-semibold text-lg">Document</h1>
            </div>

            <div className="flex flex-col p-6 lg:p-16">
                <div className="flex flex-col lg:items-center">
                    <h1 className="mb-1 text-2xl font-bold">Introducing Product Mangement System</h1>
                    <h2 className="text-sm text-gray-700 mb-9">Find all the guides and resources you need for this system</h2>
                </div>
                

                <div className="flex w-full lg:justify-center">
                    
                    <div className="mr-3 lg:mr-10 flex flex-col w-50 h-55 lg:w-60 lg:h-65 bg-white rounded-lg p-4 justify-center">
                        <ShoppingCartIcon size={50}/>
                        <h2 className="text-sm font-semibold mt-3 mb-1.5">Products Mangement</h2>
                        <h3 className="text-xs">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, quibusdam. Lorem ipsum, dolor sit amet consectetur adipisicing elit</h3>
                    </div>

                    <div className="mr-3 lg:mr-10 flex flex-col w-50 h-55 lg:w-60 lg:h-65 bg-white rounded-lg p-4 justify-center">
                        <BlocksIcon size={50}/>
                        <h2 className="text-sm font-semibold mt-3 mb-1.5">Category Mangement</h2>
                        <h3 className="text-xs">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, quibusdam. Lorem ipsum, dolor sit amet consectetur adipisicing elit</h3>
                    </div>

                    <div className="mr-3 lg:mr-10 flex flex-col w-50 h-55 lg:w-60 lg:h-65 bg-white rounded-lg p-4 justify-center">
                        <MapPin size={50}/>
                        <h2 className="text-sm font-semibold mt-3 mb-1.5">Location Mangement</h2>
                        <h3 className="text-xs">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, quibusdam. Lorem ipsum, dolor sit amet consectetur adipisicing elit</h3>
                    </div>

                    <div className=" flex flex-col w-50 h-55 lg:w-60 lg:h-65 bg-white rounded-lg p-4 justify-center">
                        <User2 size={50}/>
                        <h2 className="text-sm font-semibold mt-3 mb-1.5">User</h2>
                        <h3 className="text-xs">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, quibusdam. Lorem ipsum, dolor sit amet consectetur adipisicing elit</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}