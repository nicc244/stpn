import { Student } from "../page";
import { useState } from "react";
import handleAddStudent from "../page"

interface ListProps{
    persons:Student[]
}




  
  export default function Zadavani({ novyStudent }:{novyStudent: (student:Student) => void}) {
    const [jmeno, setJmeno] = useState('')
    const [prijmeni, setPrijmeni] = useState('')

    const handleSubmit = () => {
      if (jmeno && prijmeni){
        const newStudent = {
          id: 1,
          name: jmeno,
          surname: prijmeni
        }
        console.log('cokoli')
        //novyStudent(newStudent);
        setJmeno('')
        setPrijmeni('')
        novyStudent(newStudent)
        
      }
      
    }
   // sfdsa
    

    return (
      <div>
        <input type="text" placeholder="Jmeno" className="border p-2 mr-2" value={jmeno} onChange={(e) => setJmeno(e.target.value)} />
        <input type="text" placeholder="Prijmeni" className="border p-2 mr-2" value={prijmeni} onChange={(e) => {setPrijmeni(e.target.value)}}onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
        <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded">
          Enter
        </button>
      </div>
    );
  }