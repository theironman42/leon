import { MenuItem, Select, TextField } from "@material-ui/core"
import { Controller } from "react-hook-form"


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
        render={({ field }) =>
            <Select {...field} {...props} >
                {values && values.map((item, index)=>(
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
            </Select>}
    />
}
