import { genericAtom } from "@my-monorepo/utils";
import { FormikProps } from "formik";

export interface FormRefState {
    formikRef?: React.RefObject<FormikProps<any>> | null;
    isDirty: boolean,
    isSubmitting: boolean,
}

export const formRefState = genericAtom<FormRefState | null>(
    {
        formikRef: null,
        isDirty: false,
        isSubmitting: false
    }
);