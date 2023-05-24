import * as Sentry from '@sentry/react';
import { toast } from "react-toastify";

const logError = (error: any, msg?: string): void => {
  Sentry.captureException(error);
  console.log(error);
  if (msg !== null) toast.error(msg);
}

export default logError;