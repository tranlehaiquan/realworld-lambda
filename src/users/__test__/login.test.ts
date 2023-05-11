import { vi } from 'vitest'
import { login } from "../login";
import { connect } from "../../data-source";
import { describe } from 'node:test';

// mock database connect
vi.mock("../../data-source", () => {
  return {
    connect: vi.fn(),
  };
});

describe("login", () => {
  
})