import "./Card.scss";

export default function Card({ number, onClick, className }) {
  return (
    <div className={className} onClick={onClick}>
      {number === 1
        ? "A"
        : number === 8
        ? "J"
        : number === 9
        ? "Q"
        : number === 10
        ? "K"
        : number}
    </div>
  );
}
