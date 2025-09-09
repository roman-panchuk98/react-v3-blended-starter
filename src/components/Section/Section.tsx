import type { ChilrdenProps } from "../Container/Container";
import style from "./Section.module.css";

export default function Section({ children }: ChilrdenProps) {
  return <section className={style.section}>{children}</section>;
}
