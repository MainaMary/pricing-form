import React from "react";

interface Props {
  openModal: boolean;
  handleModal: (x: any) => void;
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
    <div className="flex w-full h-full items-center justify-center fixed bg-black-200 t-0 r-0">
      <div className="rounded-sm bg-white p-4">
        <p className="font-bold text-2xl text-right" onClick={handleModal}>
          x
        </p>
        <p className="text-center"> Coming soon...</p>
      </div>
    </div>
  );
};

export default Modal;
