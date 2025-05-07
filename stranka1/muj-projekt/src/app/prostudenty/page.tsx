"use client";

import { useEffect, useState } from "react";
import Zadani from "./components/zadavani";
import { Formik } from "formik";
import * as Yup from 'yup';
import { FormikHelpers } from 'formik';



export interface Student{
    id:number;
    name:string;
    surname:string;
}



export default function ProstudentyPage(){
    
    const validationSchema = Yup.object().shape({
        name: Yup.string()
          .required('Jméno je povinné')
          .min(2, 'Jméno musí mít aspoň 2 znaky'),
        surname: Yup.string()
          .required('Příjmení je povinné')
          .min(2, 'Příjmení musí mít aspoň 2 znaky'),
        email: Yup.string()
          .required('Email je povinný')
          .email('Neplatný formát emailu'),
      });
    
    const[seznam, setSeznam]=useState<Student[]>([]);


    const loadData = async () => {
        const inputData = await fetch('http://localhost:3333/student')
        const inputDataJson = await inputData.json() as Student[]
        setSeznam(inputDataJson)
    }

    useEffect(() => {
        const data = loadData()
    },[])

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
            setSeznam([...seznam, newStudent])}

            
    

    const novyStudent = (student: Student) =>
    {
        console.log('novyStudent')
        handleAddStudent(student)
    };

    const deleteAllStudents = async () => {
        const response = await fetch('http://localhost:3333/student', {
            method: 'DELETE',
        });
    
        if (!response.ok) {
            console.error('Chyba při mazání studentů');
        } else {
            console.log('Všichni studenti smazáni');
            setSeznam([]);
        }
    };

    const deleteStudent = async (id: number) => {
        const response = await fetch(`http://localhost:3333/student/${id}`, {
            method: 'DELETE',
            
        });
    
        if (!response.ok) {
            console.error('Chyba při mazání studenta');
            
        } else {
            console.log(`Student s ID ${id} smazán`);
            setSeznam(seznam.filter(s => s.id !== id));
        }
    };
    
    
    
    
    return(
        <>
        <div className="pl-3 py-3">
            Formik
        <div className="">
            <Formik 
                initialValues={{
                    id:1,
                    name: '',
                    surname: '',
                    email: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, {resetForm}) => {
                    console.log('Odesilam formular')
                    console.log(values)
                    await handleAddStudent(values);
                    resetForm();
                }}
            >
            {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            }) => (
            <form onSubmit={handleSubmit}>
                <div className="flex gap-4">

                    <div>
                        <div>
                            <input
                            className="border-2"
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder="Jmeno"
                            />
                        </div>
                        <div className="text-red-500 font-bold text-wrap max-w-[180px] text-sm pt-2">
                            {errors.name && touched.name && errors.name}
                        </div>
                    </div>

                    <div>
                        <div>
                            <input
                            className="border-2"
                                type="text"
                                name="surname"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.surname}
                                placeholder="Příjmení"
                            />
                        </div>
                        <div className="text-red-500 font-bold text-wrap max-w-[180px] text-sm pt-2">
                            {errors.surname && touched.surname && errors.surname}
                        </div>
                    </div>
                    
                    <div>
                        <div>
                            <input
                            className="border-2"
                                type="text"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="email"
                            />
                        </div>
                        <div className="text-red-500 font-bold text-wrap max-w-[180px] text-sm pt-2">
                            {errors.email && touched.email && errors.email}
                        </div>

                    </div>
                    <div onClick={() => handleSubmit()} className="px-6 py-1.4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-48 h-7 text-center">Odeslat</div>
                </div>

                <div>
                    
                    <div onClick={() => deleteAllStudents()} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 w-48 text-center">SMAZAT STUDENTY</div>
                </div>
            </form>
            )}
            </Formik>
        </div>
        </div>

        <div>
            <Zadani novyStudent={novyStudent} />
            <ul className="mt-4" >
                {seznam.map((s, index) => (
                    <li key={s.id} className="border p-2">
                        <span>
                            ( ID: {s.id} ) {s.name} {s.surname} 
                        </span>
                        <button onClick={() => deleteStudent(s.id)} className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                            Smazat
                        </button>
                    </li>
                ))}

                
            </ul>
            
            
            
        </div>
    </>
    )
}