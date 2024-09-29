export class CreateEntryDto {
  author: string;
  content: string;
  url: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

export class UpdateEntryDto {
  content?: string;
  position?: {
    x: number;
    y: number;
  };
  size?: {
    width: number;
    height: number;
  };
}

export class LikeEntryDto {
  entryId: string;
  userId: string;
}

export class DislikeEntryDto {
  entryId: string;
  userId: string;
}

export class InvisibleEntryDto {
  entryId: string;
  userId: string;
}

export class VisibleEntryDto {
  entryId: string;
  userId: string;
}
