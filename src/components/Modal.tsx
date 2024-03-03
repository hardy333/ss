import { useEffect, useState } from "react";
import { ModalContextprops, useModalContext } from "../context/ModalContext";
import { fetchPhoto } from "../api/images";

const Modal = () => {
  const {
    modalIsOpen,
    setModalIsopen,
    modalImageId,
    setModalImageId,
    modalImage,
  } = useModalContext() as ModalContextprops;
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!modalImageId || !modalIsOpen) return;
    setLoading(true);
    const getData = async () => {
      const data = await fetchPhoto(modalImageId);
      console.log({ data });
      setData(data);
      setLoading(false);
    };
    getData();

    // fetchPhoto()
  }, [modalIsOpen, modalImageId]);

  const closeModal = () => {
    setModalIsopen(false);
    setModalImageId(null);
  };

  return (
    <div
      className="modal-overlay"
      style={{ display: modalIsOpen ? "flex" : "none" }}
      onClick={closeModal}
    >
      <div className="modal-content">
        <p>Modal</p>
        {modalImage && (
          <img
            style={{ maxHeight: 300, maxWidth: 400, objectFit: "cover" }}
            src={modalImage}
            alt=""
          />
        )}

        {loading ? (
          "loading..."
        ) : (
          <>
            <ul>
              <li>Likes: {data?.likes}</li>
              <li>downloads: {data?.downloads}</li>
              <li>Views: {data?.views}</li>
              <li></li>
            </ul>
          </>
        )}
        <button onClick={closeModal}>X</button>
      </div>
    </div>
  );
};

export default Modal;
