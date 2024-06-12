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
    return <div className="max-w-md w-max bg-white shadow-lg rounded-lg overflow-hidden">
    <h2 className="text-xl font-bold text-gray-800 p-4">{title}</h2>
    <hr className="my-2 border-gray-300" />
    <div className="text-gray-700 p-4">
        {content}
    </div>
    <div className="flex justify-end p-4">
        <button 
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mr-2"
            onClick={(e) => handleDelete(id)}
        >
            Delete
        </button>
        <button 
            className={`bg-gray-200 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${pinned ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}`}
            onClick={(e) => handlePin(id, pinned)}
        >
            {pinned ? "UNPIN" : "PIN"}
        </button>
    </div>
</div>



}
export default Note