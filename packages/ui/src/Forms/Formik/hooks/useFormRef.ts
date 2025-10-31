import { useAtom } from "jotai";
import { formRefState, FormRefState } from "../formAtom";

const defaultFormRefState: FormRefState = {
  formikRef: null,
  isDirty: false,
  isSubmitting: false
};

export const useGlobalFormRef = () => {
  const [globalFormRef, setGlobalFormRef] = useAtom(formRefState);

  const resetGlobalFormRef = () => {
    setGlobalFormRef({ ...defaultFormRefState });
  };

  return { globalFormRef, setGlobalFormRef,  resetGlobalFormRef };
};
