import type { CmsLayout, PageSection } from "../types/cms";

export interface LayoutOverride {
  order?: number;
  layout?: CmsLayout;
}

const prefix = "icefire-layout:";

export function getLayoutOverrides(slug: string): Record<string, LayoutOverride> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(`${prefix}${slug}`);
    return raw ? (JSON.parse(raw) as Record<string, LayoutOverride>) : {};
  } catch {
    return {};
  }
}

export function saveLayoutOverrides(
  slug: string,
  overrides: Record<string, LayoutOverride>,
) {
  window.localStorage.setItem(`${prefix}${slug}`, JSON.stringify(overrides));
}

export function mergeSectionLayout(
  section: PageSection,
  override?: LayoutOverride,
): PageSection {
  if (!override) return section;
  return {
    ...section,
    order: override.order ?? section.order,
    layout: {
      ...(section.layout ?? {}),
      ...(override.layout ?? {}),
    },
  };
}
