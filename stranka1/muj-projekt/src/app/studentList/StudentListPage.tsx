'use client'
import { useEffect, useState } from "react";
import { Student } from "./page";
import { maxHeaderSize } from "http";
import error from "next/error";


interface StudentListPageProps {
    students: Student[]
}

export default function StudentListPage(props: StudentListPageProps) {
    const [students, setStudents] = useState<Student[]>(props.students)

    const [inputForm, setInputForm] = useState<Student>({
        id: -1,
        name: 'Vyplnte jmeno',
        surname: '',
        phoneNumber: '',
        age: 0
    })

    


    const handleAddStudent = async (student: Student) => {
        const response = await fetch('http://localhost:3333/student', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
          });

          if(!response.ok){
              console.log('error')
            }
            
        const newStudent = await response.json() as Student

        console.log(newStudent)
        setStudents([...students, newStudent])
    }
    return (
        <>

    <div className="pb-2">
        <input key='1a' className="border p-2" value={inputForm.name} onChange={(e) => setInputForm({...inputForm, name: e.target.value})} />
    </div>
    <div>
        <input key='2a' className="border p-2" value={inputForm.surname} onChange={(e) => setInputForm({...inputForm, surname: e.target.value})} />
    </div>

        <div onClick={() => {
            handleAddStudent(inputForm)    
        }}>Button</div>
        {students.map((student)=>{
            return (
                <div key={student.id}>
                    {student.name}
                </div>
            )
        })}
        </>
    )

}