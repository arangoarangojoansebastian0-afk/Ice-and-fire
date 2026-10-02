import type { CSSProperties } from "react";
import type { CmsLayout, LayoutAlign, LayoutWidth } from "../types/cms";

export const layoutWidthClass: Record<LayoutWidth, string> = {
  full: "cms-layout-full",
  half: "cms-layout-half",
  third: "cms-layout-third",
  quarter: "cms-layout-quarter",
};

export const layoutAlignClass: Record<LayoutAlign, string> = {
  start: "cms-layout-start",
  center: "cms-layout-center",
  end: "cms-layout-end",
  stretch: "cms-layout-stretch",
};

export function layoutClasses(layout?: CmsLayout) {
  const width = layout?.width ?? "full";
  const align = layout?.align ?? "stretch";
  return `${layoutWidthClass[width]} ${layoutAlignClass[align]}`;
}

export function layoutStyle(layout?: CmsLayout): CSSProperties {
  const offset = Math.min(11, Math.max(0, Number(layout?.offset ?? 0)));
  return offset
    ? ({ "--cms-offset": offset } as React.CSSProperties)
    : {};
}
