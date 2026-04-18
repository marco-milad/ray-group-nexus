import { createFileRoute, Outlet } from "@tanstack/react-router";
import { platformsCopy } from "@/data/en/platforms";

export const Route = createFileRoute("/platforms")({
  head: () => ({
    meta: [
      { title: platformsCopy.seo.title },
      { name: "description", content: platformsCopy.seo.description },
      { property: "og:title", content: platformsCopy.seo.title },
      { property: "og:description", content: platformsCopy.seo.description },
    ],
  }),
  component: PlatformsLayout,
});

function PlatformsLayout() {
  return <Outlet />;
}
