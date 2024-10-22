import { Form as FormikForm, Formik } from 'formik';
import { ForwardedRef, forwardRef, ReactNode } from 'react';
import * as yup from 'yup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string, any>; // NOSONAR

interface Props {
  initialValues: AnyObject;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (...args: any) => void; // NOSONAR
  validationSchema?: ReturnType<typeof yup.object>;
  id?: string;
  enableReinitialize?: boolean;
  children?: ReactNode;
}

const Form = forwardRef(
  (
    { initialValues, onSubmit, validationSchema, children, id, enableReinitialize = false }: Props,
    ref: ForwardedRef<HTMLFormElement>
  ) => {
    return (
      <Formik
        enableReinitialize={enableReinitialize}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <FormikForm id={id} onSubmit={handleSubmit} ref={ref}>
            {children}
          </FormikForm>
        )}
      </Formik>
    );
  }
);

Form.displayName = 'Form';
export default Form;
