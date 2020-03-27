export default {
  KEY_PROVIDER_ID: "PROVIDER_ID"
};

export enum ACTION_COMMAND {
  GEN_EXAMINATION = "GEN_EXAMINATION",
  QUESTION = "QUESTION",
}

export enum MENU {
  EXAMINATION = "BLL-10001000",
  QUESTION = "BLL-10002000",
}

export enum QUESTION_TYPE {
  /** Trac nghiem mot lua chon */
  SURVEY = "1001",
  /** Trac nghiem nhieu lua chon */
  SURVEY_MULTIPLE = "1002",
  /** Trac nghiem mot lua chon, dien vao cho trong */
  SURVEY_COMPLETE_SENTENCE = "1003",
  /** Trac nghiem nhieu lua chon, dien vao cho trong */
  SURVEY_COMPLETE_SENTENCE_MULTIPLE = "1004",
  /** Tu luan dien cau */
  COMPLETE_SENTENCE = "2001",
  /** Tu luan dien cau co prefix */
  COMPLETE_SENTENCE_PREFIX = "2002",
  /** Tu luan dien từ vào cau */
  COMPLETE_SENTENCE_CHRACTER = "2003",
  /** Trac nhiem vi tri */
  CHECK_SENTENCE = "3001",
  /** Sap xep cau */
  SORT_SENTENCE = "4001",
  /** Dien vao cho trong doan van */
  COMPLETE_PARAGRAPH = "5001",
  /** Doc doan van tra loi cau hoi */
  READ_PARAGRAPH = "6001",
}