import React from "react";

interface Props {
  openModal: boolean;
  handleModal: () => void;
}
// const MainStyles = {
//   top: '0',
//   width: '100%',
//   right: '0',
//   backgroundColor: 'rgba(0, 0, 0, 0.2)',
//   position: 'fixed',
//   display: 'flex',
//   justifyContent: 'center',
//   height: "100%"
//   align-items: "center"
// }
const Modal = ({ openModal, handleModal }: Props) => {
  if (!openModal) return null;

  return (
    <div onClick={handleModal}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className="font-bold text-2xl text-right">x</p>
        <p className="text-center"> Coming soon...</p>
      </div>
    </div>
  );
};

export default Modal;
