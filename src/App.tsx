/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateNote from "./components/Form/CreateNote";
import { useLocaleStorage } from "./useLocaleStorage";
import { NoteData, RawNote, Tag } from "./types";
import MainPage from "./components/MainPage";
import { useMemo } from "react";
import EditNote from "./components/Form/EditNote";
import NoteDetail from "./NoteDetail";
import Layout from "./components/Form/Layout";
const App = () => {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocaleStorage<Tag[]>("tags", []);
  const noteWithTags = useMemo(
    () =>
      notes?.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      })),
    [notes, tags]
  );
  const addNote = ({ tags, ...data }: NoteData) => {
    setNotes((prev) => {
      return [
        ...prev,
        {
          ...data,
          id: Date.now(),
          tagIds: tags?.map((tag) => tag.id),
        },
      ];
    });
  };
  const createTag = (tag: Tag) => {
    console.log(tag);
    setTags((prev) => [...prev, tag]);
  };
  console.log(notes);
  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };
  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    const updated = notes.map((note) =>
      note.id === id
        ? { ...note, ...data, tagIds: tags?.map((tag) => tag.id) }
        : note
    );
    setNotes(updated)
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainPage availableTags={tags} notes={noteWithTags} />}
          />
          <Route
            path="/new"
            element={
              <CreateNote
                onSubmit={addNote}
                createTag={createTag}
                availableTags={tags}
              />
            }
          />
          <Route path="/:id" element={<Layout notes={noteWithTags} />}>
            <Route index element={<NoteDetail deleteNote={deleteNote} />} />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={updateNote}
                  createTag={createTag}
                  availableTags={tags}
                />
              }
            />
          </Route>
          <Route path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
