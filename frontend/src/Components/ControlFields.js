import { InputLabel, MenuItem, Select, TextField } from "@material-ui/core"
import { Controller } from "react-hook-form"
import MUIRichTextEditor from 'mui-rte'



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

export const ControlRTE = ({control, name, label}) => {
    return <Controller
        as={MUIRichTextEditor}
        name={name}
        label={label}
        control={control}
        onChange={([value]) => {
            console.log(value)
            return value;
        }}
    />
}
