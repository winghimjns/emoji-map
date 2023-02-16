import { useEffect, useState } from "react";

export interface Props {
  children: React.ReactNode;
  show: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export default function Tooltip (props: Props) {
  const {children, show} = props;
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    function onMouseMove (event: MouseEvent) {
      const {x, y} = event;
      setPosition({x, y});
    }

    function onMouseLeave (event: MouseEvent) {
      setPosition(null);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [setPosition]);

  if (position === null || !show) { return null; }
  return (
    <div
      className="component-tooltip"
      style={{top: position.y, left: position.x}}
    >
      {children}
    </div>
  );
}
