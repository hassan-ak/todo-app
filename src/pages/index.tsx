import React from "react";
import { Helmet } from "react-helmet";
import Header from "../components/addOns/Header";
import Footer from "../components/addOns/Footer";
import Layout from "../components/addOns/Layout";
import { Landing } from "../components/landing/Landing";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Todo's | Home</title>
      </Helmet>
      <div>
        <Layout>
          <Landing />
        </Layout>
      </div>
    </div>
  );
}
