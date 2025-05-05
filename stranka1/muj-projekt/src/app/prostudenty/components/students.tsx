import { Student } from "../page";
import { useState } from "react";

interface ListProps{
    persons:Student[]
}

export default function Zadani() {
    const[hodnota, setHodnota] = useState<string>("")
    return(
        <body>
            <div>
                <input type="text" className="border p-2" placeholder="Zadej jmeno: "value={hodnota} onChange={(e)=>setHodnota(e.target.value)} />
                jmeno: {hodnota}
            </div>
        </body>
        
    )
}