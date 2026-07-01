import { createFileRoute } from '@tanstack/react-router';
import { EmiCalculator } from '@/components/pages/emi/emi-calculator';

export const Route = createFileRoute('/emi-calculator')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <EmiCalculator />
    </div>
  );
}
