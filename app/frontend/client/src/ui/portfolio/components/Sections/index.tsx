import { ReactElement } from "react";

interface SectionProps {

  id: string;
  children: ReactElement;
  bg?: string;
}
export default function Section({ id, children, bg}: SectionProps) {
  return (
    <section id={id} className={`w-full flex items-center justify-center flex-wrap py-36 text-center ${bg}`} >
        {children}
    </section>
  )
}


