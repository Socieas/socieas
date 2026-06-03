"use client";

import dynamic from "next/dynamic";

const FormPanel = dynamic(() => import("./FormPanel"), { ssr: false });

export default FormPanel;
