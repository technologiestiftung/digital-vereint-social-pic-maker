import { FC } from "react";

const DeleteIcon: FC = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2.5'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='inline-block ml-2'
  >
    <path d='M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z'></path>
    <line x1='18' y1='9' x2='12' y2='15'></line>
    <line x1='12' y1='9' x2='18' y2='15'></line>
  </svg>
);

export default DeleteIcon;
