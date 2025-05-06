"use client";

import { useState } from "react";
import Zadani from "./components/zadavani";



export interface Student{
    id:number;
    name:string;
    surname:string;
}



export default function ProstudentyPage(){
    const[seznam, setSeznam]=useState<Student[]>([]);

    const novyStudent = (student: Student) =>
    {
        
        setSeznam([...seznam, student])
    };
    
    
    return(
        
        <div>
            <Zadani novyStudent={novyStudent} />
            <ul className="mt-4" >
                {seznam.map((s, index) => (
                    <li key={s.id} className="border p-2">
                        {s.name} {s.surname} (ID: {s.id})
                    </li>
                ))}

                
            </ul>
            
            
            
        </div>
    )
}