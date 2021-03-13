import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/addOns/Layout";
import { ErrorPage } from "../components/error/ErrorPage";

export default function Error() {
  return (
    <div>
      <Helmet>
        <title>Todo's | 404</title>
      </Helmet>
      <div>
        <Layout>
          <ErrorPage />
        </Layout>
      </div>
    </div>
  );
}
