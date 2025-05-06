import { Student } from "../page";
import { useState } from "react";

interface ListProps{
    persons:Student[]
}




  
  export default function Zadavani({ novyStudent }:{novyStudent: (student:Student) => void}) {
    const [jmeno, setJmeno] = useState('')
    const [prijmeni, setPrijmeni] = useState('')
    const [id, setId] = useState<number | null>()

    const handleSubmit = () => {
      if (jmeno && prijmeni && id){
        const newStudent = {
          id: id,
          name: jmeno,
          surname: prijmeni
        }
        novyStudent(newStudent);
        setId(null)
        setJmeno('')
        setPrijmeni('')
      }
      
    }

    

    return (
      <div>
        <input type="text" placeholder="ID" className="border p-2 mr-2" value={id ? id : 0} onChange={(e) => setId(Number(e.target.value))} />
        <input type="text" placeholder="Jmeno" className="border p-2 mr-2" value={jmeno} onChange={(e) => setJmeno(e.target.value)} />
        <input type="text" placeholder="Prijmeni" className="border p-2 mr-2" value={prijmeni} onChange={(e) => {setPrijmeni(e.target.value)}}onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
        <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded">
          Enter
        </button>
      </div>
    );
  }