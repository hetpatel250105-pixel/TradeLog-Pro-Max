import "./Input.css";

function Input({
    type = "text",
    placeholder = "",
    value,
    onChange,
    name,
    required = false,
    disabled = false,
}) {
    return (
        <div className="input-group">

            <input
                className="primary-input"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                required={required}
                disabled={disabled}
            />

        </div>
    );
}

export default Input;