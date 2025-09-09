import { type ReactNode } from "react";

import styled from "./Container.module.css";

export interface ChilrdenProps {
  children: ReactNode;
}

export default function Container({ children }: ChilrdenProps) {
  return <div className={styled.container}>{children}</div>;
}
