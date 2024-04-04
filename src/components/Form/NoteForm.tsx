/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { Tag } from "../../types";
import { CreateNoteProps } from "./CreateNote";
import { useNavigate } from "react-router-dom";
const NoteForm = ({
  onSubmit,
  createTag,
  availableTags,
  title = "",
  tags = [],
  markdown = "",
}: CreateNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(titleRef.current?.value);
    // console.log(markdownRef.current?.value);
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate(-1);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Stack>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlık</Form.Label>
              <Form.Control
                defaultValue={title}
                ref={titleRef}
                required
                className="shadow"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Etiketler</Form.Label>
              <ReactSelect
                defaultValue={tags}
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(note_tags) => {
                  setSelectedTags(
                    note_tags.map((tag) => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  );
                }}
                onCreateOption={(label) => {
                  const newTag: Tag = { id: Date.now(), label };
                  createTag(newTag);
                  setSelectedTags([...selectedTags, newTag]);
                }}
                options={availableTags?.map((i) => ({
                  label: i.label,
                  value: i.id,
                }))}
                isMulti
                className="shadow"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown" className=" my-4">
          <Form.Label>İçerik</Form.Label>
          <Form.Control
            defaultValue={markdown}
            required
            as={"textarea"}
            ref={markdownRef}
            className="shadow"
          />
        </Form.Group>
      </Stack>
      <div className=" d-flex justify-content-end gap-3">
        <Button type="submit">Kaydet</Button>
        <Button onClick={() => navigate(-1)} type="button" variant="secondary">
          İptal
        </Button>
      </div>
    </Form>
  );
};
export default NoteForm;
