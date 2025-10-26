export interface AuditModel {
  id: string;
  creationTime?: string;
  creatorId?: string | null;
  lastModificationTime?: string | null;
  lastModifierId?: string | null;
  isDeleted?: boolean;
}