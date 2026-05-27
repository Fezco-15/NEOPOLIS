"use client";

import { AvatarWizard, type AvatarState } from "./avatar-wizard";

export function AvatarCreationPage({ onComplete }: { onComplete: (avatar: AvatarState) => void }) {
  return <AvatarWizard onComplete={onComplete} />;
}

export type { AvatarState };
