import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import Button from './Button';

// change usecallback
// https://velog.io/@baldongdong/React-hooks-useCallback

function fileUpload({ file, url, onProgress, onSuccess }) {
  const data = new FormData();
  data.append('file', file);
  axios
    .post(url, data, {
      onUploadProgress: (ProgressEvent) => {
        onProgress((ProgressEvent.loaded / ProgressEvent.total) * 100);
      },
    })
    .then((res) => {
      if (res.statusText === 'OK') {
        onSuccess();
      }
    })
    .catch((e) => {
      console.warn(e);
    });
}

function checkFileSize({ file }) {
  debugger;
  return new Promise(function(resolve, reject) {
    let limitSize = 2000000;
    if (!file) {
      reject(new Error('File not Exist'));
    }
    if (file.size > limitSize) {
      reject(new Error('File Limited'));
    } else {
      resolve();
    }
  });
}

function checkMimeType({ file, types = [] }) {
  return new Promise(function(resolve, reject) {
    if (types.length === 0) {
      resolve();
    } else if (types.every((type) => file.type !== type)) {
      reject(new Error('file not supported...'));
    } else {
      resolve();
    }
  });
}

const FileUploader = ({ text, url, onProgress, onSuccess }) => {
  const [filez, setFile] = useState(null);
  const [loaded, setLoaded] = useState(0);
  const fileInput = useRef(null);
  // 파일 선택시 input 값 정의 [a]
  //   TODO : 파일사이즈 제한 [o]
  //   TODO : 파일 확장자 제한 [o]
  //   TODO : 여러개 파일 병렬 처리
  // Progress 처리

  const inputChangeHandler = useCallback(
    (e) => {
      const files = e.target.files;
      console.log('inputChange()');
      console.log(files[0]);
      setLoaded(0);

      Promise.all([
        checkMimeType({ file: files[0] }),
        checkFileSize({ file: files[0], types: ['image/png', 'image/jpeg', 'image/gif'] }),
      ])
        .then(async () => {
          await setFile(files[0]);
          //맘에 들지 않는다
          fileInput.current.files = files;
          console.log(fileInput);
        })
        .catch((e) => {
          alert(e);
        });
    },
    [fileInput]
  );

  const formSubmitHandler = useCallback(
    (e) => {
      console.log('formSubmit()');
      e.preventDefault();
      fileUpload({
        filez,
        url,
        onProgress: (p) => {
          setLoaded(p);
          onProgress(p);
        },
        onSuccess: () => {
          onSuccess();
        },
      });
    },
    [filez, onProgress, onSuccess, url]
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
        {filez === null ? text : loaded}
        <input type="file" id="uploader" ref={fileInput} onChange={inputChangeHandler} />
      </label>
      <Button type="submit">Upload</Button>
    </Form>
  );
};

FileUploader.propTypes = {
  text: PropTypes.string,
  cb: PropTypes.func,
  onProgress: PropTypes.func,
  fileSize: PropTypes.string,
  onSuccess: PropTypes.func,
  url: PropTypes.string.isRequired,
};

FileUploader.defaultProps = {
  text: '',
  fileSize: '',
  onProgress() {
    console.log('file...processing');
  },
  onSuccess() {
    console.log('file...done');
  },
};

export default FileUploader;
