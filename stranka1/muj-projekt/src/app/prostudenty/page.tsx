"use client";

import { useEffect, useState } from "react";
import Zadani from "./components/zadavani";
import { Formik } from "formik";
import * as Yup from 'yup';


export interface Student{
    id:number;
    name:string;
    surname:string;
}



export default function ProstudentyPage(){
    
    const validationSchema = Yup.object().shape({
        name: Yup.string()
          .required('Meno je povinné')
          .min(2, 'Meno musí mať aspoň 2 znaky'),
        surname: Yup.string()
          .required('Priezvisko je povinné')
          .min(2, 'Priezvisko musí mať aspoň 2 znaky'),
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
    
    
    return(
        <>
        <div className="pl-3 py-3">
            Formik
        <div className="">
            <Formik 
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('Odesilam formular')
                    console.log(values)
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
                            />
                        </div>
                        <div>
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
                            />
                        </div>
                        <div>
                            {errors.email && touched.email && errors.email}
                        </div>

                    </div>
                </div>

                <div>
                    <div onClick={() => handleSubmit()} className="border-2 m-4 ml-1 w-max p-4 hover:bg-gray-500 hover:text-white cursor-pointer">Odeslat</div>
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
                        {s.name} {s.surname} 
                    </li>
                ))}

                
            </ul>
            
            
            
        </div>
    </>
    )
}