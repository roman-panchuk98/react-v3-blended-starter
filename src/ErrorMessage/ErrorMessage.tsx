import style from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <span className={style.text}>
      Something went wrong. Please try again later.
    </span>
  );
}
