vi.mock("./src/data-source", () => {
  return {
    connect: vi.fn(),
  };
});
