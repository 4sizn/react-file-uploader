import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import Button from './Button';

// change usecallback
// https://velog.io/@baldongdong/React-hooks-useCallback
// ({file, url, onProgress})...

function fileUpload({ file, url, cb }) {
  const data = new FormData();
  data.append('file', file);
  axios
    .post(url, data, {
      onUploadProgress: (ProgressEvent) => {
        cb((ProgressEvent.loaded / ProgressEvent.total) * 100);
      },
    })
    .then((res) => {
      console.log(res.statusText);
    })
    .catch((e) => {
      console.warn(e);
    });
}

const FileUploader = ({ text, url, cb }) => {
  //   const [url, setUrl] = useState(url);
  const [file, setFile] = useState(null);
  const [loaded, setLoaded] = useState(0);

  //   TODO : 파일사이즈 제한
  //   TODO : 파일 확장자 제한
  const inputChangeHandler = useCallback((e) => {
    console.log('inputChange()');
    console.log(e.target.files[0]);
    setLoaded(0);
    setFile(e.target.files[0]);
  }, []);

  const formSubmitHandler = useCallback(
    (e) => {
      console.log('formSubmit()');
      e.preventDefault();
      fileUpload({
        file,
        url,
        cb: (p) => {
          setLoaded(p);
          cb(p);
        },
      });
    },
    [cb, file, url]
  );

  const Form = styled.form`
    & input {
      display: block;
      margin: 0;
      width: 100%;
      padding: 120px 0px 85px 35%;
      background-color: antiquewhite;
      outline: 2px dashed #92b0b3;
    }
  `;
  return (
    <Form onSubmit={formSubmitHandler} className="file-uploader">
      <label htmlFor="uploader">
        {file === null ? text : loaded}
        <input id="uploader" type="file" onChange={inputChangeHandler} />
      </label>
      <Button type="submit">Upload</Button>
    </Form>
  );
};

FileUploader.propTypes = {
  text: PropTypes.string,
  cb: PropTypes.func,
  url: PropTypes.string.isRequired,
};

FileUploader.defaultProps = {
  text: '',
  cb() {
    console.log('file...done');
  },
};

export default FileUploader;
