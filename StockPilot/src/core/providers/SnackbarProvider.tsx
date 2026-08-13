import React, {
  createContext,
  useContext,
  useState,
} from "react";
import { AppSnackbar } from "../../components/common/AppSnackbar";


type SnackbarType = "success" | "error" | "info";

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    type?: SnackbarType
  ) => void;
}

const SnackbarContext =
  createContext<SnackbarContextType | undefined>(
    undefined
  );

export function SnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] =
    useState<SnackbarType>("info");

  const showSnackbar = (
    msg: string,
    snackbarType: SnackbarType = "info"
  ) => {
    setMessage(msg);
    setType(snackbarType);
    setVisible(true);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
      }}
    >
      {children}

      <AppSnackbar
        visible={visible}
        message={message}
        type={type}
        onDismiss={() => setVisible(false)}
      />
    </SnackbarContext.Provider>
  );
}

export function useSnackbarContext() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error(
      "useSnackbar must be used inside SnackbarProvider"
    );
  }

  return context;
}