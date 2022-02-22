import "@testing-library/cypress/add-commands";
import { configure } from "@testing-library/cypress";
import "./commands";

require("cypress-xpath");

configure({ testIdAttribute: "data-test-id" });
