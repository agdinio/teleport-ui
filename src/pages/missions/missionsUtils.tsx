import {
  MissionArtifactIcon,
  MissionBattleIcon,
  MissionCourierIcon,
  MissionExploreIcon,
  MissionLiberationIcon,
  MissionRecoveryIcon,
  MissionScoutingIcon,
  MissionSupplyIcon,
} from "components/ui/Icons";

export enum MissionType {
  RECOVERY,
  LIBERATION,
  SUPPLY,
  COURIER,
  ARTIFACT,
  SCOUTING,
  BATTLE,
  EXPLORE,
}

export enum MissionRarity {
  COMMON,
  RARE,
  EPIC,
  LEGENDARY,
}

export enum MissionStatus {
  AVAILABLE,
  ENGAGED,
  DEPARTED,
  FINISHED,
}

export interface Mission {
  type: MissionType;
  title: string;
  duration: number;
  rewards: number;
  rarity: MissionRarity;
  craftsLeased: {
    total: number;
    available: number;
  };
  departure: number;
  status: MissionStatus;
}

export function getColorForStatus(status: MissionStatus): string {
  let color = "#d9a555";
  switch (status) {
    case MissionStatus.DEPARTED:
      color = "#ff3b52";
      break;
    case MissionStatus.ENGAGED:
      color = "#0ed4a8";
      break;
    case MissionStatus.FINISHED:
      color = "#959595";
      break;
    default:
      break;
  }
  return color;
}

export function getColorForRarity(rarity: MissionRarity): string {
  let color = "#c6c6c6";
  switch (rarity) {
    case MissionRarity.RARE:
      color = "#07a3dd";
      break;
    case MissionRarity.EPIC:
      color = "#9449db";
      break;
    case MissionRarity.LEGENDARY:
      color = "#d1772c";
      break;

    default:
      break;
  }
  return color;
}

export function MissionTypeIcon({ type }: { type: MissionType }) {
  if (type === MissionType.ARTIFACT) return <MissionArtifactIcon />;
  if (type === MissionType.BATTLE) return <MissionBattleIcon />;
  if (type === MissionType.COURIER) return <MissionCourierIcon />;
  if (type === MissionType.EXPLORE) return <MissionExploreIcon />;
  if (type === MissionType.LIBERATION) return <MissionLiberationIcon />;
  if (type === MissionType.RECOVERY) return <MissionRecoveryIcon />;
  if (type === MissionType.SCOUTING) return <MissionScoutingIcon />;
  if (type === MissionType.SUPPLY) return <MissionSupplyIcon />;
  return null;
}
