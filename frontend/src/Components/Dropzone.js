// import { IconButton } from '@material-ui/core';
// import React, {useEffect, useState} from 'react';
// import {useDropzone} from 'react-dropzone';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


// export default function Dropzone(props) {
//   const [files, setFiles] = useState([]);
//   const {getRootProps, getInputProps} = useDropzone({
//     accept: 'image/*',
//     onDrop: acceptedFiles => {
//       console.log(acceptedFiles)
//       acceptedFiles.push(...files)
//       setFiles(acceptedFiles.map(file => Object.assign(file, {
//         preview: URL.createObjectURL(file)
//       })));
//     }
//   });



//   useEffect(() => () => {
//     // Make sure to revoke the data uris to avoid memory leaks
//     files.forEach(file => URL.revokeObjectURL(file.preview));
//   }, [files]);

//   return (
//     <section className="container">
//       <div {...getRootProps({className: 'dropzone', style})} >
//         <input  {...getInputProps()}  />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       </div>
//       <aside style={thumbsContainer}>
//         {thumbs}
//       </aside>
//     </section>
//   );
// }

import React, { useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { useFormContext } from "react-hook-form"
import { gray } from 'colors';
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const style = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#2196f3',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  position: 'relative',
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  marginRight: 'auto',
  marginLeft: 'auto'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',

};

const icon = {
  position: 'absolute',
  right: '50%',
  top: '50%',
  margin: '-24px -24px -15px 0px',
  backgroundColor: '#e3e0d8',
  opacity: 0.5
}








const Dropzone = props => {
  const { name, label = name } = props
  const { register, unregister, setValue, watch } = useFormContext()
  const files = watch(name)
  const onDrop = useCallback(
    (droppedFiles) => {
      const newFiles = (!!files?.length && [...files].concat(droppedFiles)) || droppedFiles;
      newFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
              }))
      setValue(name, newFiles, { shouldValidate: true });
    },
    [setValue, name, files],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
  })
  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])


  const thumbs = files && files.map((file, i) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <IconButton style={icon} onClick={() => { const ar = files; ar.splice(i, 1); setValue(name, [...ar], { shouldValidate: true }); console.log(i, ar) }}>
          <DeleteForeverIcon />
        </IconButton>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));




  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone', style })} >
        <input  {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {console.log(files)}
        {thumbs}
      </aside>
    </section>
  );

  // return (
  //     <>
  //         <label className=" " htmlFor={name}>
  //             {label}
  //         </label>
  //         <div
  //             {...getRootProps()}
  //             type="file"
  //             role="button"
  //             aria-label="File Upload"
  //             id={name}
  //         >
  //             <input {...props} {...getInputProps()} />
  //             <div
  //                 style={{ width: "500px", border: "black solid 2px" }}
  //                 className={" " + (isDragActive ? " " : " ")}
  //             >
  //                 <p className=" ">Drop the files here ...</p>

  //                 {!!files?.length && (
  //                     <div className=" ">
  //                         {files.map(file => {
  //                             return (
  //                                 <div key={file.name}>
  //                                     <img
  //                                         src={URL.createObjectURL(file)}
  //                                         alt={file.name}
  //                                         style={{
  //                                             height: "200px",
  //                                         }}
  //                                     />
  //                                 </div>
  //                             )
  //                         })}
  //                     </div>
  //                 )}
  //             </div>
  //         </div>
  //     </>
  // )
}

export default Dropzone