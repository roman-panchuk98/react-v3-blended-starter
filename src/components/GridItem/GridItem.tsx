import type { ChilrdenProps } from "../Container/Container";
import style from "./GridItem.module.css";

export default function GridItem({ children }: ChilrdenProps) {
  return <li className={style.item}>{children}</li>;
}
