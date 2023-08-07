import React from "react";
import PromoteLayout from "../../components/PromoteLayout";
import PromoteRef from "../../components/PromoteRef";

const Promote = () => {
  return (
    <PromoteLayout urlEndpoint={"here"}>
      <PromoteRef />
    </PromoteLayout>
  );
};

export default Promote;
