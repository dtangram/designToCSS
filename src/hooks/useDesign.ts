import { useContext } from "react";
import { DesignContext, DesignContextType } from "../context/DesignContext";

export const useDesign = (): DesignContextType => {
  const context = useContext(DesignContext);
  if (context === undefined) {
    throw new Error("useDesign must be used within a DesignProvider");
  }
  return context;
}
