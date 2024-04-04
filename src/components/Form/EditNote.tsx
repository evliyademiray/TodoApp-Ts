/* eslint-disable @typescript-eslint/no-unused-vars */
import { useOutletContext } from "react-router-dom";
import NoteForm from "./NoteForm";
import { Note, NoteData, Tag } from "../../types";

type EditPropsType = {
  onSubmit: (id:string,data:NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onSubmit, createTag, availableTags}:EditPropsType) => {
  const props: Note = useOutletContext();
  console.log(props);
  return (
    <div className="container py-5">
      <h1>Notu Düzenle</h1>
      <NoteForm
        title={props.title}
        markdown={props.markdown}
        tags={props.tags}
        createTag={createTag}
        availableTags={availableTags}
        onSubmit={(data) => onSubmit(props.id, data)}
      />
    </div>
  );
};
export default EditNote;
