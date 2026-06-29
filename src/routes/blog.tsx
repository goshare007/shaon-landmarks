import { createFileRoute, Outlet } from '@tanstack/react-router';
import { RouteError } from '@/components/shared/route-error';

export const Route = createFileRoute('/blog')({
  component: BlogLayout,
  errorComponent: RouteError,
});

function BlogLayout() {
  return <Outlet />;
}
