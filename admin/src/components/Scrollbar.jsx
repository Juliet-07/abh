import React from "react";
import cn from "classnames";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

const Scrollbar = ({ options, children, style, className, ...props }) => {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          autoHide: "scroll",
        },
        ...options,
      }}
      className={cn("os-theme-thin-dark", className)}
      style={style}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default Scrollbar;
