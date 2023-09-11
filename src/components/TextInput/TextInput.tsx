type TextInputProps = {
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
};

function TextInput({ value, placeholder, onChange, required = false }: TextInputProps) {
    return (
        <input
            value={value}
            onChange={onChange}
            type='text'
            placeholder={placeholder}
            required={required}
        />
    );
}

export default TextInput;
