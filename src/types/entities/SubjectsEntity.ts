import Entity from '@/types/entities/Entity';

declare class SubjectsEntity implements Entity, firebase.firestore.DocumentData {
  id: string;
  disabled: boolean;
  name: string;
  sortkey: number;
}

export default SubjectsEntity;