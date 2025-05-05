'use server'
import List from "./components/list";


export interface Person {
    id: number;
    name: string;
    surname: string;
}

export default async function RegisterPage() {

    const person1: Person = {
            id: 1,
            name: 'Jan',
            surname: 'Vesely'
        }

        const person2: Person = {
            id: 2,
            name: 'Johny',
            surname: 'Smutny'
        }

        const person3: Person = {
            id: 3,
            name: 'Johny',
            surname: 'Vesely'
        }

        const arrayPerson: Person[] = [
            person1,
            person2,
            person3,
        ]
    return (
        <>
        <List persons={arrayPerson} />

        </>
    )
}