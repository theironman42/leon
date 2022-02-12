import { FormHelperText, InputLabel, MenuItem, Select, TextField } from "@material-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import MUIRichTextEditor from 'mui-rte'
import { convertToRaw } from "draft-js";
import MuiTextEditor from "./MUITextEditor";
import { useEffect } from "react";


export const ControlTextField = ({ name, control, required, rules, ...props }) => {
    return <Controller
        name={name}
        defaultValue=""
        control={control}
        rules={{ required: required, ...rules }}
        render={({ field }) => <TextField {...field} {...props} />}
    />
}

export const ControlSelect = ({ name, control, required, rules, values, ...props }) => {
    return <Controller
        name={name}
        defaultValue=""
        control={control}
        rules={{ required: required, ...rules }}
        render={({ field }) => (<>
            <InputLabel shrink>{props.label}</InputLabel>
            <Select {...field} {...props} >
                {values && values.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
            </Select>
        </>)}
    />
}

export const VMuiTextEditor = ({ isShort, fieldName: name, label, validation, isNew }) => {
    const methods = useFormContext();
    const { register, watch, setValue } = methods;

    const value = watch(name);

    useEffect(() => {
        register('name');  
    }, [register, name]);

    return (
        <>
            <InputLabel shrink={true}>
                {label}
            </InputLabel>
            <MuiTextEditor
                value={value}
                onChange={(html) => {
                    setValue(name, html);
                }}
                isNew={isNew}
                isShort={isShort}
            />

        </>
    );
}

// export const ControlRTE = ({ control, name, label, setValue }) => {
//     return <MUIRichTextEditor onChange={
//         (value) => {
//             const content = JSON.stringify(
//                 convertToRaw(value.getCurrentContent())
//             );
//             console.log(content)
//         }
//     }
//     />
//     return <Controller

//         name={name}
//         label={label}
//         control={control}
//         onChange={(value) => {
//             const content = JSON.stringify(
//                 convertToRaw(value.getCurrentContent())
//             );
//             setValue(name, content);
//         }}
//         render={({ field }) => <MUIRichTextEditor {...field} />}
//     />
// }
