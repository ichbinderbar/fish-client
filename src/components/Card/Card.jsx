import "./Card.scss";

export default function Card({ number, onClick, className }) {
  return (
    <div className={className} onClick={onClick}>
      {number}
    </div>
  );
}
