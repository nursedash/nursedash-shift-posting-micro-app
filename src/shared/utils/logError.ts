import * as Sentry from '@sentry/react';
import { toast } from "react-toastify";

const logError = (error: any, toastMsg?: string): void => {
  Sentry.captureException(error);
  console.log(error);
  if (toastMsg !== null) toast.error(toastMsg);
}

export default logError;