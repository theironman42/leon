import { TextField } from "@material-ui/core"
import { Controller } from "react-hook-form"


export const ControlTextField = ({ name, control, required, ...props }) => {
    return <Controller
        name={name}
        defaultValue=""
        control={control}
        rules={{ required:required }}
        render={({ field }) => <TextField {...field} {...props} />}
    />
}
