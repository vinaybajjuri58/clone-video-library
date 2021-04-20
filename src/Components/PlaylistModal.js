import { ModalContent } from "./ModalContent";
export const PlaylistModal = ({ displayState, setDisplayState }) => {
  return (
    <div
      id="modal"
      style={{
        display: displayState,
      }}
      className="modal"
    >
      <div className="modal-content modal-theme">
        <ModalContent />
        <span className="close-modal">
          <button
            id="close-modal"
            onClick={() => setDisplayState("none")}
            className="button button-warning modal-toggle"
          >
            X
          </button>
        </span>
      </div>
    </div>
  );
};
