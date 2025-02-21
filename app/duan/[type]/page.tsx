// /duan/[type]/page.tsx
import React from "react";

import PhanTrangFilter from "./phanTrangFilter";

// Server component
const ProjectPage = async ({
  params,
}: {
  params: { type: string; province: string };
}) => {
  const p = await params;

  return (
    <div>
      <PhanTrangFilter type={p.type} /> {/* Passing type as a prop */}
    </div>
  );
};

export default ProjectPage; // Ensure you are using the default export
