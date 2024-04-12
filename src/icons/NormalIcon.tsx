export function NormalIcon({ size = '1rem', color = '#fff' }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} fill='none' viewBox='0 0 512 512'>
      <path
        fill={color}
        fillRule='evenodd'
        d='M481 256c0 124.264-100.736 225-225 225S31 380.264 31 256 131.736 31 256 31s225 100.736 225 225zm-96.429 0c0 71.008-57.563 128.571-128.571 128.571S127.429 327.008 127.429 256 184.992 127.429 256 127.429 384.571 184.992 384.571 256z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}
