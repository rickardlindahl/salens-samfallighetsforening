export type FormState =
  | "saving"
  | "publishing"
  | "unpublishing"
  | "sendingEmailNotification"
  | "idle";

export const actionToState: { [key: string]: FormState } = {
  "?/save": "saving",
  "?/publish": "publishing",
  "?/unpublish": "unpublishing",
  "?/sendEmailNotification": "sendingEmailNotification",
};

export const stateToToastMessage: { [key in FormState]: { success: string; error: string } } = {
  saving: {
    success: "Inlägget har sparats!",
    error: "Misslyckades att spara inlägget!",
  },
  publishing: {
    success: "Inlägget har publicerats!",
    error: "Misslyckades att publicera inlägget!",
  },
  unpublishing: {
    success: "Inlägget har avpublicerats!",
    error: "Misslyckades att avpublicera inlägget!",
  },
  sendingEmailNotification: {
    success: "En epost-notifiering har skickats!",
    error: "Misslyckades att skicka en epost-notifiering!",
  },
  idle: {
    success: "",
    error: "",
  },
};
