import { createFileRoute, Outlet } from '@tanstack/react-router';
import { RouteError } from '@/components/shared/route-error';

export const Route = createFileRoute('/portfolio')({
  component: PortfolioLayout,
  errorComponent: RouteError,
});

function PortfolioLayout() {
  return <Outlet />;
}
