export const SERVICE_NAME = {
  technical: "technical",
  construction: "construction",
  realEstate: "realEstate",
  importExport: "importExport",
  visaTravel: "visaTravel",
} as const;


export type TSelectedServiceForm = keyof typeof SERVICE_NAME;
export type TServiceFormSize = "sm" | "md" | "lg" | "xl";

export type ServiceState = {
  selectedServiceForm: TSelectedServiceForm;
  isModalOpen: boolean;
  serviceFormSize: TServiceFormSize;
  isSubmitSuccess: boolean;
  serviceFormState: "step_one" | "step_two" | "step_three" | "step_four";
};

export type SetServiceStateAction = {
  type: "SET_STATE";
  payload: ServiceState;
};

export type UpdateServiceState = {
  type: "UPDATE_STATE";
  payload: Partial<ServiceState>;
};

export type Action = SetServiceStateAction | UpdateServiceState;

export type NavItem = {
  path: string;
  label: string;
  key: string;
};

export type TSessionAuth = {
  email: string;
  currency: string;
  id: string;
  role: string;
} | null;


export type ActiveNavState = Record<string, boolean>;
export type IProps = {
  session: TSessionAuth;
};