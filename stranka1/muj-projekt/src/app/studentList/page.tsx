import StudentListPage from "./StudentListPage";


export interface Student {
    id: number,
    name: string
    surname: string
    phoneNumber: string;
    age: number;
}
export default async function StudentList () {

    const data: Student[] = [{
        id: 1,
        name: 'Jan',
        surname: 'Vesely',
        phoneNumber: '+42077777777',
        age: 15
    }]
    return (
        <>
            <StudentListPage students={data} />
        </>
    )
}