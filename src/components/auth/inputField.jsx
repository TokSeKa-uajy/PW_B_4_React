import { Form, FloatingLabel } from "react-bootstrap";
const InputFloatingForm = (props) => {
    return (
        <Form.Group className="mb-2" controlId={props.name}>
            <FloatingLabel className="fw-bold" label={props.label}>
                <Form.Control
                    className="text-dark border-secoondary bg-light"
                    placeholder={props.placeholder}
                    value={props.value}
                    {...props} // menambahkan semua props lain yang ada di input
                />
            </FloatingLabel>
        </Form.Group>
    );
};
export default InputFloatingForm;