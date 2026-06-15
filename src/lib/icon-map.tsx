import type { LucideProps } from 'lucide-react';
import {
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  Coffee,
  ConciergeBell,
  Dumbbell,
  Eye,
  FileText,
  Gavel,
  Handshake,
  Leaf,
  Moon,
  Mountain,
  Paintbrush,
  ParkingCircle,
  Scale,
  Shield,
  ShieldCheck,
  Ship,
  Smartphone,
  Snowflake,
  Sparkles,
  Sun,
  Target,
  TreePine,
  Trees,
  Waves,
  Wifi,
  Wrench,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  shield: Shield,
  architecture: Building2,
  history_edu: BookOpen,

  landscape: Mountain,
  engineering: Wrench,
  format_paint: Paintbrush,

  dark_mode: Moon,
  ac_unit: Snowflake,
  security: ShieldCheck,
  spa: Sparkles,
  deck: Sun,
  local_parking: ParkingCircle,
  wifi: Wifi,
  fitness_center: Dumbbell,
  pool: Waves,
  directions_boat: Ship,
  local_cafe: Coffee,
  nature: TreePine,
  smartphone: Smartphone,
  concierge: ConciergeBell,

  verified: BadgeCheck,
  handshake: Handshake,
  description: FileText,
  gavel: Gavel,
  balance: Scale,

  ecology: Leaf,
  forest: Trees,
  energy_savings_leaf: Leaf,

  workspace_premium: Award,

  track_changes: Target,
  visibility: Eye,
};

export function DynamicIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon aria-hidden='true' {...props} />;
}
