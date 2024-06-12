import { useState, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from './../firebase_config';

function NoteForm({ setNotes }) {
    const [loading, setLoading] = useState(false);
    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData(form.current);
        const note = {
            title: formData.get("title"),
            content: formData.get("content"),
            pinned: false
        }
        try {
            const docRef = await addDoc(collection(db, "notes"), note);
            console.log("Document written with ID: ", docRef.id);
            setNotes((prevNotes) => [...prevNotes, { id: docRef.id, title: formData.get("title"), content: formData.get("content"), pending: false }])
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        form.current.reset();
        setLoading(false);

    }
    const form = useRef(null);
    return <form ref={form} onSubmit={handleSubmit} className="max-w-7xl m-auto bg-white p-6 rounded-lg shadow-md space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800">Enter new task</h3>
        <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <input
                type="text"
                id="content"
                name="content"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <button
            disabled={loading}
            className={`mt-4 w-full py-3 px-4 border rounded-md shadow-sm text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'}`}
            type="submit"
        >
            {loading ? "Loading..." : "Submit"}
        </button>
    </form>


}
export default NoteForm;