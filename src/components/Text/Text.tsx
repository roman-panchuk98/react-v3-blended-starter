import style from "./Text.module.css";

interface TextProps {
  children: React.ReactNode;
}

export default function Text({ children }: TextProps) {
  return <p className={style.text}>{children}</p>;
}
