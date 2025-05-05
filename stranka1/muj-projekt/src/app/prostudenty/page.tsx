"use client";

import { useState } from "react";
import Zadani from "./components/students";



export interface Student{
    id:number;
    name:string;
    surname:string;
}



export default function ProstudentyPage(){
    const[hodnota, setHodnota]=useState("")
    
    return(
        
        <div>
            Jmeno: {hodnota}
            
            
            
        </div>
    )
}