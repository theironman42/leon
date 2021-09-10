import React, { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useFormContext } from "react-hook-form"
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios'

const Dropzone = ({ name, isNew, ...props }) => {
  const { register, unregister, setValue, watch } = useFormContext()
  const files = watch(name)

  const onDeleteHandler = (file, i) => {
    const ar = [...files];
    ar.splice(i, 1);
    setValue(name, [...ar], { shouldValidate: true });
    axios.delete(`/api/upload/${file.slice(7)}`)
  }

  const onDrop = useCallback(
    (droppedFiles) => {
      uploadImage(droppedFiles)
    },
    [setValue, name, files],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
  })

  const uploadImage = (imagefile) => {
    var formData = new FormData();
    imagefile.forEach((file, i) => { formData.append("image" + i, file); })
    axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      const newFiles = (!!files?.length && [...files].concat(res.data)) || res.data;
      setValue(name, newFiles, { shouldValidate: true });
    })
  }


  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])


  const thumbs = files && files.length > 0 && files.map((file, i) => (

    <div style={thumb} key={i}>
      <div style={thumbInner}>
        <IconButton style={icon}
          onClick={() => {
            onDeleteHandler(file, i)
          }}>
          <DeleteForeverIcon />
        </IconButton>
        <img
          src={file}
          style={img}
          alt="product"
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
        {thumbs}
      </aside>
    </section>
  );


}

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

export default Dropzone