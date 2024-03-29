import { FC } from "react";

const ReloadIcon: FC = () => (
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
    <polyline points='23 4 23 10 17 10'></polyline>
    <polyline points='1 20 1 14 7 14'></polyline>
    <path d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'></path>
  </svg>
);

export default ReloadIcon;
