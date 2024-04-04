import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Note } from "./types";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

type DetailPropsType = {
  deleteNote: (id: string) => void;
};
const NoteDetail = ({ deleteNote }: DetailPropsType) => {
  const props: Note = useOutletContext();
  const navigate=useNavigate()
  return (
    <div className=" container">
      <Row>
        <Col>
          <h1>{props.title}</h1>
          <Stack direction="horizontal" gap={3} className=" flex-wrap">
            {props.tags?.map((tag) => (
              <Badge key={tag.id}>{tag.label}</Badge>
            ))}
          </Stack>
        </Col>
        <Col>
          <Stack direction="horizontal" gap={2}>
            <Link to={"edit"}>
              <Button>Düzenle</Button>
            </Link>
            <Button
              onClick={() => deleteNote(props.id)}
              variant="outline-danger"
            >
              Sil
            </Button>
            <Button onClick={()=>navigate(-1)} variant="outline-secondary">Geri</Button>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown className={" my-5"}>{props.markdown}</ReactMarkdown>
    </div>
  );
};
export default NoteDetail;
