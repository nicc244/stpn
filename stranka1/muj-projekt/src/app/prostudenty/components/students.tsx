import { Student } from "../page";
import { useState } from "react";

interface ListProps{
    persons:Student[]
}



type Props = {
    hodnota: string;
    setHodnota: (val: string) => void;
  };
  
  export default function Zadavani({ hodnota, setHodnota }: Props) {
    return (
      <input className="border p-2" value={hodnota} onChange={(e) => setHodnota(e.target.value)} />
      
    );
  }