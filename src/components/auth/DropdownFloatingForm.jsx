import { Form, FloatingLabel } from "react-bootstrap";

const DropdownFloatingForm = (props) => {
    return (
        <Form.Group className="mb-2" controlId={props.name}>
            <FloatingLabel className="fw-bold" label={props.label}>
                <Form.Select
                    className="text-dark border-secoondary bg-light"
                    placeholder={props.placeholder}
                    {...props} // spread the rest of the props
                >
                    {/* Dynamically render options passed from parent */}
                    {props.options?.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Form.Select>
            </FloatingLabel>
        </Form.Group>
    );
};

export default DropdownFloatingForm;
