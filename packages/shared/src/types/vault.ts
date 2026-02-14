/** Vault configuration */
export interface VaultConfig {
  id: string;
  name: string;
  path: string;
}

/** A note in the vault */
export interface VaultNote {
  id: string;
  path: string;
  title: string;
  createdAt: number;
  modifiedAt: number;
  frontmatter?: Record<string, unknown>;
}

/** File tree node for sidebar */
export interface FileTreeNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileTreeNode[];
}
