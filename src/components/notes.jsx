import Note from "./note";
import { useState } from "react";
function Notes({notes,setNotes}){
    // i want the date just here.
 
   
        return (
            <div className="max-w-7xl mx-auto p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {notes.map((note, index) => (
                    <Note setNotes={setNotes} key={index} {...note} />
                ))}
            </div>
        );
 
    
}
export default Notes;