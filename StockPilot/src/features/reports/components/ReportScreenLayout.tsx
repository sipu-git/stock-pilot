import React, { ReactNode } from "react";

import {
  AppLoader,
  ErrorView,
} from "../../../components/ui";

interface ReportScreenLayoutProps {
  loading: boolean;

  error: boolean;

  onRetry: () => void;

  children: ReactNode;
}

export default function ReportScreenLayout({
  loading,
  error,
  onRetry,
  children,
}: ReportScreenLayoutProps) {
  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return <ErrorView onRetry={onRetry} />;
  }

  return <>{children}</>;
}