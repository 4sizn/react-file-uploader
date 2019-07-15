import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    display:inline-block;
    width:100%;
    color:#ffffff;
    border-radius:4px;
    background-color: #28a745;
    border-color: #28a745;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
&
:hover{
    color: #fff;
    background-color: #218838;
    border-color: #1e7e34;
}
`

export default Button;