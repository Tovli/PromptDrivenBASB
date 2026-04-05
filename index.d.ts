export type AssetName =
  | 'agents'
  | 'guide'
  | 'readme'
  | 'promptsDir'
  | 'templatesDir'
  | 'stateDir'
  | 'vaultDir'
  | 'masterPrompt'
  | 'capturePrompt';

export const packageRoot: string;
export const assets: Record<AssetName, string>;

export function resolveAssetPath(...segments: string[]): string;
export function getAssetPath(nameOrPath: AssetName | string): string;
export function listPromptFiles(): string[];
