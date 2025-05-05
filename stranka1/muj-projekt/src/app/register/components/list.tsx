'use client'
import { Person } from "../page"




interface ListProps {
    persons: Person[]
}
export default function List(props: ListProps) {
    const {persons} = props

    return(
        persons.map((person) => {
            return(<Item person={person} key={person.id}/>)

        })

    )
}
interface itemProps {
    person: Person
}
function Item(props: itemProps) {
    const {person} = props
    return (
        <>
            <div className="py-2 my-2 ml-5 bg-gray-500 text-blue">
                Muj list - osoba
                <div>
                    Name: {person.name}
                </div>
                <div>
                    Surname: {person.surname}
                </div>
            </div>
        </>
    )
    
}