import { NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";
export type CreateNoteProps = {
  onSubmit: (data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
}& Partial<NoteData>
const CreateNote = ({
  onSubmit,
  createTag,
  availableTags,
  title=''
}: CreateNoteProps) => {
  return (
    <div className="container py-4">
      <h1>Yeni Not oluştur</h1>
      <NoteForm
        onSubmit={onSubmit}
        createTag={createTag}
        availableTags={availableTags}
      />
    </div>
  );
};
export default CreateNote;
