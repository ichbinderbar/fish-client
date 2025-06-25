import "./Card.scss";

export default function Card({ number, onClick, className }) {
  // Map 1, 8, 9, 10 to letters
  const displayValue =
    number === 1
      ? "A"
      : number === 8
      ? "J"
      : number === 9
      ? "Q"
      : number === 10
      ? "K"
      : number;

  return (
    <div className={className} onClick={onClick}>
      {displayValue}
    </div>
  );
}
