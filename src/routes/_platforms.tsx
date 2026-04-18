import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_platforms")({
  component: PlatformsLayout,
});

function PlatformsLayout() {
  return <Outlet />;
}
