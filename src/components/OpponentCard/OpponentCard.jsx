import "./OpponentCard.scss";

export default function OpponentCard({ number, onClick, className }) {
  return (
    <div className={className} onClick={onClick}>
      {number}
    </div>
  );
}
