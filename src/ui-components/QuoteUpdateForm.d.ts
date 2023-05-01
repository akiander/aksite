/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Quote } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type QuoteUpdateFormInputValues = {
    userId?: string;
    quote?: string;
    author?: string;
    category?: string;
};
export declare type QuoteUpdateFormValidationValues = {
    userId?: ValidationFunction<string>;
    quote?: ValidationFunction<string>;
    author?: ValidationFunction<string>;
    category?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type QuoteUpdateFormOverridesProps = {
    QuoteUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    quote?: PrimitiveOverrideProps<TextFieldProps>;
    author?: PrimitiveOverrideProps<TextFieldProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type QuoteUpdateFormProps = React.PropsWithChildren<{
    overrides?: QuoteUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    quote?: Quote;
    onSubmit?: (fields: QuoteUpdateFormInputValues) => QuoteUpdateFormInputValues;
    onSuccess?: (fields: QuoteUpdateFormInputValues) => void;
    onError?: (fields: QuoteUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: QuoteUpdateFormInputValues) => QuoteUpdateFormInputValues;
    onValidate?: QuoteUpdateFormValidationValues;
} & React.CSSProperties>;
export default function QuoteUpdateForm(props: QuoteUpdateFormProps): React.ReactElement;
