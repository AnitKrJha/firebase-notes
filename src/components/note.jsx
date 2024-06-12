import { db } from "../firebase_config";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
function Note({ title, content, id, pinned, setNotes }) {
    async function handleDelete(id) {
        await deleteDoc(doc(db, "notes", id));
        setNotes((prev) => prev.filter(note => note.id !== id));
    }
    async function handlePin(id, pinned) {
        await setDoc(doc(db, "notes", id), { pinned: !pinned }, { merge: true });
        setNotes((prev) => 
            prev.map(note => 
                note.id === id ? { ...note, pinned: !note.pinned } : note
            ).sort((a, b) => b.pinned - a.pinned)
        );
        
    }
    return <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
    <h2 className="text-xl font-bold">{title}</h2>
    <hr className="my-4" />
    <div className="text-gray-700">
        {content}
    </div>
    <div className="mt-4 flex justify-between">
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={(e) => handleDelete(id)}>Delete</button>
        <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" onClick={(e) => handlePin(id, pinned)}>{pinned ? "UNPIN" : "PIN"}</button>
    </div>
</div>


}
export default Note