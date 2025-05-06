import StudentListPage from "./StudentListPage";


export interface Student {
    id: number,
    name: string
    surname: string
    phoneNumber: string;
    age: number;
}
export default async function StudentList () {

    const fetchStudents = async (): Promise<Student[]> => {
        const response = await fetch('http://localhost:3333/student');
        if (!response.ok) {
          throw new Error('Chyba při načítání studentů');
        }
        const data = await response.json();
        return data as Student[];
      };

      const students = await fetchStudents()
      
    return (
        <>
            <StudentListPage students={students} />
        </>
    )
}