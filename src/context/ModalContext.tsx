import { ReactNode, createContext, useContext, useState } from "react";

export type ModalContextprops = {
  modalIsOpen: boolean;
  setModalIsopen: React.Dispatch<React.SetStateAction<boolean>>;
  modalImageId: null | string;
  setModalImageId: React.Dispatch<React.SetStateAction<null | string>>;
  setModalImage: React.Dispatch<React.SetStateAction<string | null>>;
  modalImage: string | null;
};

const ModalContext = createContext<ModalContextprops | null>(null);

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [modalIsOpen, setModalIsopen] = useState(false);
  const [modalImageId, setModalImageId] = useState<null | string>(null);
  const [modalImage, setModalImage] = useState<null | string>(null);

  return (
    <ModalContext.Provider
      value={{
        modalIsOpen,
        setModalIsopen,
        modalImageId,
        setModalImageId,
        modalImage,
        setModalImage,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;

export const useModalContext = () => useContext(ModalContext);
