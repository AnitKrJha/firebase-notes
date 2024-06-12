import Note from "./note";
import { useState } from "react";
function Notes({notes,setNotes,loading}){
    // i want the date just here.
 
   
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-4 flex justify-center items-center h-screen">
                <div className="w-20 h-20 animate-spin bg-blue-500" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 flex flex-wrap gap-4">
            {notes.map((note, index) => (
                <Note setNotes={setNotes} key={index} {...note} />
            ))}
        </div>
    );
 
    
}
export default Notes;