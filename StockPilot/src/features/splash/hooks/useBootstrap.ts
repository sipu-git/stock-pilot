import { useEffect, useState } from "react";

import { bootstrap } from "../services/bootstrap";

import { useAppDispatch } from "../../../hooks/useAppDispatch";

import { setCredentials } from "../../auth/store/authSlice";

export function useBootstrap() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const session = await bootstrap();

console.log("Session:", session);

if (session) {
  console.log("Dispatching Redux");

  dispatch(
    setCredentials({
      user: session.user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    }),
  );
}
      } finally {
  setTimeout(() => {
    setLoading(false);
  }, 5000);
}
    }

    init();
  }, [dispatch]);

  return {
    loading,
  };
}