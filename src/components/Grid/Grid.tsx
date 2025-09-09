import type { ChilrdenProps } from "../Container/Container";
import style from "./Grid.module.css";

export default function Grid({ children }: ChilrdenProps) {
  return <ul className={style.list}>{children}</ul>;
}
