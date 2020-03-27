import Entity from '@/types/entities/Entity';
import { QUESTION_TYPE } from '@/common/constant';

declare class QuestionsEntity implements Entity, firebase.firestore.DocumentData {
    id: string;
    content: string;
    deleted: boolean;
    subtitle: string;
    type: QUESTION_TYPE;
    user: string;
}

export default QuestionsEntity;