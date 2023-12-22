import { useToast } from "./useToast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

export default function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        variant,
        title,
        description,
        action,
        ...props
      }) {
        return (
          <div key={id}>
            {variant === "destructive" ? (
              <Toast {...props} className="bg-[#7F1D1D]">
                <div className="grid gap-1">
                  {title ? (
                    <ToastTitle className="text-white">{title}</ToastTitle>
                  ) : null}
                  {description ? (
                    <ToastDescription className="text-white">
                      {description}
                    </ToastDescription>
                  ) : null}
                </div>
                {action}
                <ToastClose />
              </Toast>
            ) : (
              <Toast {...props} className="bg-white">
                <div className="grid gap-1">
                  {title ? (
                    <ToastTitle className="text-black">{title}</ToastTitle>
                  ) : null}
                  {description ? (
                    <ToastDescription className="text-black">
                      {description}
                    </ToastDescription>
                  ) : null}
                </div>
                {action}
                <ToastClose />
              </Toast>
            )}
          </div>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
